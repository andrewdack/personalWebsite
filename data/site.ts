// All site content lives here — edit this file to update the page.

import type { TechKey } from "@/lib/tech";

export const site = {
    name: "Andrew Hu",
    location: "Chantilly, VA",
    bio: "Student, developer, and hackathon enthusiast. Building interesting stuff",
    interests: "I also like lifting (175lbs bench), volleyball, and piano.",
};

export type WorkEntry = {
    role: string;
    company: string;
    url: string; // company link, "#" until filled in
    dates?: string; // e.g. "Jun 2025 — Present", omit to hide
    tech?: TechKey[]; // stack shown as icons under the role; keys from lib/tech.ts
};

export const work: WorkEntry[] = [
    {
        role: "Software Engineering Intern",
        company: "Obscurity Labs",
        url: "https://www.obscuritylabs.com",
        dates: "Jun 2026 — Aug 2026",
        tech: ["go", "docker", "python"],
    },
    {
        role: "Founding Organizer",
        company: "TillyHacks",
        url: "https://www.tillyhacks.org/",
        dates: "Jan 2025 — Present",
    },
];

export type Project = {
    title: string;
    description: string;
    github?: string; // repo link, omit to hide the icon
    link?: string; // live site link, omit to hide the icon
    tech?: TechKey[]; // stack shown as icons under the title; keys from lib/tech.ts
};

export const projects: Project[] = [
    {
        title: "Zenly",
        description:
            "AI-powered iOS app that watches screen activity and delivers context-aware focus interventions — 1st place at BlairHacks 2026.",
        github: "https://github.com/andrewdack/zenly",
        tech: ["express", "swift", "typescript"],
    },
    {
        title: "DackDB",
        description:
            "In-memory relational database in Go with an append-only WAL, crash recovery, and a SQL execution layer.",
        github: "https://github.com/andrewdack/dackdb/tree/tui",
        tech: ["go", "bubbletea"],
    },
    {
        title: "Codertype",
        description:
            "Monkeytype for programmers. Full-stack typing test webapp with real-time analytics, authentication, and leaderboards, built with Next.js and Supabase.",
        link: "http://codertype.xyz",
        github: "https://github.com/andrewdack/codertype.xyz",
        tech: ["nextjs", "typescript", "fastapi", "tailwind", "supabase"],
    },
    {
        title: "Quick Claude",
        description:
            "Summon a floating Claude chat panel on your Mac with ⌥Space, using your Claude Code subscription instead of an API key.",
        github: "https://github.com/andrewdack/quick-claude",
        tech: ["swift", "node", "claude"],
    },
    {
        title: "ReliefChain",
        description:
            "Web3 donation platform on the Solana blockchain that connects donors directly to relief organizations, bypassing bureaucratic delays for transparent, fast crypto funding transfers.",
        github: "https://github.com/andrewdack/ReliefChainV2",
        tech: ["nextjs", "react"],
    },
    {
        title: "EcoAlert",
        description:
            "Interactive map of real-time weather, air quality, and environmental data + Gemini chatbot for instant insights — beginner track winner at Hack The Nest.",
        github: "https://github.com/Mehxeo/EcoAlert",
        link: "https://devpost.com/software/ecoalert",
        tech: ["flask", "html", "css", "javascript"],
    },
];

export const socials = {
    github: "https://github.com/andrewdack",
    linkedin: "https://linkedin.com/in/andrew-j-hu-",
    instagram: "https://www.instagram.com/andrewjhu_/",
    leetcode: "https://leetcode.com/u/hMLmonWJEa/",
    email: "mailto:andrew.dack.hu@gmail.com",
};
