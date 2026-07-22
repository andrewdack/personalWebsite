import { projects } from "@/data/site";
import { sectionHeading, iconLink } from "@/lib/styles";
import Link from "next/link";
import { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

export default function Projects({ cascade }: { cascade: () => CSSProperties }) {
    return (
        <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
            <h2 className={`animate-fade-in-up ${sectionHeading} flex`} style={cascade()}>
                <Link href="/projects" className={`flex items-center`}>
                    Projects
                    <FiArrowUpRight
                        size={16}
                        className="transition-opacity duration-200 ease-smooth group-hover:opacity-100"
                    />
                </Link>
            </h2>
            <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.5rem,1.6vh,1.625rem)]">
                {projects.map((project) => (
                    <li
                        key={project.title}
                        className="animate-fade-in-up"
                        style={cascade()}
                    >
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
        </section>
    );
}