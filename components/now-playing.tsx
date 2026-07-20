"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";
import { SiSpotify } from "react-icons/si";
import { AudioVisualizer } from "@/components/audio-visualizer";
import { linkHover } from "@/lib/styles";

type Track = {
    isPlaying: boolean;
    title: string;
    artist: string;
    url: string;
};
// Delay in ms between each request to the Spotify API
const timeDelayMs = 30_000;
// Marquee travel speed in px/s, and the share of the animation timeline
// actually spent moving (the rest is the dwell at each end — see the
// `marquee-shift` keyframes in globals.css). The timing function is a
// near-linear bezier — a brief ramp at each end, constant speed through
// the bulk — so this is the average; it peaks about 25% higher. Full
// `ease-in-out` crawled into each dwell and rushed the middle, which read
// as cheap; `linear` fixed that but started and stopped dead.
const marqueeSpeedPxPerSec = 30;
// Should not be changed: This must equal the share of the keyframe timeline
// spent moving, or the px/s above stops being accurate.
const marqueeMovingFraction = 0.76;
// Number of characters to limit the maximum window of the marquee by
const maxMarqueeChar = 26;

const reducedMotionQuery = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)");
const subscribeReducedMotion = (onChange: () => void) => {
    const query = reducedMotionQuery();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

export function NowPlaying() {
    const [track, setTrack] = useState<Track | null>(null);
    
    // How far the track text overflows its viewport, in px. 0 means it
    // fits and the marquee stays off.
    const [overflow, setOverflow] = useState(0);
    
    // Reduced motion falls back to a static, ellipsised title. Read in JS
    // rather than via `motion-reduce:` because the animation is set inline
    // (the duration is per-track), and inline styles beat any utility class.
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        () => reducedMotionQuery().matches,
        () => false, // server render: assume motion is fine, corrected on hydrate
    );
    const viewportRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        let cancelled = false;
        
        const load = async () => {
            try {
                const res = await fetch("/api/spotify");
                const data = await res.json();
                // Only overwrite state on an actual track. A failed/empty
                // poll (rate-limited, nothing playing right now, network
                // hiccup) leaves the last known-good track on screen
                // instead of blanking out something that's still accurate.
                if (!cancelled && data.title) setTrack(data);
            } catch {
                // Same reasoning: ignore transient errors, keep last track.
            }
        };
        
        load();
        const interval = setInterval(load, timeDelayMs);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    // Re-measure whenever the track changes or the footer resizes — the
    // available width depends on the viewport, so a title that fits on a
    // wide window can overflow on a narrow one and vice versa.
    const measure = useCallback(() => {
        const viewport = viewportRef.current;
        const text = textRef.current;
        if (!viewport || !text) return;
        const available = viewport.getBoundingClientRect().width;
        setOverflow(Math.max(0, text.scrollWidth - available));
    }, []);
    
    useEffect(() => {
        const viewport = viewportRef.current;
        const text = textRef.current;
        if (!viewport || !text) return;
        
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        observer.observe(text);
        return () => observer.disconnect();
    }, [measure, track]);
    
    // Unconfigured or errored: render nothing, the footer looks unchanged.
    if (!track) return null;
    // ---------------------------------------------------------------------------------------------

    // Setting up the status string for spotify
    const playingStatus = track.isPlaying ? "Now playing:" : "Last played:";
    const trackArtistText = `${track.title} — ${track.artist}`;
    // Round-trip at a constant speed, stretched to account for the dwells.
    const marqueeDurationSec =
        (2 * overflow) / marqueeSpeedPxPerSec / marqueeMovingFraction;

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            title={trackArtistText}
            className={`flex min-w-0 items-center gap-2 text-[15px] ${linkHover}`}
        >
            <SiSpotify
                size={15}
                className={`shrink-0 ${track.isPlaying ? "text-[#1DB954]" : "text-neutral-400 dark:text-neutral-500"}`}
            />
            {/* Own flex row so the label and title stay a single space apart
                rather than picking up the anchor's icon gap. The label holds
                its full width and only the title shrinks, so the marquee is
                always the title — never "Now playing:". */}
            <span className="flex min-w-0 items-center">
                <span className="shrink-0 whitespace-pre text-neutral-400 dark:text-neutral-500">
                    {playingStatus}{" "}
                </span>
                {/* Positioning context for the visualizer. It has to be this
                    wrapper rather than the viewport itself: the viewport is
                    `overflow-hidden` (that's what clips the marquee), so a
                    child positioned below it would be clipped away.

                    maxMarqueeChar lives here and is the knob for how far left
                    a long title may push the footer: the window never exceeds
                    it, and anything past it becomes marquee travel instead.
                    Set as an inline style, not a `max-w-[…]` class — Tailwind
                    only generates rules for class strings it can find in the
                    source, so an interpolated one would compile to nothing. */}
                <span
                    className="relative min-w-0"
                    style={{ maxWidth: `${maxMarqueeChar}ch` }}
                >
                    <span ref={viewportRef} className="block overflow-hidden">
                        <span
                            ref={textRef}
                            className={
                                reducedMotion
                                    ? "block truncate"
                                    : "block w-max whitespace-nowrap"
                            }
                            style={
                                !reducedMotion && overflow > 0
                                    ? {
                                          ["--marquee-distance" as string]: `${overflow}px`,
                                          animation: `marquee-shift ${marqueeDurationSec}s cubic-bezier(0.2, 0, 0.8, 1) infinite`,
                                      }
                                    : undefined
                            }
                        >
                            {trackArtistText}
                        </span>
                    </span>
                    {/* `top-full` puts it directly under the marquee and
                        `w-full` matches its width exactly, both derived from
                        the wrapper rather than duplicated. Absolute, so it
                        contributes no height and the footer cannot shift —
                        it also can't widen the wrapper, since out-of-flow
                        boxes don't participate in shrink-to-fit sizing. */}
                    <AudioVisualizer
                        isPlaying={track.isPlaying}
                        className="absolute top-full left-0 w-full"
                    />
                </span>
            </span>
        </a>
    );
}
