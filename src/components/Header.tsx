"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Frame from "./ui/Frame";
import { navLinks } from "@/lib/data";
import { PRODUCT_GROUPS, productGroupSectionId } from "@/lib/catalog";

/**
 * §4.1 — logo at x=122, nav links span x=729–1318 (right edge inset 122,
 * mirroring the logo's left inset). Reproduced as symmetric 122px
 * left/right padding at the PDF's native frame width; §5 open item notes
 * there's no boxed header-height measurement in the source, so vertical
 * padding here is a reasonable value sized around the 45px logo mark.
 *
 * Nav labels are bold across the board. The active item is still
 * distinguished, but by colour (brand red) rather than by weight — weight was
 * doing double duty as both "this is a nav item" and "this is the current
 * page", which left the inactive links looking washed out.
 *
 * "Products" additionally opens a categorised dropdown (Tags, Readers,
 * Cameras, Radar, …) on hover or click, rather than only linking to the
 * flat /products page — with 29 SKUs across seven groups, letting a
 * visitor jump straight to the section they want from the nav is a real
 * navigation aid, not just decoration.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Header isn't remounted by App Router navigation (same component at the
  // same tree position across pages), so its open/dropdown state would
  // otherwise survive a route change. Reset it here rather than in a
  // useEffect: this is React's documented "adjusting state when a prop
  // changes" pattern — https://react.dev/reference/react/useState#storing-information-from-previous-renders
  // — a conditional setState call during render, guarded by comparing
  // against the last-seen pathname (itself kept in state, not a ref —
  // refs can't be read or written during render). Avoids the extra
  // commit-then-effect-then-re-render cascade a useEffect with the same
  // body would trigger on every navigation.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  // A short delay rather than closing immediately: onMouseLeave fires the
  // instant the pointer leaves the trigger/panel's painted box, and real
  // mouse movement from the "Products" link down into the panel is rarely
  // perfectly vertical — a fast or diagonal move can clip outside that box
  // for a frame or two even with zero visual gap between them. Closing on
  // a timer (cancelled by the next onMouseEnter, which fires the instant
  // the pointer lands back inside) absorbs that without a visible delay on
  // an intentional exit.
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setProductsOpen(false), 200);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!productsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [productsOpen]);

  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--bg)" }}>
      <Frame>
        <div className="flex items-center justify-between py-7 px-6 min-[1440px]:px-[122px]">
          <Logo />

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              const linkStyle = {
                fontSize: "var(--fs-nav)",
                color: active ? "var(--brand-red)" : "var(--nav-text)",
                fontWeight: 700,
              } as const;

              if (link.href !== "/products") {
                return (
                  <Link key={link.href} href={link.href} style={linkStyle}>
                    {link.label}
                  </Link>
                );
              }

              return (
                <div
                  key={link.href}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setProductsOpen(true);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    style={linkStyle}
                    className="flex items-center gap-1.5"
                    aria-haspopup="true"
                    aria-expanded={productsOpen}
                    onClick={(e) => {
                      // Not a toggle: a real mouse hovers this link (opening
                      // the dropdown via onMouseEnter) a moment before the
                      // click event fires, so toggling here would flip an
                      // already-open dropdown straight back closed on every
                      // click. Always-open plus outside-click/Escape/mouse-
                      // leave to close is the interaction that actually
                      // works for both mouse and touch.
                      e.preventDefault();
                      cancelClose();
                      setProductsOpen(true);
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      style={{ transition: "transform 0.15s ease", transform: productsOpen ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {productsOpen && (
                    // Outer box starts flush at top:100% (touching the
                    // trigger's bottom edge, zero gap) so the pointer never
                    // crosses empty page background between link and panel
                    // — the old `mt-3` margin left exactly that dead zone,
                    // which is what was closing the menu the instant the
                    // pointer moved down off the "Products" text. The
                    // 12px visual gap now lives as padding-top *inside*
                    // this hoverable box instead.
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: "100%", width: 300, paddingTop: 12 }}
                    >
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          background: "var(--bg)",
                          boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        <ul className="py-2">
                          {PRODUCT_GROUPS.map((g) => (
                            <li key={g.id}>
                              <Link
                                href={`/products#${productGroupSectionId(g.id)}`}
                                className="block px-5 py-2.5 hover:bg-black/[0.04]"
                                onClick={() => setProductsOpen(false)}
                              >
                                <span style={{ fontWeight: 700, fontSize: "var(--fs-footer-link)" }}>{g.label}</span>
                                <span
                                  className="block mt-0.5"
                                  style={{ fontSize: "12px", color: "var(--text-muted)" }}
                                >
                                  {g.blurb}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/products"
                          onClick={() => setProductsOpen(false)}
                          className="block px-5 py-3 hover:underline"
                          style={{
                            fontWeight: 700,
                            fontSize: "var(--fs-footer-link)",
                            color: "var(--brand-red)",
                            borderTop: "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          View all products →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <button
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="w-6 h-0.5" style={{ background: "var(--text-primary)" }} />
            <span className="w-6 h-0.5" style={{ background: "var(--text-primary)" }} />
            <span className="w-6 h-0.5" style={{ background: "var(--text-primary)" }} />
          </button>
        </div>

        {open && (
          <div className="md:hidden" style={{ background: "var(--bg)" }}>
            <div className="flex flex-col py-4 gap-1 px-6">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + "/");
                const linkStyle = {
                  fontSize: "var(--fs-nav)",
                  color: active ? "var(--brand-red)" : "var(--nav-text)",
                  fontWeight: 700,
                } as const;

                if (link.href !== "/products") {
                  return (
                    <Link key={link.href} href={link.href} className="py-2.5" style={linkStyle}>
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full py-2.5"
                      style={linkStyle}
                      aria-expanded={mobileProductsOpen}
                      onClick={() => setMobileProductsOpen((o) => !o)}
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                        style={{
                          transition: "transform 0.15s ease",
                          transform: mobileProductsOpen ? "rotate(180deg)" : "none",
                        }}
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {mobileProductsOpen && (
                      <div className="flex flex-col gap-0.5 pb-2 pl-3" style={{ borderLeft: "2px solid var(--brand-red)" }}>
                        {PRODUCT_GROUPS.map((g) => (
                          <Link
                            key={g.id}
                            href={`/products#${productGroupSectionId(g.id)}`}
                            onClick={() => setOpen(false)}
                            className="py-2 pl-3"
                            style={{ fontSize: "var(--fs-footer-link)", color: "var(--nav-text)" }}
                          >
                            {g.label}
                          </Link>
                        ))}
                        <Link
                          href="/products"
                          onClick={() => setOpen(false)}
                          className="py-2 pl-3"
                          style={{ fontSize: "var(--fs-footer-link)", fontWeight: 700, color: "var(--brand-red)" }}
                        >
                          View all products →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Frame>
    </header>
  );
}
