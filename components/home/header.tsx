import {site} from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import Clock from "@/components/home/clock";
import { CSSProperties } from "react";

export default function Header({cascade}: {cascade: () => CSSProperties}) {
    return (
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
    );
}