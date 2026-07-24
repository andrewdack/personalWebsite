// Technology registry — the single place to add/edit a tool. Content files
// (data/site.ts) reference these by string key; TypeScript then rejects any
// typo'd key at build time. Style is intentionally split: the mainstream stack
// uses Tabler's outline marks (uniform stroke, recolorable), while a few niche
// tools with no Tabler equivalent stay on Simple Icons' filled marks. `color`
// is the tool's brand hex; pure-black marks (Next.js, Flask, …) carry a
// `darkColor` so they don't vanish against the dark page.
import type { IconType } from "react-icons";
import { SiClaude, SiFlask, SiExpress, SiFastapi } from "react-icons/si";
import {
    TbBrandSwift,
    TbBrandGolang,
    TbBrandNextjs,
    TbBrandTypescript,
    TbBrandTailwind,
    TbBrandSupabase,
    TbBrandReact,
    TbBrandDocker,
    TbBrandPython,
    TbBrandNodejs,
    TbBubbleTea,
} from "react-icons/tb";

type Tech = {
    label: string;
    Icon: IconType;
    color: string; // brand hex (used in light mode, and dark unless overridden)
    darkColor?: string; // override for near-black marks that disappear on the dark bg
    size?: number; // per-icon size override (px); a few wordmarks read small at the default
};

// neutral-200 — stand-in for pure-black brand marks in dark mode.
const ON_DARK = "#e5e5e5";

const registry = {
    // Outline marks (Tabler) — the mainstream stack, one uniform stroke style.
    swift: { label: "Swift", Icon: TbBrandSwift, color: "#F05138" },
    // Golang ships as a short, wide "GO" wordmark — it reads tiny at the
    // default 15px, so bump it up to sit level with the square marks.
    go: { label: "Go", Icon: TbBrandGolang, color: "#00ADD8", size: 24 },
    docker: { label: "Docker", Icon: TbBrandDocker, color: "#2496ED" },
    nextjs: { label: "Next.js", Icon: TbBrandNextjs, color: "#000000", darkColor: ON_DARK },
    supabase: { label: "Supabase", Icon: TbBrandSupabase, color: "#3ECF8E" },
    typescript: { label: "TypeScript", Icon: TbBrandTypescript, color: "#3178C6" },
    tailwind: { label: "Tailwind CSS", Icon: TbBrandTailwind, color: "#06B6D4" },
    node: { label: "Node.js", Icon: TbBrandNodejs, color: "#5FA04E" },
    python: { label: "Python", Icon: TbBrandPython, color: "#3776AB", darkColor: "#5B9BD5" },
    react: { label: "React", Icon: TbBrandReact, color: "#61DAFB" },

    // Filled marks (Simple Icons) — niche tools with no Tabler outline.
    claude: { label: "Claude", Icon: SiClaude, color: "#D97757" },
    flask: { label: "Flask", Icon: SiFlask, color: "#000000", darkColor: ON_DARK },
    express: { label: "Express", Icon: SiExpress, color: "#000000", darkColor: ON_DARK },
    fastapi: { label: "FastAPI", Icon: SiFastapi, color: "#009688" },

    // Generic outline stand-in — Bubble Tea has no brand mark anywhere, but its
    // mascot is literally a boba cup.
    bubbletea: { label: "Bubble Tea", Icon: TbBubbleTea, color: "#FF5FAF" },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof registry;

// Exported widened to `Tech` per entry so consumers can read the optional
// `darkColor`; `TechKey` above still comes from the literal keys, so typo'd
// keys in data/site.ts are still caught.
export const tech: Record<TechKey, Tech> = registry;
