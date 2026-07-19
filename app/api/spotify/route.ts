import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
    "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
    "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type Track = {
    isPlaying: boolean;
    title: string;
    artist: string;
    url: string;
};

async function getAccessToken(): Promise<string | null> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    if (!clientId || !clientSecret || !refreshToken) return null;

    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        // Access tokens last an hour; let Vercel's fetch cache reuse one
        // instead of minting a new token on every poll.
        next: { revalidate: 3000 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toTrack(item: any, isPlaying: boolean): Track {
    return {
        isPlaying,
        title: item.name,
        artist: item.artists.map((a: { name: string }) => a.name).join(", "),
        url: item.external_urls.spotify,
    };
}

export async function GET() {
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return NextResponse.json({ configured: false });
    }
    const auth = { Authorization: `Bearer ${accessToken}` };

    const nowRes = await fetch(NOW_PLAYING_URL, {
        headers: auth,
        cache: "no-store",
    });
    if (nowRes.status === 200) {
        const data = await nowRes.json();
        if (data.item && data.currently_playing_type === "track") {
            return NextResponse.json(toTrack(data.item, data.is_playing));
        }
    } else if (nowRes.status !== 204) {
        console.error(`Spotify currently-playing failed: ${nowRes.status}`);
    }

    // Cache the recently-played lookup — it changes rarely and has a much
    // stricter rate limit than currently-playing, so refetching it on every
    // 60s poll risks tripping a multi-hour 429 ban for no benefit.
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
        headers: auth,
        next: { revalidate: 120 },
    });
    if (recentRes.ok) {
        const data = await recentRes.json();
        const item = data.items?.[0]?.track;
        if (item) {
            return NextResponse.json(toTrack(item, false));
        }
    } else {
        console.error(
            `Spotify recently-played failed: ${recentRes.status}` +
                (recentRes.headers.get("retry-after")
                    ? ` (retry-after ${recentRes.headers.get("retry-after")}s)`
                    : ""),
        );
    }

    return NextResponse.json({ configured: false });
}
