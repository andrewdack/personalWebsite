"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

// useLayoutEffect on the client, useEffect on the server (avoids the SSR
// warning) — we want to size before the browser paints so there's no flash of
// full-size content snapping down.
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Scales its content down just enough to fit the viewport height, so the page
// doesn't overflow into an annoying few-pixel scroll. The scale is capped at 1
// (never blown up larger than natural size — it just stays full-size when
// there's room) and floored at `min` (once the viewport is too short for even
// that, we stop shrinking and let the page scroll normally).
//
// We use CSS `zoom`, not `transform: scale()`: zoom re-runs layout and
// re-rasterizes text at the target size, so it stays crisp, whereas a transform
// scales a bitmap and blurs the text at fractional factors.
//
// Each measurement resets zoom to natural, reads `offsetHeight`, then reapplies
// the new zoom — all synchronously. Because the element starts and ends the
// same size whenever the result is unchanged, the ResizeObserver sees no net
// change on a converged pass and never loops.
export function FitToViewport({
    children,
    min = 0.8,
}: {
    children: ReactNode;
    min?: number;
}) {
    const contentRef = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const measure = () => {
            content.style.zoom = "normal"; // reset to read the natural height
            const natural = content.offsetHeight;
            if (!natural) return;
            const scale = Math.min(1, Math.max(min, window.innerHeight / natural));
            content.style.zoom = scale === 1 ? "normal" : String(scale);
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(content);
        window.addEventListener("resize", measure);
        // Fonts change text metrics (and thus height) once they load in.
        document.fonts?.ready.then(measure).catch(() => {});

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [min]);

    return (
        <div className="flex min-h-dvh flex-col justify-center">
            <div ref={contentRef}>{children}</div>
        </div>
    );
}
