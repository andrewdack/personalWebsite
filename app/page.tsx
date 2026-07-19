import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX, SiGmail } from "react-icons/si";
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
    { label: "X", href: socials.x, Icon: SiX },
    { label: "Email", href: socials.email, Icon: SiGmail },
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
                                className="font-medium underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
                            >
                                {entry.company}
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
                    {socialLinks.map(({ label, href, Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={iconLink}
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </div>
                <NowPlaying />
            </footer>
        </main>
    );
}
