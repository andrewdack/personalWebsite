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
        <main className="mx-auto flex min-h-screen max-w-165 flex-col px-6.5 py-17.5 sm:py-26.5">
            {/* Header */}
            <header className="flex items-start justify-between">
                <div>
                    <h1 className="text-[26px] font-semibold tracking-tight">
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
            <section className="mt-9 space-y-1 text-[17px] leading-relaxed">
                <p>{site.bio}</p>
                <p className="text-neutral-500 dark:text-neutral-400">
                    {site.interests}
                </p>
            </section>

            {/* Experience */}
            <section className="mt-13.25">
                <h2 className={sectionHeading}>
                    Experience
                </h2>
                <ul className="mt-4.5 space-y-3.25">
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
            <section className="mt-13.25">
                <h2 className={sectionHeading}>
                    Projects
                </h2>
                <ul className="mt-4.5 space-y-6.5">
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
            <footer className="mt-17.5 flex items-center justify-between gap-6.5 border-t border-neutral-200 pt-9 dark:border-neutral-800">
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
