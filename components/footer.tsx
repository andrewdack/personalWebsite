import { socials } from "@/data/site";
import { iconLink, tooltip } from "@/lib/styles";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { SiGithub, SiInstagram, SiLeetcode } from "react-icons/si";
import { NowPlaying } from "./now-playing";
import type { CSSProperties } from "react";

type FooterProps = {
    cascade: () => CSSProperties;
};

const socialLinks = [
    { label: "GitHub", href: socials.github, Icon: SiGithub },
    { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
    { label: "Instagram", href: socials.instagram, Icon: SiInstagram },
    { label: "LeetCode", href: socials.leetcode, Icon: SiLeetcode },
    { label: "Send an email!", href: socials.email, Icon: IoMdMail, size: 21 },
];


export default function Footer({ cascade }: FooterProps) {
    return (
        <footer className="mt-[clamp(1rem,3.4vh,3.3125rem)]">
            <div
                className="animate-fade-in-up h-px bg-neutral-200 dark:bg-neutral-800"
                style={cascade()}
            />
            <div className="flex flex-col items-start gap-4 pt-[clamp(0.75rem,2vh,2.25rem)] sm:flex-row sm:items-center sm:justify-between sm:gap-6.5">
                <div className="animate-fade-in-up flex items-center gap-5.5" style={cascade()}>
                    {socialLinks.map(({ label, href, Icon, size }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className={`group relative ${iconLink}`}
                        >
                            <Icon size={size ?? 20} />
                            <span aria-hidden className={tooltip}>
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
                <div className="animate-fade-in-up w-full mt-3 sm:mt-0 sm:w-auto " style={cascade()}>
                    <NowPlaying />
                </div>
            </div>
        </footer>
    );
}
