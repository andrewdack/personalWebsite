"use client";

import { useEffect, useRef } from "react";

// Full-viewport field of monospace glyphs whose opacity rolls in slow waves,
// like a faint terminal breathing behind the page. Rendered to a <canvas>
// rather than the DOM: a full-screen grid is thousands of cells, far too many
// for individual elements, and canvas lets every cell's opacity update per
// frame cheaply.
//
// Each cell is assigned one glyph once (a stable hash of its coordinates) and
// keeps it — only the opacity animates, so it reads as light washing over a
// fixed field of characters rather than a churn of random symbols.

// Deliberately code-punctuation, no 0/1: binary digits read as "hacker
// cliché" and, tiled, as visual noise. These look like source at a glance.
const GLYPHS = "{}()[]<>/\\|=+-*;:.,~^?!".split("");

const FONT_SIZE = 14; // px
const CELL_W = 14; // px advance between columns
const CELL_H = 22; // px advance between rows
const FPS_CAP = 30; // the motion is slow; 30fps looks identical and saves battery
const NUM_BUCKETS = 24; // opacity levels — cells are batched by level to cut draw-state changes
const PEAK_LIGHT = 0.16; // max glyph opacity, light mode
const PEAK_DARK = 0.22; // ...dark mode needs a touch more to read against near-black
const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Three sine waves at different angles and speeds. Summed and normalized they
// make an organic, non-repeating swell that drifts diagonally across the grid
// instead of a single obviously-periodic ripple.
const WAVES = [
    { ax: 0.16, ay: 0.09, speed: 0.9 },
    { ax: -0.08, ay: 0.15, speed: 0.6 },
    { ax: 0.05, ay: -0.06, speed: 0.4 },
];

const darkRGB: [number, number, number] = [245, 245, 245];
const lightRGB: [number, number, number] = [23, 23, 23];

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

        let cols = 0;
        let rows = 0;
        let cssW = 0;
        let cssH = 0;
        let glyphs: string[] = [];

        // Per-wave, per-row sin/cos — depend only on the row, so computed once
        // per layout and reused every frame.
        const sinRow = WAVES.map<number[]>(() => []);
        const cosRow = WAVES.map<number[]>(() => []);
        // Per-wave, per-column sin/cos — carry the time phase, recomputed each
        // frame. Precomputing these makes the wave value at each cell a couple
        // of multiply-adds (angle-addition identity) with no per-cell trig, so
        // the inner loop over every cell stays cheap.
        const sinCol = WAVES.map<number[]>(() => []);
        const cosCol = WAVES.map<number[]>(() => []);
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

            for (let i = 0; i < WAVES.length; i++) {
                const { ay } = WAVES[i];
                sinRow[i] = new Array(rows);
                cosRow[i] = new Array(rows);
                for (let r = 0; r < rows; r++) {
                    sinRow[i][r] = Math.sin(r * ay);
                    cosRow[i][r] = Math.cos(r * ay);
                }
                sinCol[i] = new Array(cols);
                cosCol[i] = new Array(cols);
            }
        };

        const render = (nowMs: number) => {
            const t = nowMs * 0.001;

            const tgt = targetRGB();
            for (let i = 0; i < 3; i++) color[i] += (tgt[i] - color[i]) * 0.08;

            // Fold each wave's time drift into its per-column phase.
            for (let i = 0; i < WAVES.length; i++) {
                const { ax, speed } = WAVES[i];
                const phase = t * speed;
                const sc = sinCol[i];
                const cc = cosCol[i];
                for (let c = 0; c < cols; c++) {
                    const a = c * ax + phase;
                    sc[c] = Math.sin(a);
                    cc[c] = Math.cos(a);
                }
            }

            // A slow global breathe on top of the local waves, so overall
            // intensity swells and recedes too.
            const breathe = 0.7 + 0.3 * Math.sin(t * 0.3);
            const peak = (isDark() ? PEAK_DARK : PEAK_LIGHT) * breathe;

            for (let b = 0; b < NUM_BUCKETS; b++) buckets[b].length = 0;

            const inv = 1 / WAVES.length;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let v = 0;
                    for (let i = 0; i < WAVES.length; i++) {
                        // sin(colAngle + rowAngle) via the angle-addition identity.
                        v +=
                            sinCol[i][c] * cosRow[i][r] +
                            cosCol[i][c] * sinRow[i][r];
                    }
                    v = (v * inv + 1) * 0.5; // [-1,1] -> [0,1]
                    v = v * v; // gamma: keep most of the field faint, let crests brighten
                    const level = (v * NUM_BUCKETS) | 0;
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
