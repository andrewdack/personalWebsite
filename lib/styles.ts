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

// Pill tooltip that fades/slides in above its trigger on hover. Requires
// the trigger to be `group relative`; mark the tooltip element aria-hidden
// (the trigger should carry the accessible name via aria-label). `tooltipBase`
// omits horizontal positioning so callers near a container edge can right- or
// left-anchor instead of centering (a centered tooltip on an edge-flush
// trigger overflows the viewport); `tooltip` is the default centered variant.
export const tooltipBase =
    "pointer-events-none absolute bottom-full mb-2 translate-y-1 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all ease-smooth group-hover:translate-y-0 group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900";

export const tooltip = `${tooltipBase} left-1/2 -translate-x-1/2`;
