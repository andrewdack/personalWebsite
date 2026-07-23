import type { Metadata } from "next";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { ProjectList } from "@/components/project-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { projects } from "@/data/site";

export const metadata: Metadata = {
    title: "Projects — Andrew Hu",
};

export default function ProjectsPage() {
    // Same continuous per-line stagger the home page uses for its entrance.
    const cascadeStepMs = 75;
    let cascadeStep = 3;
    const cascade = () => ({ animationDelay: `${cascadeStep++ * cascadeStepMs}ms` });

    return (
        <main className="mx-auto flex min-h-dvh max-w-165 flex-col justify-center px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
            {/* Breadcrumb takes the slot the site name holds on the home page. */}
            <header className="animate-fade-in-up flex items-start justify-between" style={cascade()}>
                <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-1.5 font-sans text-lg font-medium tracking-tight"
                >
                    <Link
                        href="/"
                        className="group text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                        <span className="relative">
                            Home
                            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-neutral-300 transition-transform duration-300 ease-smooth group-hover:scale-x-0 dark:bg-neutral-600" />
                        </span>
                    </Link>
                    <FiChevronRight
                        aria-hidden
                        className="text-neutral-300 dark:text-neutral-600"
                        size={16}
                    />
                    <span aria-current="page" className="text-neutral-900 dark:text-neutral-100">
                        Projects
                    </span>
                </nav>
                <ThemeToggle />
            </header>

            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <ProjectList itemStyles={projects.map(() => cascade())} />
            </section>
        </main>
    );
}
