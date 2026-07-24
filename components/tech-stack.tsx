import type { CSSProperties } from "react";
import { tech, type TechKey } from "@/lib/tech";
import { tooltipBase } from "@/lib/styles";

// A row of brand-colored technology icons, each revealing its name in a
// tooltip on hover. Reuses the shared `tooltip` recipe (same one the footer
// socials use) so it stays visually consistent. Per-icon brand color is fed
// in via CSS custom properties on the trigger so a single static className can
// still switch between light/dark brand colors — dynamic Tailwind class names
// wouldn't survive the JIT compile. Renders nothing when there's no stack.
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
                const { label, Icon, color, darkColor, size } = tech[key];
                const tipPosition =
                    i === keys.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2";
                return (
                    <li
                        key={key}
                        aria-label={label}
                        className="group relative flex"
                        style={
                            {
                                "--c": color,
                                "--cd": darkColor ?? color,
                            } as CSSProperties
                        }
                    >
                        <Icon
                            size={size ?? 17}
                            aria-hidden
                            className="text-[color:var(--c)] dark:text-[color:var(--cd)]"
                        />
                        <span aria-hidden className={`${tooltipBase} ${tipPosition}`}>
                            {label}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
