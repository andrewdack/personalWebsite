"use client";

import { useEffect, useRef } from "react";

// Full-viewport field of monospace glyphs whose opacity is driven by 3D
// Perlin noise (x, y sampled across the grid, z advanced by time), so faint
// blobs of text surface and dissolve in organic, directionless positions
// rather than the regular diagonal bands a sum of sine waves produces.
// Rendered to a <canvas> rather than the DOM: a full-screen grid is thousands
// of cells, far too many for individual elements, and canvas lets every cell's
// opacity update per frame cheaply.
//
// Each cell is assigned one glyph once (a stable hash of its coordinates) and
// keeps it — only the opacity animates, so it reads as light washing over a
// fixed field of characters rather than a churn of random symbols.

// A mix of letters, digits and weighty symbols — reads like a hex dump /
// source scroll. Deliberately excludes wispy glyphs (. , * ; : ~ ^ ' | - _)
// that leave holes in the texture, and isn't just 0/1 (binary tiled is a
// cliché and looks like noise).
const GLYPHS =
    "ABCDEFGHKMNPRSTXZabcdehkmnrstxz0123456789#%&$@=+<>?/\\{}[]()".split("");

const FONT_SIZE = 13; // px
const CELL_W = 10; // px advance between columns
const CELL_H = 15; // px advance between rows
const FPS_CAP = 30; // the motion is slow; 30fps looks identical and saves battery
const FADE_IN_MS = 1400; // ramp opacity up on load, matching the content cascade's entrance window
const NUM_BUCKETS = 24; // opacity levels — cells are batched by level to cut draw-state changes
const PEAK_LIGHT = 0.09; // max glyph opacity, light mode
const PEAK_DARK = 0.07; // ...dark mode: kept low, light glyphs on near-black read hot fast
// Soft threshold applied to the normalized noise. Perlin clusters tightly
// around 0.5 and barely reaches ~0.66 at its crests, so a gamma curve just
// dims everything uniformly (mid-range cells never fall to zero → no gaps,
// and the crests never reach full → dim blobs). A threshold instead maps
// everything below THRESH_LO to transparent (real gaps) and everything above
// THRESH_HI to FULL peak (bright blob cores even at low peak opacity), with a
// smoothstep ramp between. The band sits just above the median so only the
// upper ~15% of the field shows. See scratchpad percentiles: p50≈0.50,
// p85≈0.60, p95≈0.66.
const THRESH_LO = 0.6;
const THRESH_HI = 0.655;
// Noise sampling. SCALE sets blob size (smaller = larger, smoother blobs);
// Z_SPEED is how fast they morph in place; DRIFT gives the whole field a very
// slow non-axis-aligned wander so it feels alive without an obvious direction.
const NOISE_SCALE = 0.045;
const NOISE_Z_SPEED = 0.1;
const NOISE_DRIFT_X = 0.01;
const NOISE_DRIFT_Y = 0.006;
const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const darkRGB: [number, number, number] = [245, 245, 245];
const lightRGB: [number, number, number] = [23, 23, 23];

// Classic Perlin 3D noise, output ~[-1, 1]. Self-contained (the repo's
// lib/perlin.ts is 1D only). A fresh random permutation per mount just means a
// different-looking field each load, which is fine for decoration.
function makeNoise3D() {
    const perm = new Uint8Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        const tmp = perm[i];
        perm[i] = perm[j];
        perm[j] = tmp;
    }
    const p = new Uint8Array(512);
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];

    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number, z: number) => {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    return (x: number, y: number, z: number) => {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;
        const zi = Math.floor(z) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);
        const zf = z - Math.floor(z);
        const u = fade(xf);
        const v = fade(yf);
        const w = fade(zf);
        const a = p[xi] + yi;
        const aa = p[a] + zi;
        const ab = p[a + 1] + zi;
        const b = p[xi + 1] + yi;
        const ba = p[b] + zi;
        const bb = p[b + 1] + zi;
        return lerp(
            lerp(
                lerp(grad(p[aa], xf, yf, zf), grad(p[ba], xf - 1, yf, zf), u),
                lerp(
                    grad(p[ab], xf, yf - 1, zf),
                    grad(p[bb], xf - 1, yf - 1, zf),
                    u,
                ),
                v,
            ),
            lerp(
                lerp(
                    grad(p[aa + 1], xf, yf, zf - 1),
                    grad(p[ba + 1], xf - 1, yf, zf - 1),
                    u,
                ),
                lerp(
                    grad(p[ab + 1], xf, yf - 1, zf - 1),
                    grad(p[bb + 1], xf - 1, yf - 1, zf - 1),
                    u,
                ),
                v,
            ),
            w,
        );
    };
}

