// Satori (used by next/og's ImageResponse) has no built-in CJK glyph
// support, so any non-Latin character needs its font bytes passed in
// explicitly. Google Fonts serves woff2 by default, which Satori can't
// read — spoofing an old Chrome UA gets the ttf variant instead, and
// `text=` subsets the response to just the glyphs we need.
export async function loadGoogleFont(family: string, text: string, weight?: number) {
    const familyParam = weight ? `${family}:wght@${weight}` : family;
    const css = await (
        await fetch(
            `https://fonts.googleapis.com/css2?family=${encodeURIComponent(familyParam)}&text=${encodeURIComponent(text)}`,
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
                },
            },
        )
    ).text();

    const match = css.match(/src: url\(([^)]+)\)/);
    if (!match) {
        throw new Error(`${family} font URL not found in Google Fonts response`);
    }
    const fontRes = await fetch(match[1]);
    return fontRes.arrayBuffer();
}
