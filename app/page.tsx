import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { NowPlaying } from "@/components/now-playing";
import { ThemeToggle } from "@/components/theme-toggle";
import { site, work, projects, socials } from "@/data/site";
import Clock from "@/components/clock";

const iconLink =
    "text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100";
const sectionHeading =
    "text-[15px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500";

const socialLinks = [
    { label: "GitHub", href: socials.github, Icon: SiGithub },
    { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
    { label: "LeetCode", href: socials.leetcode, Icon: SiLeetcode },
    { label: "Email", href: socials.email, Icon: IoMdMail, size: 21 },
];

export default function Home() {
    return (
        <main className="mx-auto flex h-dvh max-w-165 flex-col justify-center overflow-hidden px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
            {/* Header */}
            <header className="flex items-start justify-between">
                <div>
                    <h1 className="font-serif text-[28px] font-semibold tracking-tight">
                        {site.name}
                    </h1>
                    <p className="mt-1.25 flex items-center gap-2 text-[15px] text-neutral-500 dark:text-neutral-400">
                        <FiMapPin size={14} />
                        {site.location} — <Clock/>
                    </p>
                </div>
                <ThemeToggle />
            </header>

            {/* Bio */}
            <section className="mt-[clamp(0.75rem,2.6vh,2.25rem)] space-y-1 text-[17px] leading-relaxed">
                <p>{site.bio}</p>
                <p className="text-neutral-500 dark:text-neutral-400">
                    {site.interests}
                </p>
            </section>

            {/* Experience */}
            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <h2 className={sectionHeading}>
                    Experience
                </h2>
                <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.375rem,1vh,0.8125rem)]">
                    {work.map((entry) => (
                        <li
                            key={entry.role + entry.company}
                            className="text-[17px]"
                        >
                            {entry.role}{" "}
                            <span className="text-neutral-400 dark:text-neutral-500">
                                @
                            </span>{" "}
                            <a
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-block font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                            >
                                {entry.company}
                                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-neutral-300 transition-transform duration-300 ease-out group-hover:scale-x-0 dark:bg-neutral-600" />
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Projects */}
            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <h2 className={sectionHeading}>
                    Projects
                </h2>
                <ul className="mt-[clamp(0.5rem,1.6vh,1.125rem)] space-y-[clamp(0.5rem,1.6vh,1.625rem)]">
                    {projects.map((project) => (
                        <li key={project.title}>
                            <div className="flex items-center gap-3">
                                <h3 className="text-[17px] font-medium">
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
                                        <FiExternalLink size={15} />
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

            {/* Footer / socials */}
            <footer className="mt-[clamp(1rem,3.4vh,3.3125rem)] flex items-center justify-between gap-6.5 border-t border-neutral-200 pt-[clamp(0.75rem,2vh,2.25rem)] dark:border-neutral-800">
                <div className="flex items-center gap-5.5">
                    {socialLinks.map(({ label, href, Icon, size }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={iconLink}
                        >
                            <Icon size={size ?? 20} />
                        </a>
                    ))}
                </div>
                <NowPlaying />
            </footer>
        </main>
    );
}
