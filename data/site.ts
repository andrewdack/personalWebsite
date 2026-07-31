// All site content lives here — edit this file to update the page.

import type { TechKey } from "@/lib/tech";

export const site = {
    name: "Andrew Hu",
    location: "Chantilly, VA",
    bio: "Student and developer building apps and tools I find compelling and fun.",
    interests:
        "I also like lifting (175lbs bench), volleyball, piano, and matcha",
};

export type WorkEntry = {
    role: string;
    company: string;
    url: string; // company link, "#" until filled in
    description?: string; // shown under the role/company line, omit to hide
    dates?: string; // e.g. "Jun 2025 — Present", omit to hide
    tech?: TechKey[]; // stack shown as icons under the role; keys from lib/tech.ts
};

export const work: WorkEntry[] = [
    {
        role: "Software Engineering Intern",
        company: "Obscurity Labs",
        url: "https://www.obscuritylabs.com",
        description: "AI Infrastructure",
        dates: "Jun 2026 — Aug 2026",
        tech: ["go", "python", "docker"],
    },
    // {
    //     role: "Founding Organizer",
    //     company: "TillyHacks",
    //     url: "https://www.tillyhacks.org/",
    //     description: "Chantilly High School's first ever student-led hackathon",
    //     dates: "Dec 2025 — Present",
    // },
    {
        role: "Captain & Software Lead",
        company: 'FTC Team 9073 "Knightrix"',
        url: "https://www.instagram.com/9073knightrix/",
        description: "Finite state machines, PID loops, Kalman filter, computer vision, and autonomous pathing",
        dates: "Sep 2024 — Present",
        tech: ["java", "kotlin"],
    },
];

export type Project = {
    title: string;
    description: string;
    info?: string; // hackathon placement/award, shown under the description
    github?: string; // repo link, omit to hide the icon
    link?: string; // live site link, omit to hide the icon
    tech?: TechKey[]; // stack shown as icons under the title; keys from lib/tech.ts
    dates?: string; // e.g. "Jun 2025 — Present", omit to hide; shown on /projects only
};

export const projects: Project[] = [
    {
        title: "Zenly",
        description:
            "An iOS app + iMessage Agent that captures screen activity for contextual awareness, uses LLM-as-judge, and intervenes to stop you from doomscrolling.",
        info: "1st place at BlairHacks 2026",
        github: "https://github.com/andrewdack/zenly",
        tech: ["express", "swift", "typescript"],
        dates: "Jun 2026",
    },
    {
        title: "DackDB",
        description:
            "In-memory relational database in Go with an append-only WAL, crash recovery, and a SQL execution layer.",
        github: "https://github.com/andrewdack/dackdb/tree/tui",
        tech: ["go", "bubbletea"],
        dates: "May 2026",
    },
    {
        title: "Codertype",
        description:
            "Monkeytype for programmers. Full-stack typing test with real-time analytics, authentication, and leaderboards. Built w/ Next.js, FastAPI, & Supabase",
        link: "https://codertype.xyz",
        github: "https://github.com/andrewdack/codertype",
        tech: ["nextjs", "fastapi", "supabase"],
        dates: "Mar 2026 — May 2026",
    },
    {
        title: "Quick Claude",
        description:
            "Summon a floating Claude chat panel on your Mac with ⌥Space, using your Claude Code subscription instead of an API key.",
        github: "https://github.com/andrewdack/quick-claude",
        tech: ["swift", "node", "claude"],
        dates: "Jul 2026",
    },
    {
        title: "ReliefChain",
        description:
            "Web3 donation platform on the Solana blockchain that connects donors directly to relief organizations, bypassing bureaucratic delays for transparent, fast crypto funding transfers.",
        github: "https://github.com/andrewdack/ReliefChainV2",
        tech: ["nextjs", "typescript", "supabase"],
        dates: "Sep 2025",
    },
    {
        title: "EcoAlert",
        description:
            "Interactive map of real-time weather, air quality, and environmental data + Gemini chatbot for instant insights.",
        info: "Beginner track winner at Hack The Nest",
        github: "https://github.com/Mehxeo/EcoAlert",
        link: "https://devpost.com/software/ecoalert",
        tech: ["flask", "html", "css", "javascript"],
        dates: "May 2025",
    },
];

export const socials = {
    github: "https://github.com/andrewdack",
    linkedin: "https://linkedin.com/in/andrew-j-hu-",
    instagram: "https://www.instagram.com/andrewjhu_/",
    email: "mailto:andrew.dack.hu@gmail.com",
};
