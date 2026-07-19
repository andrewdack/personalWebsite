"use client";

import { useEffect, useState } from "react";
import { SiSpotify } from "react-icons/si";

type Track = {
    isPlaying: boolean;
    title: string;
    artist: string;
    url: string;
};
// delay in ms between each request to the spotify api
const timeDelayMs = 30_000;
const maxCharacters = 40; // the num of characters observed before it goes out
function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;

    return `${text.slice(0, maxLength - 1)}…`;
}

export function NowPlaying() {
    const [track, setTrack] = useState<Track | null>(null);

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

    // Unconfigured or errored: render nothing, the footer looks unchanged.
    if (!track) return null;

    // Setting up the status string for spotify
    const playingStatus = track.isPlaying ? "Now playing:" : "Last played:";
    const trackArtistText = `${track.title} — ${track.artist}`;
    // Truncate if necessary
    const truncatedTrackArtistText = truncateText(trackArtistText, maxCharacters);

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
            <SiSpotify
                size={15}
                className={track.isPlaying ? "text-[#1DB954]" : undefined}
            />
            <span className="truncate">
                <span className="text-neutral-400 dark:text-neutral-500">
                    {playingStatus}{" "}
                </span>
                {truncatedTrackArtistText}
            </span>
        </a>
    );
}
