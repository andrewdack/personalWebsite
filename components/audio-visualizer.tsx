"use client";

import { useEffect, useRef, useState } from "react";
import { Perlin } from "@/lib/perlin";

type AudioVisualizerProps = {
    /**
     * Whether the track is currently playing. Drives whether the bars are
     * animating or at rest — a last-played track should not look live.
     */
    isPlaying: boolean;
    /**
     * When true, the spectrum is rendered as a static decorative shape
     * rather than animating.
     */
    reducedMotion?: boolean;
    /**
     * Positioning classes supplied by <NowPlaying />. It passes the classes
     * that pin this to the marquee's width and put it directly below,
     * absolutely positioned so the footer's height never changes.
     */
    className?: string;
};

const barWidthPx = 4;
const barGapPx = 2;
const updateIntervalMs = 125;
const minBarScale = 0.08;
const maxBarScale = 1;

// How many fixed-width bars (each needing a gap on one side, except the
// last) fit in `width` px: n·bar + (n−1)·gap ≤ width  ⇒  n ≤ (width+gap)/(bar+gap).
function barsThatFit(width: number) {
    return Math.max(
        0,
        Math.floor((width + barGapPx) / (barWidthPx + barGapPx)),
    );
}

export function AudioVisualizer({
    isPlaying,
    reducedMotion = false,
    className,
}: AudioVisualizerProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [barCount, setBarCount] = useState(0);
    const [levels, setLevels] = useState<number[]>([]);
    const [base, setBase] = useState<number[]>([]);

    // Derive the bar count from the row's measured width and re-derive on
    // resize, so shrinking the window (or a shorter title widening the
    // marquee) refills the row instead of leaving a gap or overflowing.
    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        const measure = () =>
            setBarCount(barsThatFit(row.getBoundingClientRect().width));

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(row);
        return () => observer.disconnect();
    }, []);

    // Change the underlaying base on an interval to switch up pattern
    useEffect(() => {
        // Get a scale factor for the base in the range of (0.5, 0.8)
        const scaleFactor = Math.random() * (0.8 - 0.5) + 0.5;

        // We have to put synchronous setState in a callback to avoid extra render lint error
        const sample = () => 
            setBase(Array.from({ length: barCount }, () => Math.random() * scaleFactor));
        sample()

        const interval = setInterval(() => {
            setBase(Array.from({ length: barCount }, () => Math.random() * scaleFactor));
        }, 5000);

        return () => clearInterval(interval);
    }, [barCount]); // Need the barCount dependency so that base isn't being set from stale zero barCount

    useEffect(() => {
        if (barCount === 0 || !isPlaying || reducedMotion) return;

        // Per-bar silhouette so the bars don't all feel interchangeable.
        // Regenerated whenever the count changes.
        const noise = new Perlin();
        let tick = 0;

        const update = () => {
            tick += 1;
            setLevels(
                base.map((baseValue, index) => {
                    const noiseValue =
                        (noise.getNoiseValue(index * 0.1 + tick * 0.03) + 1) /
                        2;
                    const value = noiseValue * Math.random() * baseValue;
                    return Math.max(minBarScale, Math.min(maxBarScale, value));
                }),
            );
        };

        update();
        const interval = window.setInterval(update, updateIntervalMs);
        return () => window.clearInterval(interval);
    }, [base, barCount]);

    // Nothing to show unless a track is actively playing. Placed after the
    // hooks — an early return above them changes the hook count between
    // renders (isPlaying flips when a track stops), which crashes React.
    if (!isPlaying || reducedMotion) return null;

    return (
        <div aria-hidden data-playing={isPlaying} className={className}>
            {/* `justify-between` spreads bars edge-to-edge so the row fills its full width exactly. */}
            <div
                ref={rowRef}
                className="flex h-8 items-end justify-between overflow-visible"
            >
                {levels.map((level, index) => (
                    <span
                        key={index}
                        className="origin-bottom rounded-full bg-[#345] transition-transform duration-125 ease-linear dark:bg-[#9cc4ff]"
                        style={{
                            width: `${barWidthPx}px`,
                            height: "100%",
                            transform: `scale3d(1, ${level}, 1)`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
