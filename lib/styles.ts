// Shared class recipes — reuse these instead of re-inlining the same
// hover/transition patterns so the whole site stays visually consistent.
// Timing/easing for every `transition-*` here comes from the motion
// tokens in app/globals.css (@theme), not from per-utility durations.

// Muted icon that darkens to full-contrast on hover (footer + project icons).
export const iconLink =
    "text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100";

// Muted text link that darkens to full-contrast on hover (inline links,
// now-playing, the color half of the theme toggle).
export const linkHover =
    "text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100";
