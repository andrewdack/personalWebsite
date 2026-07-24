import type { CSSProperties } from "react";
import { tech, type TechKey } from "@/lib/tech";
import { tooltipBase } from "@/lib/styles";

// A row of brand-colored technology icons, each revealing its name in a
// tooltip on hover. Reuses the shared `tooltip` recipe (same one the footer
// socials use) so it stays visually consistent. Per-icon brand color is fed
// in via CSS custom properties on the `<li>` so a single static className can
// still switch between light/dark brand colors — dynamic Tailwind class names
// wouldn't survive the JIT compile. When a tech has a `url` (see lib/tech.ts),
// its icon is a link out to that site; otherwise it's inert. Renders nothing
// when there's no stack.
// Positioning (margins, alignment) is left to the caller via `className` so
// the same row can sit inline to the right of a heading or wherever else.
// The stack is right-aligned by callers, so the last icon sits flush against
// the content edge; its tooltip right-anchors (growing leftward into the
// content) instead of centering, which would overflow the viewport on narrow
// screens. Interior tooltips have room, so they stay centered.
export function TechStack({
    keys,
    className,
}: {
    keys?: readonly TechKey[];
    className?: string;
}) {
    if (!keys?.length) return null;

    return (
        <ul className={`flex flex-wrap items-center gap-2.5 ${className ?? ""}`}>
            {keys.map((key, i) => {
                const { label, Icon, color, darkColor, size, className: iconClassName, url } = tech[key];
                const tipPosition =
                    i === keys.length - 1 ? "left-1/2 -translate-x-1/2" : "left-1/2 -translate-x-1/2";
                const icon = (
                    <Icon
                        size={size ?? 17}
                        aria-hidden
                        className={`text-[color:var(--c)] dark:text-[color:var(--cd)] ${iconClassName ?? ""}`}
                    />
                );
                const tooltip = (
                    <span aria-hidden className={`${tooltipBase} ${tipPosition}`}>
                        {label}
                    </span>
                );
                return (
                    <li
                        key={key}
                        style={
                            {
                                "--c": color,
                                "--cd": darkColor ?? color,
                            } as CSSProperties
                        }
                    >
                        {url ? (
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="group relative flex transition-opacity duration-200 ease-smooth hover:opacity-70"
                            >
                                {icon}
                                {tooltip}
                            </a>
                        ) : (
                            <span aria-label={label} className="group relative flex">
                                {icon}
                                {tooltip}
                            </span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
