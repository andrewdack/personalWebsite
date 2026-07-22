import {CSSProperties } from "react";
import { site } from "@/data/site"; 

export default function Bio({ cascade }: { cascade: () => CSSProperties }) {
    return <section className="mt-[clamp(0.75rem,2.6vh,2.25rem)] space-y-1 text-[17px] leading-relaxed">
        <p className="animate-fade-in-up text-neutral-900 dark:text-neutral-100" style={cascade()}>
            {site.bio}
        </p>
        <p className="animate-fade-in-up text-neutral-500 dark:text-neutral-400" style={cascade()}>
            {site.interests}
        </p>
    </section>
}