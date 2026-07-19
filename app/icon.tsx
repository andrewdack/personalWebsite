import { ImageResponse } from "next/og";
import { loadGoogleFont } from "@/lib/google-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const FONT_FAMILY = "Ma Shan Zheng";

export default async function Icon() {
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
                fontSize: 26,
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
