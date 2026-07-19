"use client";

import { useEffect, useState } from "react";

export default function Clock() {
    // Starts null so the server-rendered markup has no time in it — the
    // client fills in the real time on mount, avoiding a hydration mismatch
    // against whatever second the server happened to render.
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return <span>{time.toLocaleTimeString()}</span>;
}
