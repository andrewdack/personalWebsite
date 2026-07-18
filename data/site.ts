// All site content lives here — edit this file to update the page.

export const site = {
    name: "Andrew Hu",
    location: "Chantilly",
    bio: "Student, developer, and hackathon enthusiast. Building things for the web.",
    interests:
        "Outside of building: lifting (175lbs bench), volleyball, piano.",
};

export type WorkEntry = {
    role: "Software Engineering Intern";
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
        role: "Software Engineering Intern",
        company: "Company Two",
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
        title: "Project One",
        description: "One-line description of what this project does and why.",
        github: "#",
        link: "#",
    },
    {
        title: "Project Two",
        description: "One-line description of what this project does and why.",
        github: "#",
    },
    {
        title: "Project Three",
        description: "One-line description of what this project does and why.",
        github: "#",
        link: "#",
    },
];

export const socials = {
    github: "#",
    linkedin: "#",
    x: "#",
    email: "mailto:andrewhu32009@gmail.com",
};
