"use client";

import { useEffect, useState } from "react";
import { SiSpotify } from "react-icons/si";

type Track = {
    isPlaying: boolean;
    title: string;
    artist: string;
    url: string;
};

export function NowPlaying() {
    const [track, setTrack] = useState<Track | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/spotify");
                const data = await res.json();
                if (!cancelled) setTrack(data.title ? data : null);
            } catch {
                if (!cancelled) setTrack(null);
            }
        };

        load();
        const interval = setInterval(load, 60_000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    // Unconfigured or errored: render nothing, the footer looks unchanged.
    if (!track) return null;

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[15px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
            <SiSpotify
                size={15}
                className={track.isPlaying ? "text-[#1DB954]" : ""}
            />
            <span className="truncate">
                {track.isPlaying ? (
                    <>
                        {track.title}
                        <span className="text-neutral-400 dark:text-neutral-500">
                            {" "}
                            — {track.artist}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="text-neutral-400 dark:text-neutral-500">
                            Last played:{" "}
                        </span>
                        {track.title}
                        <span className="text-neutral-400 dark:text-neutral-500">
                            {" "}
                            — {track.artist}
                        </span>
                    </>
                )}
            </span>
        </a>
    );
}
