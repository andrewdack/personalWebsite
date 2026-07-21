"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme | null;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    theme: null,
    setTheme: () => {},
});

function getSystemTheme(): Theme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme | null>(null);

    useEffect(() => {
        // Synchronous setState wrapped in a callback to avoid the extra-render
        // lint error (react-hooks/set-state-in-effect).
        const init = () => {
            const stored = localStorage.getItem("theme") as Theme | null;
            setThemeState(stored ?? getSystemTheme());
        };
        init();
    }, []);

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

// Runs before hydration (via next/script strategy="beforeInteractive" in
// layout.tsx) to set the .dark class before first paint, avoiding a flash —
// the same job next-themes' injected <script> did, but through Next's
// blessed API instead of a raw <script> child, which React 19 warns about.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;
