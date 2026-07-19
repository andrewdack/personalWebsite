//   apple-icon.tsx generates the icon iOS/iPadOS uses
//   specifically when someone adds your site to their home 
//   screen (via Safari's "Add to Home Screen") — it shows up
//   as the app-like icon tile, and is also what
//   Safari/Messages sometimes use for link previews on Apple
//   devices. It's rendered larger (180×180 here) since it
//   needs to look sharp as a full app icon, not a tiny tab
//   icon.

import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/google-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const FONT_FAMILY = "Ma Shan Zheng";

export default async function AppleIcon() {
    const fontData = await loadGoogleFont(FONT_FAMILY, "胡");

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
                color: "#fafafa",
                fontFamily: FONT_FAMILY,
                fontSize: 130,
            }}
        >
            胡
        </div>,
        {
            ...size,
            fonts: [
                {
                    name: FONT_FAMILY,
                    data: fontData,
                    weight: 400,
                    style: "normal",
                },
            ],
        },
    );
}
