import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX, SiGmail } from "react-icons/si";
import { NowPlaying } from "@/components/now-playing";
import { ThemeToggle } from "@/components/theme-toggle";
import { site, work, projects, socials } from "@/data/site";

const socialLinks = [
  { label: "GitHub", href: socials.github, Icon: SiGithub },
  { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
  { label: "X", href: socials.x, Icon: SiX },
  { label: "Email", href: socials.email, Icon: SiGmail },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col px-6 py-16 sm:py-24">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <FiMapPin size={13} />
            {site.location}
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Bio */}
      <section className="mt-8 space-y-1 text-[15px] leading-relaxed">
        <p>{site.bio}</p>
        <p className="text-neutral-500 dark:text-neutral-400">
          {site.interests}
        </p>
      </section>

      {/* Work */}
      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Work
        </h2>
        <ul className="mt-4 space-y-3">
          {work.map((entry) => (
            <li key={entry.role + entry.company} className="text-[15px]">
              {entry.role}{" "}
              <span className="text-neutral-400 dark:text-neutral-500">@</span>{" "}
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900 dark:decoration-neutral-600 dark:hover:decoration-neutral-100"
              >
                {entry.company}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          Projects
        </h2>
        <ul className="mt-4 space-y-6">
          {projects.map((project) => (
            <li key={project.title}>
              <div className="flex items-center gap-2.5">
                <h3 className="text-[15px] font-medium">{project.title}</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                  >
                    <SiGithub size={14} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live site`}
                    className="text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
                  >
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer / socials */}
      <footer className="mt-16 flex items-center justify-between gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <div className="flex items-center gap-5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
        <NowPlaying />
      </footer>
    </main>
  );
}
