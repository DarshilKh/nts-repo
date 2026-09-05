import Image from "next/image";

/**
 * Reserves the exact space a final photo/graphic will occupy, at the
 * aspect ratio measured in DESIGN_SYSTEM.md §3.7 — independent of the
 * rendered width, so no reflow happens when a placeholder is swapped for
 * final art. Uses next/image with `fill` + `object-fit: cover`, matching
 * the measured crop behavior of every photo row on the Home page.
 *
 * Swap flow: overwrite the file at `src` in place (same filename/path) —
 * no component or CSS change needed. If the final asset gets a different
 * filename, update the one `src` string in `src/lib/assets.ts`.
 *
 * `sizes` defaults to matching the site's most common layout (a 2-column
 * row that becomes full-width below 768px). Call sites with a different
 * real rendered size — icons, 3-up product cards — pass their own.
 */
export default function MediaSlot({
  src,
  alt,
  measuredWidth,
  measuredHeight,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  measuredWidth: number;
  measuredHeight: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${measuredWidth} / ${measuredHeight}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        // `priority` is deprecated as of Next 16 in this codebase's version
        // (an alias for `preload`, which the docs say not to combine with
        // fetchPriority) — loading="eager" + fetchPriority="high" is the
        // replacement, and is what actually gets Lighthouse's LCP-discovery
        // check to see fetchpriority="high" on the rendered <img>.
        {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
