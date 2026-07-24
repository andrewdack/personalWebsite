import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { SiGithub, SiInstagram, SiLeetcode } from "react-icons/si";
import { NowPlaying } from "@/components/now-playing";
import { ProjectList } from "@/components/project-list";
import { TechStack } from "@/components/tech-stack";
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
    // Continuous per-line stagger for the page-load entrance
    const cascadeStepMs = 75; // gap between each piece cascading in
    let cascadeStep = 3;
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
                            className="animate-fade-in-up flex flex-wrap items-center gap-x-3 text-[17px] text-neutral-900 dark:text-neutral-100"
                            style={cascade()}
                        >
                            <span>
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
                            </span>
                            <TechStack keys={entry.tech} className="ml-auto" />
                        </li>
                    ))}
                </ul>
            </section>

            {/* Projects — the heading links through to /projects, where the
                same list lives under a breadcrumb and will grow richer detail. */}
            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <h2 className="animate-fade-in-up" style={cascade()}>
                    <Link
                        href="/projects"
                        className={`group inline-flex items-center gap-1 ${sectionHeading} transition-colors hover:text-neutral-600 dark:hover:text-neutral-300`}
                    >
                        Projects
                        <FiArrowUpRight
                            size={13}
                            className="opacity-0 transition-opacity duration-200 ease-smooth group-hover:opacity-100"
                        />
                    </Link>
                </h2>
                <ProjectList limit={3} itemStyles={projects.slice(0, 3).map(() => cascade())} />
                <Link
                    href="/projects"
                    className={`animate-fade-in-up group mt-[clamp(0.75rem,1.8vh,1.5rem)] flex w-fit items-center gap-1 text-[15px] font-medium ${linkHover}`}
                    style={cascade()}
                >
                    <span className="relative">
                        View all projects
                        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-neutral-300 transition-transform duration-300 ease-smooth group-hover:scale-x-0 dark:bg-neutral-600" />
                    </span>
                    <FiArrowUpRight
                        size={15}
                        className="transition-transform duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </Link>
            </section>

            {/* Footer / socials — the divider is its own element rather than
                a border on the footer box, so it can take a cascade step
                of its own instead of appearing instantly with the rest of
                the footer's static box. Stacks on phones so the now-playing
                marquee gets full width (side-by-side squeezes it to
                nothing); returns to a single row at sm and up. */}
            <footer className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <div
                    className="animate-fade-in-up h-px bg-neutral-200 dark:bg-neutral-800"
                    style={cascade()}
                />
                <div className="flex flex-col items-start gap-4 pt-[clamp(0.75rem,2vh,2.25rem)] sm:flex-row sm:items-center sm:justify-between sm:gap-6.5">
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
                </div>
            </footer>
        </main>
    );
}
