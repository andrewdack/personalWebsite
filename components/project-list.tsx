import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { projects } from "@/data/site";
import { iconLink } from "@/lib/styles";
import { TechStack } from "@/components/tech-stack";

// The list of projects, shared between the home page's Projects section and
// the dedicated /projects page so the two never drift apart. Each item always
// plays the `animate-fade-in-up` entrance; pass `itemStyles` (one style per
// project) to stagger those entrances via animation-delay, or omit it to let
// them all animate together at delay 0. The styles are computed by the caller
// rather than via a counter passed in here — a mutable counter called inside
// this child would run *after* the parent's remaining inline JSX, throwing the
// stagger order off. The /projects page is where richer per-project detail
// (visuals, tech, writeups) will hang off these entries later. Pass `limit`
// to show only the first N projects — the home page teases the top few and
// links through to /projects for the full list.
export function ProjectList({
    itemStyles,
    limit,
}: {
    itemStyles?: CSSProperties[];
    limit?: number;
}) {
    const shown = limit === undefined ? projects : projects.slice(0, limit);
    return (
        <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.5rem,1.6vh,1.625rem)]">
            {shown.map((project, i) => (
                <li key={project.title} className="animate-fade-in-up" style={itemStyles?.[i]}>
                    <div className="flex items-center gap-3">
                        <h3 className="text-[17px] font-medium text-neutral-900 dark:text-neutral-100">
                            {project.title}
                        </h3>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} on GitHub`}
                                className={iconLink}
                            >
                                <SiGithub size={15} />
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} live site`}
                                className={iconLink}
                            >
                                <FiArrowUpRight size={15} />
                            </a>
                        )}
                        <TechStack keys={project.tech} className="ml-auto" />
                    </div>
                    <p className="mt-1.25 text-[17px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {project.description}
                    </p>
                </li>
            ))}
        </ul>
    );
}
