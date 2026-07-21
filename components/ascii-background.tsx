// A very faint tiled scatter of monospace glyphs behind the whole page —
// a texture, not a message. Pure SVG/CSS (no JS, no animation): the glyphs
// carry `fill="currentColor"` and the color itself comes from a `text-*`
// utility on the wrapping <svg>, so the site's existing sitewide color
// transition (globals.css's `*, *::before, *::after` rule) cross-fades it
// automatically on every dark/light toggle — no bespoke transition needed.
const glyphs = [
    { x: 24, y: 50, text: "01" },
    { x: 210, y: 110, text: "{ }" },
    { x: 90, y: 190, text: ";" },
    { x: 300, y: 40, text: "10" },
    { x: 150, y: 280, text: "=>" },
    { x: 40, y: 320, text: "01" },
    { x: 260, y: 250, text: "< >" },
    { x: 190, y: 20, text: "0" },
    { x: 330, y: 200, text: "1" },
] as const;

const tileSize = 380;

export function AsciiBackground() {
    return (
        <svg
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-neutral-900/[0.025] dark:text-neutral-100/[0.035]"
        >
            <defs>
                <pattern
                    id="ascii-bg-tile"
                    width={tileSize}
                    height={tileSize}
                    patternUnits="userSpaceOnUse"
                >
                    {glyphs.map(({ x, y, text }, i) => (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            fill="currentColor"
                            fontFamily="var(--font-mono)"
                            fontSize={13}
                        >
                            {text}
                        </text>
                    ))}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ascii-bg-tile)" />
        </svg>
    );
}
