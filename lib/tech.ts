// Single place to add or edit a tool. data/site.ts references these by key,
// so a typo gets caught at build time.
import type { IconType } from "react-icons";
import {
    SiClaude,
    SiFlask,
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
    SiKotlin,
} from "react-icons/si";
import { FaGolang, FaPython, FaJava } from "react-icons/fa6";
// Get custom express icon because the SI library is chopped
import { CustomExpressIcon, BubbleTeaIcon } from "@/components/custom-icons";

type Tech = {
    label: string;
    Icon: IconType;
    color: string; // brand hex
    darkColor?: string; // override for marks that vanish on a dark bg
    size?: number; // per-icon size override, for icons that read small by default
    className?: string; // extra classes, mainly to scale wordmarks up
    url?: string; // link target; omit to render unlinked
};

// stand-in for near-black marks in dark mode
const ON_DARK = "#e5e5e5";

const registry = {
    swift: { label: "Swift", Icon: SiSwift, color: "#F05138", url: "https://www.swift.org" },
    // Go icon draws a bit small next to the others, so slightly increase the size.
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
        url: "https://nextjs.org",
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
    java: {
        label: "Java",
        Icon: FaJava,
        color: "#ED8B00",
        url: "https://www.java.com",
    },
    kotlin: {
        label: "Kotlin",
        Icon: SiKotlin,
        color: "#7F52FF",
        url: "https://kotlinlang.org",
    },
    react: { label: "React", Icon: SiReact, color: "#61DAFB", url: "https://react.dev" },
    html: {
        label: "HTML",
        Icon: SiHtml5,
        color: "#E34F26",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    css: {
        label: "CSS",
        Icon: SiCss,
        color: "#663399", // rebeccapurple
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    // JS yellow washes out on the light background, so light mode uses a darker amber.
    javascript: {
        label: "JavaScript",
        Icon: SiJavascript,
        color: "#D4A017",
        darkColor: "#F7DF1E",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },

    claude: { label: "Claude", Icon: SiClaude, color: "#D97757", url: "https://claude.com" },
    flask: {
        label: "Flask",
        Icon: SiFlask,
        color: "#000000",
        darkColor: ON_DARK,
        url: "https://flask.palletsprojects.com",
    },
    express: {
        label: "Express.js",
        Icon: CustomExpressIcon,
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

    bubbletea: {
        label: "Bubble Tea",
        Icon: BubbleTeaIcon,
        color: "#FF5FAF",
        url: "https://github.com/charmbracelet/bubbletea",
    },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof registry;

// Widened to Tech so consumers can read darkColor; TechKey still comes from
// the literal keys, so typos are still caught.
export const tech: Record<TechKey, Tech> = registry;
