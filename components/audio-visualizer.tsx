"use client";

/**
 * Audio visualizer that sits under the now-playing marquee.
 *
 * SCAFFOLD — geometry and the interface with <NowPlaying /> are wired up
 * and verified; the bars themselves are not implemented yet.
 *
 * Open question before implementing: where do the levels come from?
 * Spotify's Web API has no realtime audio stream, and the endpoints that
 * used to expose per-segment loudness (audio-analysis / audio-features)
 * were closed to new applications in November 2024, so this cannot be a
 * true spectrum of what's playing. Realistic options:
 *
 *   1. Decorative — pseudo-random bar heights animated while `isPlaying`,
 *      frozen (or hidden) when it's a last-played track. No real data, but
 *      it reads correctly and costs nothing. Almost certainly what's wanted.
 *   2. Real Web Audio — requires an actual audio element on the page
 *      (a preview URL through AnalyserNode). Genuine data, but Spotify has
 *      been removing preview_url access, and it would need a user gesture.
 *
 * Pick one before filling in the TODOs below; it decides whether this
 * component needs state and a rAF loop at all.
 */

type AudioVisualizerProps = {
    /**
     * Whether the track is currently playing. Drives whether the bars are
     * animating or at rest — a last-played track should not look live.
     */
    isPlaying: boolean;
    /**
     * Positioning classes supplied by <NowPlaying />. It passes the classes
     * that pin this to the marquee's width and put it directly below,
     * absolutely positioned so the footer's height never changes.
     */
    className?: string;
};

// Number of bars to render. Kept here rather than as a prop — it's a
// property of the visualizer's look, not something the caller varies.
const barCount = 20;

export function AudioVisualizer({ isPlaying, className }: AudioVisualizerProps) {
    // TODO: source the per-bar levels — see the open question above.
    // Whichever option wins, the animation should be paused (not just
    // visually frozen) when !isPlaying, and skipped entirely under
    // `prefers-reduced-motion`. NowPlaying already reads that media query
    // via useSyncExternalStore; lift it to a shared hook rather than
    // duplicating the matchMedia wiring here.

    // TODO: render `barCount` bars. Sizing note: the container below is
    // deliberately zero-height and the bars must not change that — give
    // them a fixed height and let them overflow, or the footer shifts,
    // which is the one thing this layout has to avoid.
    return (
        <div
            aria-hidden
            data-playing={isPlaying}
            data-bars={barCount}
            className={className}
        />
    );
}
