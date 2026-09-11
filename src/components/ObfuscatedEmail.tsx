"use client";

import { useSyncExternalStore } from "react";

// No-op subscribe: this "store" never changes after mount, so there's
// nothing to listen for — only the client/server snapshot difference below
// matters. useSyncExternalStore is React's own recommended way to detect
// "has the client taken over from SSR yet" without an effect+setState,
// which the stricter React Compiler-era lint rules flag as an avoidable
// extra render (see react-hooks/set-state-in-effect).
const subscribeNoop = () => () => {};
function useHasHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

/**
 * Renders an email address without ever putting the full string, or a
 * `mailto:` link containing it, into the server-rendered HTML that a bot
 * scrapes without running JavaScript. `user` and `domain` are passed
 * separately and joined only in the browser after hydration.
 *
 * This is a deterrent against the simplest scrapers (regex over static
 * HTML), not real protection — a bot that runs JS will still see the
 * address once assembled. It costs a real visitor nothing: the link is
 * fully working and accessible within a moment of the page loading.
 */
export default function ObfuscatedEmail({
  user,
  domain,
  className,
}: {
  user: string;
  domain: string;
  className?: string;
}) {
  const hydrated = useHasHydrated();
  const address = hydrated ? `${user}@${domain}` : null;

  if (!address) {
    return (
      <span className={className} aria-label="Email address loading">
        {user} [at] {domain.replace(".", " [dot] ")}
      </span>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {address}
    </a>
  );
}
