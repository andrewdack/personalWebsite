import type { CSSProperties } from "react";
import { tech, type TechKey } from "@/lib/tech";
import { tooltip } from "@/lib/styles";

// A row of brand-colored technology icons, each revealing its name in a
// tooltip on hover. Reuses the shared `tooltip` recipe (same one the footer
// socials use) so it stays visually consistent. Per-icon brand color is fed
// in via CSS custom properties on the trigger so a single static className can
// still switch between light/dark brand colors — dynamic Tailwind class names
// wouldn't survive the JIT compile. Renders nothing when there's no stack.
// Positioning (margins, alignment) is left to the caller via `className` so
// the same row can sit inline to the right of a heading or wherever else.
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
            {keys.map((key) => {
                const { label, Icon, color, darkColor, size } = tech[key];
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
                            size={size ?? 15}
                            aria-hidden
                            className="text-[color:var(--c)] dark:text-[color:var(--cd)]"
                        />
                        <span aria-hidden className={tooltip}>
                            {label}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
