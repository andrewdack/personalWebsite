import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import Footer from "@/components/footer";
import Header from "@/components/home/header";
import { site, work, projects } from "@/data/site";
import { iconLink, linkHover, sectionHeading } from "@/lib/styles";
import Link from 'next/link'
import Bio from "@/components/home/bio";
import Experience from "@/components/home/experience";
import Projects from "@/components/home/projects";

export default function Home() {
    // Continuous per-line stagger for the page-load entrance
    const cascadeStepMs = 75; // gap between each piece cascading in
    let cascadeStep = 3; // delay the first piece (header)
    const cascade = () => ({ animationDelay: `${cascadeStep++ * cascadeStepMs}ms` });

    return (
        <main className="mx-auto flex min-h-dvh max-w-165 flex-col justify-center px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
            {/* Header */}
            <Header cascade={cascade} />
            {/* Bio */}
            <Bio cascade={cascade} />
            {/* Experience */}
            <Experience cascade={cascade} />
            {/* Projects */}
            <Projects cascade={cascade} />
            {/* Footer */}
            <Footer cascade={cascade} />
        </main>
    );
}
