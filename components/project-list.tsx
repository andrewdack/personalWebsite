import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/data/site";
import { iconLink } from "@/lib/styles";
import type { CSSProperties } from "react";

export function ProjectList({
    projects,
    cascade,
}: {
    projects: Project[];
    cascade: () => CSSProperties;
}) {
    return (
        <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.5rem,1.6vh,1.625rem)]">
            {projects.map((project) => (
                <li key={project.title} className="animate-fade-in-up" style={cascade()}>
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
