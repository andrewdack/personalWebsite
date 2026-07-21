import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { loadGoogleFont } from "@/lib/google-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERIF_FAMILY = "Fraunces";
const SANS_FAMILY = "Geist";

// Opengraph is the social preview image
// It shows up when site's link gets shared on X, iMessage, Slack,
// Discord, etc. accessible at `localhost:3000/opengraph-image` or `andrewjhu.com/opengraph-image`
export default async function OpengraphImage() {
    const [serifData, sansData] = await Promise.all([
        loadGoogleFont(SERIF_FAMILY, site.name, 600),
        // Satori falls back to matching a registered font by glyph coverage
        // when a div's fontFamily isn't registered at all, which leaks the
        // serif into this text — registering a real sans font for exactly
        // the characters used here avoids that ambiguity.
        loadGoogleFont(SANS_FAMILY, `${site.bio}${site.location}`, 400),
    ]);

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px 96px",
                background: "#0a0a0a",
                color: "#fafafa",
            }}
        >
            <div
                style={{
                    fontFamily: SERIF_FAMILY,
                    fontSize: 88,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                }}
            >
                {site.name}
            </div>
            <div
                style={{
                    fontFamily: SANS_FAMILY,
                    marginTop: 28,
                    fontSize: 32,
                    color: "#a1a1a1",
                    maxWidth: 900,
                }}
            >
                {site.bio}
            </div>
            <div
                style={{
                    fontFamily: SANS_FAMILY,
                    marginTop: 48,
                    fontSize: 26,
                    color: "#737373",
                }}
            >
                {site.location}
            </div>
        </div>,
        {
            ...size,
            fonts: [
                {
                    name: SERIF_FAMILY,
                    data: serifData,
                    weight: 600,
                    style: "normal",
                },
                {
                    name: SANS_FAMILY,
                    data: sansData,
                    weight: 400,
                    style: "normal",
                },
            ],
        },
    );
}
