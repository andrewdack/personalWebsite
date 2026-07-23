import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/data/site";
import { linkHover } from "@/lib/styles";

export const metadata: Metadata = {
    title: "Projects — Andrew Hu",
    description: "Projects by Andrew Hu.",
};

export default function ProjectsPage() {
    // Continuous per-line stagger for the page-load entrance
    const cascadeStepMs = 75; // gap between each piece cascading in
    let cascadeStep = 3;
    const cascade = () => ({ animationDelay: `${cascadeStep++ * cascadeStepMs}ms` });

    return (
        <main className="mx-auto flex min-h-dvh max-w-165 flex-col justify-center px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
            {/* Header */}
            <header className="animate-fade-in-up flex items-start justify-between" style={cascade()}>
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                    <Link href="/" className={linkHover}>
                        Home
                    </Link>
                    <span className="mx-1.5 text-neutral-300 dark:text-neutral-700">›</span>
                    Projects
                </h1>
                <ThemeToggle />
            </header>

            {/* Projects */}
            <section className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
                <ProjectList projects={projects} cascade={cascade} />
            </section>
        </main>
    );
}
