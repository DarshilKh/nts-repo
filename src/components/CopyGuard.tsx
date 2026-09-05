"use client";

import { useEffect } from "react";

/**
 * Casual-visitor copy deterrence: blocks right-click (Save Image/Inspect)
 * and dragging images out to save them. Paired with the `user-select: none`
 * + `-webkit-user-drag: none` rules in globals.css.
 *
 * Deliberately does NOT block F12 / Ctrl+Shift+I / Ctrl+U / Ctrl+S anymore
 * — it used to, and the cost was real: it blocks the site owner's own
 * DevTools (including the Lighthouse panel) exactly as effectively as it
 * blocks a visitor's, while stopping neither, since both can still reach
 * DevTools from the browser's own menu (⋮ → More Tools → Developer Tools)
 * with the keyboard shortcut never involved. All downside, no upside.
 *
 * READ THIS BEFORE ASSUMING EVEN THE REMAINING RULES DO MORE THAN THEY DO:
 * none of this is real security, and nothing served to a browser can be
 * made uncopiable. To render the page at all, the browser must download
 * the complete HTML, CSS, JS and every image byte — anyone can read all of
 * it via "View Page Source", the Network tab, `curl`, or by disabling
 * JavaScript (which turns off every rule below). It also does nothing
 * against scraping bots, which don't right-click. What this buys is
 * friction against an ordinary visitor idly right-clicking to save a photo
 * or select a paragraph — nothing more. Real protection for genuinely
 * sensitive content means not sending it to the client unauthenticated in
 * the first place (auth-gating, server-side rendering only what a given
 * viewer is entitled to, watermarking images server-side, etc.).
 */
export default function CopyGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
