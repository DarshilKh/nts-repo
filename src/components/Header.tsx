"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Frame from "./ui/Frame";
import { navLinks } from "@/lib/data";
import { PRODUCT_GROUPS, productGroupSectionId } from "@/lib/catalog";
import { solutionPages } from "@/lib/solutions";

/**
 * §4.1 — logo at x=122, nav links span x=729–1318, mirrored insets. Nav
 * labels are bold; the active item is marked by colour, not weight.
 *
 * "Products" and "Solutions" both open a dropdown, sharing one hover/
 * escape/outside-click implementation (`DROPDOWNS` + `openDropdown`
 * below) instead of two copies of the same logic.
 */

type DropdownItem = { label: string; href: string; blurb?: string };
type DropdownConfig = {
  href: string;
  items: DropdownItem[];
  viewAllHref: string;
  viewAllLabel: string;
};

const DROPDOWNS: Record<string, DropdownConfig> = {
  "/products": {
    href: "/products",
    items: PRODUCT_GROUPS.map((g) => ({
      label: g.label,
      href: `/products#${productGroupSectionId(g.id)}`,
      blurb: g.blurb,
    })),
    viewAllHref: "/products",
    viewAllLabel: "View all products →",
  },
  "/solution": {
    href: "/solution",
    items: solutionPages.map((s) => ({
      label: s.name,
      href: `/solution/${s.slug}`,
    })),
    viewAllHref: "/solution",
    viewAllLabel: "View all solutions →",
  },
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Header isn't remounted on navigation, so dropdown state would survive
  // a route change. Reset it during render (React's "adjusting state from
  // props" pattern, comparing against the last-seen pathname) rather than
  // in a useEffect, avoiding an extra render cascade on every navigation.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  }

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  // A short delay rather than closing immediately: onMouseLeave fires the
  // instant the pointer leaves the trigger/panel's painted box, and real
  // mouse movement from the nav link down into the panel is rarely
  // perfectly vertical — a fast or diagonal move can clip outside that box
  // for a frame or two even with zero visual gap between them. Closing on
  // a timer (cancelled by the next onMouseEnter, which fires the instant
  // the pointer lands back inside) absorbs that without a visible delay on
  // an intentional exit.
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!openDropdown) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = dropdownRefs.current[openDropdown];
      if (el && !el.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openDropdown]);

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

              const dropdown = DROPDOWNS[link.href];
              if (!dropdown) {
                return (
                  <Link key={link.href} href={link.href} style={linkStyle}>
                    {link.label}
                  </Link>
                );
              }

              const isOpen = openDropdown === link.href;
              return (
                <div
                  key={link.href}
                  ref={(el) => {
                    dropdownRefs.current[link.href] = el;
                  }}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenDropdown(link.href);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    href={link.href}
                    style={linkStyle}
                    className="flex items-center gap-1.5"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
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
                      setOpenDropdown(link.href);
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      style={{ transition: "transform 0.15s ease", transform: isOpen ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  {isOpen && (
                    // Flush at top:100% so the pointer never crosses empty
                    // background between link and panel — a margin here
                    // was a dead zone that closed the menu on the way down.
                    // The 12px gap is padding *inside* this box instead.
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
                          {dropdown.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="block px-5 py-2.5 hover:bg-black/[0.04]"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span style={{ fontWeight: 700, fontSize: "var(--fs-footer-link)" }}>
                                  {item.label}
                                </span>
                                {item.blurb && (
                                  <span
                                    className="block mt-0.5"
                                    style={{ fontSize: "12px", color: "var(--text-muted)" }}
                                  >
                                    {item.blurb}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={dropdown.viewAllHref}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-5 py-3 hover:underline"
                          style={{
                            fontWeight: 700,
                            fontSize: "var(--fs-footer-link)",
                            color: "var(--brand-red)",
                            borderTop: "1px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          {dropdown.viewAllLabel}
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

                const dropdown = DROPDOWNS[link.href];
                if (!dropdown) {
                  return (
                    <Link key={link.href} href={link.href} className="py-2.5" style={linkStyle}>
                      {link.label}
                    </Link>
                  );
                }

                const isOpen = mobileOpenDropdown === link.href;
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full py-2.5"
                      style={linkStyle}
                      aria-expanded={isOpen}
                      onClick={() => setMobileOpenDropdown((cur) => (cur === link.href ? null : link.href))}
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
                          transform: isOpen ? "rotate(180deg)" : "none",
                        }}
                      >
                        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="flex flex-col gap-0.5 pb-2 pl-3" style={{ borderLeft: "2px solid var(--brand-red)" }}>
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="py-2 pl-3"
                            style={{ fontSize: "var(--fs-footer-link)", color: "var(--nav-text)" }}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href={dropdown.viewAllHref}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-3"
                          style={{ fontSize: "var(--fs-footer-link)", fontWeight: 700, color: "var(--brand-red)" }}
                        >
                          {dropdown.viewAllLabel}
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
