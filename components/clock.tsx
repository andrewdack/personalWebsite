"use client";

import { useEffect, useState } from "react";

export default function Clock() {
    // Starts null so the server-rendered markup has no time in it — the
    // client fills in the real time on mount, avoiding a hydration mismatch
    // against whatever second the server happened to render.
    const [time, setTime] = useState<Date | null>(null);
    // Drives the fade-in. Starts false so the clock rises in on mount
    // rather than popping in the instant the client fills in the time.
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // We have to put synchronous setState in a callback to avoid extra render lint error
        const tick = () => setTime(new Date());
        tick();

        // Needs a full extra frame after the opacity-0 render commits, not
        // just one rAF — the first rAF still lands before the browser has
        // painted that commit, so flipping to visible there collapses into
        // the same frame and the "transition" jumps straight to its end
        // state instead of animating.
        let raf2 = 0;
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => setVisible(true));
        });

        const interval = setInterval(tick, 1000);
        return () => {
            clearInterval(interval);
            cancelAnimationFrame(raf1);
            cancelAnimationFrame(raf2);
        };
    }, []);

    if (!time) return null;

    return (
        <span
            className={`transition-opacity duration-300 ease-smooth ${visible ? "opacity-100" : "opacity-0"}`}
        >
            {time.toLocaleTimeString()}
        </span>
    );
}
