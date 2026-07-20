"use client";

import { useEffect, useState } from "react";
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

// Shape profile for the fake spectrum. These values define the overall
// silhouette so the bars don't all feel interchangeable.
const sample = [
    0.03, 0.03, 0.03, 0.04, 0.07, 0.23, 0.18, 0.5, 0.85, 1, 0.78, 0.7,
    0.5, 0.3, 0.12, 0.07, 0.23, 0.5, 0.58, 0.4, 0.2, 0.13, 0.05, 0.15,
    0.2, 0.15, 0.12, 0.08, 0.05, 0.04, 0.03, 0.03, 0.04, 0.03, 0.03,
];

// Number of bars to render. Kept here rather than as a prop — it's a
// property of the visualizer's look, not something the caller varies.
const barCount = sample.length;
const updateIntervalMs = 125;
const minBarScale = 0.08;
const maxBarScale = 1;

export function AudioVisualizer({
    isPlaying,
    reducedMotion = false,
    className,
}: AudioVisualizerProps) {
    const [levels, setLevels] = useState<number[]>(() =>
        Array.from({ length: barCount }, (_, index) => 0.15 + (index % 5) * 0.1),
    );

    useEffect(() => {
        if (!isPlaying || reducedMotion) {
            setLevels(sample.map((value) => Math.max(minBarScale, value)));
            return;
        }

        const noise = new Perlin();
        let tick = 0;

        const update = () => {
            tick += 1;
            setLevels(
                sample.map((baseValue, index) => {
                    const noiseValue = (noise.getNoiseValue(index * 0.1 + tick * 0.03) + 1) / 2;
                    const randomValue = Math.random();
                    const value = noiseValue * randomValue * baseValue;
                    return Math.max(minBarScale, Math.min(maxBarScale, value));
                }),
            );
        };

        update();
        const interval = window.setInterval(update, updateIntervalMs);
        return () => window.clearInterval(interval);
    }, [isPlaying, reducedMotion]);

    return (
        <div aria-hidden data-playing={isPlaying} className={className}>
            <div className="flex h-8 items-end gap-[2px] overflow-visible">
                {levels.map((level, index) => (
                    <span
                        key={index}
                        className="w-[4px] origin-bottom rounded-full bg-[#345] transition-transform duration-[125ms] ease-linear dark:bg-[#9cc4ff]"
                        style={{
                            height: "100%",
                            transform: `scale3d(1, ${level}, 1)`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