export function AsciiBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const noise = makeNoise3D();

        let cols = 0;
        let rows = 0;
        let cssW = 0;
        let cssH = 0;
        let glyphs: string[] = [];
        // Timestamp of the first animated frame, so the whole field can fade
        // its opacity up from zero on load instead of snapping in.
        let fadeStartMs = 0;
        const buckets = Array.from<unknown, number[]>(
            { length: NUM_BUCKETS },
            () => [],
        );

        const isDark = () => document.documentElement.classList.contains("dark");
        const targetRGB = () => (isDark() ? darkRGB : lightRGB);
        // Mutated toward the theme target each frame so a dark/light switch
        // cross-fades the glyph color instead of snapping.
        const color: [number, number, number] = [...targetRGB()];

        const setup = () => {
            cssW = window.innerWidth;
            cssH = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(cssW * dpr);
            canvas.height = Math.floor(cssH * dpr);
            canvas.style.width = `${cssW}px`;
            canvas.style.height = `${cssH}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${FONT_SIZE}px ${MONO_FONT}`;
            ctx.textBaseline = "top";

            cols = Math.ceil(cssW / CELL_W) + 1;
            rows = Math.ceil(cssH / CELL_H) + 1;

            glyphs = new Array(cols * rows);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    // Stable per-cell hash so a glyph never changes on resize.
                    const hash = ((c * 73856093) ^ (r * 19349663)) >>> 0;
                    glyphs[r * cols + c] = GLYPHS[hash % GLYPHS.length];
                }
            }
        };

        const render = (nowMs: number) => {
            const t = nowMs * 0.001;

            const tgt = targetRGB();
            for (let i = 0; i < 3; i++) color[i] += (tgt[i] - color[i]) * 0.08;

            // A slow global breathe on top of the local blobs, so overall
            // intensity swells and recedes too.
            const breathe = 0.7 + 0.3 * Math.sin(t * 0.3);
            let peak = (isDark() ? PEAK_DARK : PEAK_LIGHT) * breathe;

            // Fade the whole field in on load (ease-out), so it arrives with
            // the content rather than popping in. Skipped under reduced motion,
            // where there's just one static frame and no entrance anyway.
            if (!prefersReduced) {
                if (fadeStartMs === 0) fadeStartMs = nowMs;
                const f = Math.min(1, (nowMs - fadeStartMs) / FADE_IN_MS);
                peak *= 1 - (1 - f) ** 3;
            }

            const z = t * NOISE_Z_SPEED;
            const driftX = t * NOISE_DRIFT_X;
            const driftY = t * NOISE_DRIFT_Y;

            for (let b = 0; b < NUM_BUCKETS; b++) buckets[b].length = 0;

            for (let r = 0; r < rows; r++) {
                const ny = r * NOISE_SCALE + driftY;
                const ny2 = r * NOISE_SCALE * 2 + driftY;
                for (let c = 0; c < cols; c++) {
                    const nx = c * NOISE_SCALE + driftX;
                    // Two octaves: a base blob plus finer detail so the shapes
                    // don't read as smooth uniform gradients.
                    let v =
                        noise(nx, ny, z) +
                        0.5 * noise(nx * 2, ny2, z * 1.6 + 31.4);
                    v *= 1 / 1.5; // back to ~[-1,1]
                    v = (v + 1) * 0.5; // -> [0,1]
                    // Soft threshold: below LO -> transparent gap (skip),
                    // above HI -> full peak, smoothstep ramp between.
                    let s = (v - THRESH_LO) / (THRESH_HI - THRESH_LO);
                    if (s <= 0) continue;
                    if (s >= 1) s = 1;
                    else s = s * s * (3 - 2 * s);
                    const level = (s * NUM_BUCKETS) | 0;
                    if (level <= 0) continue;
                    buckets[level >= NUM_BUCKETS ? NUM_BUCKETS - 1 : level].push(
                        r * cols + c,
                    );
                }
            }

            ctx.clearRect(0, 0, cssW, cssH);
            ctx.fillStyle = `rgb(${color[0] | 0}, ${color[1] | 0}, ${color[2] | 0})`;

            for (let b = 0; b < NUM_BUCKETS; b++) {
                const arr = buckets[b];
                if (arr.length === 0) continue;
                ctx.globalAlpha = peak * ((b + 1) / NUM_BUCKETS);
                for (let k = 0; k < arr.length; k++) {
                    const idx = arr[k];
                    const c = idx % cols;
                    const rr = (idx / cols) | 0;
                    ctx.fillText(glyphs[idx], c * CELL_W, rr * CELL_H);
                }
            }
            ctx.globalAlpha = 1;
        };

        setup();

        // Reduced motion: draw one static frame, no loop. Still redraw (with a
        // snapped color) on resize and on theme change.
        if (prefersReduced) {
            const snap = () => {
                const s = targetRGB();
                color[0] = s[0];
                color[1] = s[1];
                color[2] = s[2];
                render(0);
            };
            const onResize = () => {
                setup();
                snap();
            };
            const observer = new MutationObserver(snap);
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"],
            });
            window.addEventListener("resize", onResize);
            snap();
            return () => {
                window.removeEventListener("resize", onResize);
                observer.disconnect();
            };
        }

        let raf = 0;
        let last = 0;
        const frameInterval = 1000 / FPS_CAP;
        const loop = (now: number) => {
            raf = requestAnimationFrame(loop);
            if (now - last < frameInterval) return;
            last = now;
            render(now);
        };
        const onResize = () => setup();
        window.addEventListener("resize", onResize);
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10"
        />
    );
}
