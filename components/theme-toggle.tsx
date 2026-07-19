"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    if (theme === null) {
        return <div className="size-10" />;
    }

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex size-10 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        >
            {isDark ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
    );
}
