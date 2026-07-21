// A very faint tiled scatter of monospace glyphs behind the whole page —
// a texture, not a message. Pure SVG/CSS: the glyphs carry
// `fill="currentColor"` and the color itself comes from a `text-*` utility
// on the wrapping <svg>, so the site's existing sitewide color transition
// (globals.css's `*, *::before, *::after` rule) cross-fades it automatically
// on every dark/light toggle — no bespoke transition needed.
//
// Each glyph also gets its own `ascii-twinkle` animation (globals.css) with
// its own duration/delay, so they breathe in and out of visibility out of
// phase with each other — a quiet shimmer rather than the whole pattern
// pulsing in sync. Durations and delays are hand-picked, not randomized:
// this renders on the server, so real randomness would mismatch on hydration.
const glyphs = [
    { x: 24, y: 50, text: "01", duration: 3.4, delay: 0 },
    { x: 210, y: 110, text: "{ }", duration: 4.2, delay: 1.1 },
    { x: 90, y: 190, text: ";", duration: 3.8, delay: 2.4 },
    { x: 300, y: 40, text: "10", duration: 5, delay: 0.6 },
    { x: 150, y: 280, text: "=>", duration: 3.1, delay: 3.2 },
    { x: 40, y: 320, text: "01", duration: 4.6, delay: 1.8 },
    { x: 260, y: 250, text: "< >", duration: 3.6, delay: 2.9 },
    { x: 190, y: 20, text: "0", duration: 4, delay: 0.3 },
    { x: 330, y: 200, text: "1", duration: 3.3, delay: 3.7 },
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
                    {glyphs.map(({ x, y, text, duration, delay }, i) => (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            fill="currentColor"
                            fontFamily="var(--font-mono)"
                            fontSize={13}
                            className="ascii-twinkle"
                            style={{
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
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
