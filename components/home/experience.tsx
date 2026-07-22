import { work } from "@/data/site";
import { sectionHeading, linkHover } from "@/lib/styles";
import { CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Experience({ cascade }: { cascade: () => CSSProperties }) {
    return (
        <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
            <h2 className={`animate-fade-in-up ${sectionHeading}`} style={cascade()}>
                Experience
            </h2>
            <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.375rem,1vh,0.8125rem)]">
                {work.map((entry) => (
                    <li
                        key={entry.role + entry.company}
                        className="animate-fade-in-up text-[17px] text-neutral-900 dark:text-neutral-100"
                        style={cascade()}
                    >
                        {entry.role}{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">
                            @
                        </span>{" "}
                        <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group inline-flex items-center gap-0.5 font-medium ${linkHover}`}
                        >
                            <span className="relative">
                                {entry.company}
                                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-neutral-300 transition-transform duration-300 ease-smooth group-hover:scale-x-0 dark:bg-neutral-600" />
                            </span>
                            <FiArrowUpRight
                                size={13}
                                className="opacity-0 transition-opacity duration-200 ease-smooth group-hover:opacity-100"
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
