// Technology registry — the single place to add/edit a tool. Content files
// (data/site.ts) reference these by string key; TypeScript then rejects any
// typo'd key at build time. Marks are Simple Icons' solid, filled brand glyphs
// (not outline strokes), so each reads as the real logo. `color` is the tool's
// brand hex; pure-black marks (Next.js, Flask, …) carry a `darkColor` so they
// don't vanish against the dark page.
import type { IconType } from "react-icons";
import {
    SiClaude,
    SiFlask,
    SiExpress,
    SiFastapi,
    SiDocker,
    SiSwift,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiSupabase,
    SiReact,
    SiNodedotjs,
    SiHtml5,
    SiCss,
    SiJavascript,
} from "react-icons/si";
import { FaGolang, FaPython } from "react-icons/fa6";
// Bubble Tea has no real brand logo anywhere, so it keeps Tabler's boba-cup
// mascot as a stand-in — the one intentional outline in the set.
import { TbBubbleTea } from "react-icons/tb";

type Tech = {
    label: string;
    Icon: IconType;
    color: string; // brand hex (used in light mode, and dark unless overridden)
    darkColor?: string; // override for near-black marks that disappear on the dark bg
    size?: number; // per-icon size override (px); a few wordmarks read small at the default
    // Extra classes on the mark — used to visually scale a wordmark via a CSS
    // transform, which grows the glyph without enlarging its layout box (so it
    // won't push neighboring icons around or stretch the row height).
    className?: string;
    url?: string; // official site/docs link; omit to render the icon unlinked
};

// neutral-200 — stand-in for pure-black brand marks in dark mode.
const ON_DARK = "#e5e5e5";

const registry = {
    swift: { label: "Swift", Icon: SiSwift, color: "#F05138", url: "https://www.swift.org" },
    // FaGolang is the Go gopher — it draws a touch smaller than the square
    // marks at the default size, so nudge it up to sit level with them.
    go: {
        label: "Go",
        Icon: FaGolang,
        color: "#00ADD8",
        size: 24,
        url: "https://go.dev",
    },
    docker: { label: "Docker", Icon: SiDocker, color: "#2496ED", url: "https://www.docker.com" },
    nextjs: {
        label: "Next.js",
        Icon: SiNextdotjs,
        color: "#000000",
        darkColor: ON_DARK,
        url: "https://next  js.org",
    },
    supabase: {
        label: "Supabase",
        Icon: SiSupabase,
        color: "#3ECF8E",
        url: "https://supabase.com",
    },
    typescript: {
        label: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        url: "https://www.typescriptlang.org",
    },
    tailwind: {
        label: "Tailwind CSS",
        Icon: SiTailwindcss,
        color: "#06B6D4",
        url: "https://tailwindcss.com",
    },
    node: {
        label: "Node.js",
        Icon: SiNodedotjs,
        color: "#5FA04E",
        url: "https://nodejs.org",
    },
    python: {
        label: "Python",
        Icon: FaPython,
        color: "#3776AB",
        darkColor: "#5B9BD5",
        url: "https://www.python.org",
    },
    react: { label: "React", Icon: SiReact, color: "#61DAFB", url: "https://react.dev" },
    html: {
        label: "HTML5",
        Icon: SiHtml5,
        color: "#E34F26",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    css: {
        label: "CSS3",
        Icon: SiCss,
        color: "#1572B6",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    // JavaScript's brand yellow washes out on the light ground, so light mode
    // gets a darker amber; dark mode keeps the real #F7DF1E.
    javascript: {
        label: "JavaScript",
        Icon: SiJavascript,
        color: "#D4A017",
        darkColor: "#F7DF1E",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },

    // Near-black marks — carry a `darkColor` so they don't vanish on the dark page.
    claude: { label: "Claude", Icon: SiClaude, color: "#D97757", url: "https://claude.com" },
    flask: {
        label: "Flask",
        Icon: SiFlask,
        color: "#000000",
        darkColor: ON_DARK,
        url: "https://flask.palletsprojects.com",
    },
    express: {
        label: "Express",
        Icon: SiExpress,
        color: "#000000",
        darkColor: ON_DARK,
        url: "https://expressjs.com",
    },
    fastapi: {
        label: "FastAPI",
        Icon: SiFastapi,
        color: "#009688",
        url: "https://fastapi.tiangolo.com",
    },

    // The one outline in the set — Bubble Tea has no real brand mark anywhere,
    // so Tabler's boba-cup mascot stands in.
    bubbletea: {
        label: "Bubble Tea",
        Icon: TbBubbleTea,
        color: "#FF5FAF",
        url: "https://github.com/charmbracelet/bubbletea",
    },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof registry;

// Exported widened to `Tech` per entry so consumers can read the optional
// `darkColor`; `TechKey` above still comes from the literal keys, so typo'd
// keys in data/site.ts are still caught.
export const tech: Record<TechKey, Tech> = registry;
