import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
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
                        fontFamily: "Georgia, serif",
                        fontSize: 88,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                    }}
                >
                    {site.name}
                </div>
                <div
                    style={{
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
                        marginTop: 48,
                        fontSize: 26,
                        color: "#737373",
                    }}
                >
                    {site.location}
                </div>
            </div>
        ),
        size,
    );
}
