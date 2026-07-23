import type { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { projects } from "@/data/site";
import { iconLink } from "@/lib/styles";

// The list of projects, shared between the home page's Projects section and
// the dedicated /projects page so the two never drift apart. Pass `itemStyles`
// (one style per project, e.g. staggered animation delays) to slot each item
// into the page-load entrance; omit it to render settled. The styles are
// computed by the caller rather than via a counter passed in here — a mutable
// counter called inside this child would run *after* the parent's remaining
// inline JSX, throwing the stagger order off. The /projects page is where
// richer per-project detail (visuals, tech, writeups) will hang off these
// entries later.
export function ProjectList({ itemStyles }: { itemStyles?: CSSProperties[] }) {
    return (
        <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.5rem,1.6vh,1.625rem)]">
            {projects.map((project, i) => (
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
                    </div>
                    <p className="mt-1.25 text-[17px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                        {project.description}
                    </p>
                </li>
            ))}
        </ul>
    );
}
