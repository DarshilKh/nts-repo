"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; width: number; height: number };

const AUTOPLAY_MS = 2200;

/**
 * Hero media carousel. Reserves the same box the original static hero
 * image occupied (aspect-ratio locked to 884:860, matching homeAssets.hero)
 * so the layout never reflows between slides. Slides crossfade and are
 * shown with object-fit: contain (not cover, unlike MediaSlot's default)
 * since these are mixed-aspect product renders/photos, not one cropped
 * banner shot — cover would clip the portrait toll-plaza frame.
 *
 * The frame carries its own white-to-grey card background (previously
 * transparent, so it blended into the page's near-identical off-white and
 * read as flat/washed out) plus a light contrast/saturation lift on the
 * photos themselves — the portrait toll-plaza slide in particular sits in
 * a noticeably wider box than its own aspect ratio, so with `contain` it
 * was letterboxed into a small, low-contrast island of a photo floating in
 * a lot of empty white padding. Tighter padding + the darker card ground
 * gives it an actual edge to sit against.
 */
export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  // Every slide previously mounted its <Image> on first render regardless of
  // `index` — all 3 fetched immediately (next/image's default `loading=lazy`
  // on slides 2/3 didn't help: they're absolutely positioned over the same
  // box as the visible slide, so they're already "in viewport" and IO fires
  // right away), competing with the LCP-critical request for bandwidth on a
  // slow connection. Only mount a slide once it's actually been shown; once
  // shown, keep it mounted so the crossfade back to it stays instant.
  const [shown, setShown] = useState<Set<number>>(() => new Set([0]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length, stop]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  // Records a slide as shown the moment `index` changes to it — React's
  // "adjust state during render" pattern (a conditional setState guarded by
  // comparing against the last-seen value) rather than a useEffect, which
  // would call setState on every autoplay tick regardless of whether this
  // slide was already in `shown`.
  const [prevIndex, setPrevIndex] = useState(index);
  if (prevIndex !== index) {
    setPrevIndex(index);
    setShown((s) => (s.has(index) ? s : new Set(s).add(index)));
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm shadow-[0_30px_60px_-15px_rgba(20,20,30,0.35)]"
      style={{
        aspectRatio: "884 / 860",
        background: "linear-gradient(145deg, #ffffff 0%, #e9edf2 100%)",
      }}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? "auto" : "none" }}
          aria-hidden={i !== index}
        >
          <div className="relative w-full h-full">
            {shown.has(i) && (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                // `priority` is deprecated in this Next version (an alias for
                // `preload`, which the docs say not to combine with
                // fetchPriority) — loading="eager" + fetchPriority="high" is
                // the replacement that actually gets fetchpriority="high"
                // onto the rendered <img>, which is what Lighthouse's LCP-
                // discovery check looks for.
                {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
                // The rendered box is a fixed 560px grid column (minus this
                // wrapper's own 24px of padding) at any viewport >=768px —
                // not a percentage of it — and below that it's the full
                // viewport minus the section's 48px of padding plus this
                // wrapper's 24px. The previous "50vw"/"100vw" hint told
                // next/image the box was far wider than it actually is,
                // so it fetched an oversized source (measured ~30KB wasted
                // per slide on mobile).
                sizes="(min-width: 768px) 536px, calc(100vw - 72px)"
                style={{ objectFit: "contain", filter: "saturate(1.15) contrast(1.08)" }}
              />
            )}
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => {
              setIndex(i);
              start();
            }}
            className="p-1"
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                background: i === index ? "var(--brand-red)" : "rgba(0,0,0,0.2)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
