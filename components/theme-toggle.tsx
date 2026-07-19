"use client";

import { FiSun } from "react-icons/fi";
import { BsFillMoonStarsFill } from "react-icons/bs";

import { useTheme } from "@/components/theme-provider";
import { linkHover } from "@/lib/styles";

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
            className={`relative flex size-10 items-center justify-center rounded-md ${linkHover} hover:bg-neutral-100 dark:hover:bg-neutral-800`}
        >
            <FiSun
                size={20}
                className="absolute rotate-0 scale-100 opacity-100 transition-all duration-500 ease-smooth dark:-rotate-180 dark:scale-0 dark:opacity-0"
            />
            <BsFillMoonStarsFill
                size={20}
                className="absolute rotate-180 scale-0 opacity-0 transition-all duration-500 ease-smooth dark:rotate-0 dark:scale-100 dark:opacity-100"
            />
        </button>
    );
}
