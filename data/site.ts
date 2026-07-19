// All site content lives here — edit this file to update the page.

export const site = {
  name: "Andrew Hu",
  location: "Chantilly",
  bio: "Student, developer, and hackathon enthusiast. Building things for the web.",
  interests:
    "Outside of building: lifting (175lbs bench), volleyball, piano.",
};

export type WorkEntry = {
  role: string;
  company: string;
  url: string; // company link, "#" until filled in
};

export const work: WorkEntry[] = [
  {
    role: "Software Engineering Intern",
    company: "Obscurity Labs",
    url: "#",
  },
  {
    role: "Programming and Summer Camp Instructor",
    company: "Code Ninjas",
    url: "#",
  },
];

export type Project = {
  title: string;
  description: string;
  github?: string; // repo link, omit to hide the icon
  link?: string; // live site link, omit to hide the icon
};

export const projects: Project[] = [
  {
    title: "Zenly",
    description:
      "AI-powered iOS app that watches screen activity and delivers context-aware focus interventions — 1st place at BlairHacks 2026.",
    github: "https://github.com/andrewdack/zenly",
  },
  {
    title: "DackDB",
    description:
      "In-memory relational database in Go with an append-only WAL, crash recovery, and a SQL execution layer.",
    github: "https://github.com/andrewdack/dackdb/tree/tui",
  },
  {
    title: "Codertype",
    description:
      "Full-stack typing test webapp with real-time analytics, authentication, and leaderboards, built with Next.js and Supabase.",
    link: "http://codertype.xyz",
  },
];

export const socials = {
  github: "https://github.com/andrewdack",
  linkedin: "https://linkedin.com/in/andrew-j-hu-",
  x: "#",
  email: "mailto:andrewhu32009@gmail.com",
};
