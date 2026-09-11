"use client";

import { useState } from "react";

/**
 * Client-side deterrent for the site's two contact forms (neither posts to
 * a backend yet, so nothing to protect until one exists — this just has
 * the guard ready). Two checks: a honeypot field bots tend to fill but
 * humans never see, and a reject-if-submitted-too-fast timer.
 *
 * Not real protection — stops simple bots, not a targeted attacker. Still
 * needs server-side validation and a real CAPTCHA once this posts
 * somewhere. See HANDOFF.md.
 */
export function useBotGuard() {
  // useState's lazy initializer form runs exactly once, on mount — the
  // sanctioned way to capture a one-time impure value like Date.now()
  // without React's purity rule flagging it as re-evaluated every render.
  const [mountedAt] = useState(() => Date.now());

  /** Field props to spread onto a hidden text input. Name it anything plausible. */
  const honeypotProps = {
    name: "company_website",
    autoComplete: "off",
    tabIndex: -1,
    "aria-hidden": true,
    style: {
      position: "absolute",
      left: "-9999px",
      width: 1,
      height: 1,
      opacity: 0,
      pointerEvents: "none",
    } as const,
  };

  /** True if this submission looks automated — caller should drop it silently. */
  function isLikelyBot(form: HTMLFormElement): boolean {
    const honeypot = form.elements.namedItem(honeypotProps.name) as HTMLInputElement | null;
    if (honeypot && honeypot.value.trim() !== "") return true;
    if (Date.now() - mountedAt < 2000) return true;
    return false;
  }

  return { honeypotProps, isLikelyBot };
}
