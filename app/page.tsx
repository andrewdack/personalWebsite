import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { SiGithub, SiInstagram, SiLeetcode } from "react-icons/si";
import { NowPlaying } from "@/components/now-playing";
import { ThemeToggle } from "@/components/theme-toggle";
import { site, work, projects, socials } from "@/data/site";
import { iconLink, linkHover, tooltip } from "@/lib/styles";
import Clock from "@/components/clock";

const sectionHeading =
    "text-[15px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500";

const socialLinks = [
    { label: "GitHub", href: socials.github, Icon: SiGithub },
    { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
    { label: "Instagram", href: socials.instagram, Icon: SiInstagram},
    { label: "LeetCode", href: socials.leetcode, Icon: SiLeetcode },
    { label: "Send an email!", href: socials.email, Icon: IoMdMail, size: 21 },
];

export default function Home() {
    // Continuous per-line stagger for the page-load entrance — each line
    // gets `cascade()`'s next delay in top-to-bottom source order (JS
    // evaluates .map() callbacks in order too, so the work/project lists
    // fall in line automatically), reading as one flowing reveal instead
    // of a handful of section-sized chunks arriving all at once.
    const cascadeStepMs = 45;
    let cascadeStep = 0;
    const cascade = () => ({ animationDelay: `${cascadeStep++ * cascadeStepMs}ms` });

    return (
        <main className="mx-auto flex min-h-dvh max-w-165 flex-col justify-center px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
            {/* Header */}
            <header className="animate-fade-in-up flex items-start justify-between" style={cascade()}>
                <div>
                    <h1 className="font-serif text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {site.name}
                    </h1>
                    <p className="mt-1.25 flex items-center gap-2 text-[15px] text-neutral-500 dark:text-neutral-400">
                        <FiMapPin size={14} />
                        {site.location}
                        <span className="text-neutral-500 dark:text-neutral-400">—</span>
                        <Clock />
                    </p>
                </div>
                <ThemeToggle />
            </header>

            {/* Bio */}
            <section className="mt-[clamp(0.75rem,2.6vh,2.25rem)] space-y-1 text-[17px] leading-relaxed">
                <p className="animate-fade-in-up text-neutral-900 dark:text-neutral-100" style={cascade()}>
                    {site.bio}
                </p>
                <p className="animate-fade-in-up text-neutral-500 dark:text-neutral-400" style={cascade()}>
                    {site.interests}
                </p>
            </section>

            {/* Experience */}
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

            {/* Projects */}
            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <h2 className={`animate-fade-in-up ${sectionHeading}`} style={cascade()}>
                    Projects
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

            {/* Footer / socials — stacks on phones so the now-playing marquee
                gets full width (side-by-side squeezes it to nothing); returns
                to a single row at sm and up. */}
            <footer className="mt-[clamp(1rem,3.4vh,3.3125rem)] flex flex-col items-start gap-4 border-t border-neutral-200 pt-[clamp(0.75rem,2vh,2.25rem)] sm:flex-row sm:items-center sm:justify-between sm:gap-6.5 dark:border-neutral-800">
                <div className="animate-fade-in-up flex items-center gap-5.5" style={cascade()}>
                    {socialLinks.map(({ label, href, Icon, size }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={`group relative ${iconLink}`}
                        >
                            <Icon size={size ?? 20} />
                            <span aria-hidden className={tooltip}>
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
                <div className="animate-fade-in-up w-full sm:w-auto" style={cascade()}>
                    <NowPlaying />
                </div>
            </footer>
        </main>
    );
}
