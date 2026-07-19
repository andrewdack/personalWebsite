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
            className={`flex size-10 items-center justify-center rounded-md ${linkHover} hover:bg-neutral-100 dark:hover:bg-neutral-800`}
        >
            {isDark ? <BsFillMoonStarsFill size={20} /> : <FiSun size={20} />}
        </button>
    );
}
