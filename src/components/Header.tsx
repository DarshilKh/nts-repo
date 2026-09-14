"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Frame from "./ui/Frame";
import { navLinks } from "@/lib/data";
import { PRODUCT_GROUPS, productGroupSectionId } from "@/lib/catalog";
import { SOLUTION_GROUPS, solutionsByGroup } from "@/lib/solutions";

/**
 * §4.1 — logo at x=122, nav links span x=729–1318, mirrored insets. Nav
 * labels are bold; the active item is marked by colour, not weight.
 *
 * "Products" and "Solutions" both open a dropdown, sharing one hover/
 * escape/outside-click implementation (`DROPDOWNS` + `openDropdown`
 * below) instead of two copies of the same logic.
 *
 * Solutions has grown to 24 entries, grouped into 5 categories across 3
 * columns (`lib/solutions.ts`'s SOLUTION_GROUPS) — see the multi-column
 * rendering notes further down for why that panel is NOT nested under its
 * trigger link the way the single-column Products panel is.
 */

type DropdownItem = { label: string; href: string; blurb?: string };
/** One labelled cluster within a dropdown column. `title` omitted renders
 *  as a plain list (Products' case — one group, no heading needed). */
type DropdownItemGroup = { title?: string; items: DropdownItem[] };
type DropdownConfig = {
  href: string;
  /** Columns of groups, left to right. */
  columns: DropdownItemGroup[][];
  /** Panel width in px — wide enough for however many columns this has. */
  panelWidth: number;
  viewAllHref: string;
  viewAllLabel: string;
};

const solutionColumnGroups = solutionsByGroup().map((g) => ({
  title: g.label,
  items: g.solutions.map((s) => ({ label: s.name.replace(/\n/g, " "), href: `/solution/${s.slug}` })),
}));

// 5 category groups spread across 3 columns — grouped by rough item count
// so no column runs dramatically longer than the others. SOLUTION_GROUPS
// order is preserved within each column.
const SOLUTION_COLUMNS: DropdownItemGroup[][] = [
  solutionColumnGroups.filter((g) => ["Toll & Traffic", "RFID & Facility Software"].includes(g.title)),
  solutionColumnGroups.filter((g) =>
    ["Gate & Vehicle", "Safety & Security"].includes(g.title)
  ),
  solutionColumnGroups.filter((g) => g.title === "Warehouse & Yard"),
];

const DROPDOWNS: Record<string, DropdownConfig> = {
  "/products": {
    href: "/products",
    columns: [
      [
        {
          items: PRODUCT_GROUPS.map((g) => ({
            label: g.label,
            href: `/products#${productGroupSectionId(g.id)}`,
            blurb: g.blurb,
          })),
        },
      ],
    ],
    panelWidth: 300,
    viewAllHref: "/products",
    viewAllLabel: "View all products →",
  },
  "/solution": {
    href: "/solution",
    columns: SOLUTION_COLUMNS,
    panelWidth: 880,
    viewAllHref: "/solution",
    viewAllLabel: "View all solutions →",
  },
};

/** The dropdown panel content (columns + view-all link), shared between the
 *  single-column (nested, centered-under-trigger) and multi-column (hoisted,
 *  centered-on-header) render paths below — same markup either way, only
 *  the positioning wrapper around it differs. */
function DropdownPanel({
  dropdown,
  multiColumn,
  onNavigate,
}: {
  dropdown: DropdownConfig;
  multiColumn: boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--bg)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className={multiColumn ? "grid py-4" : "py-2"}
        style={multiColumn ? { gridTemplateColumns: `repeat(${dropdown.columns.length}, 1fr)`, columnGap: 8 } : undefined}
      >
        {dropdown.columns.map((column, ci) => (
          <div key={ci} className={multiColumn ? "px-4" : ""}>
            {column.map((group, gi) => (
              <div key={gi} className={gi > 0 ? "mt-4" : ""}>
                {group.title && (
                  <div
                    className="px-1 pb-1.5 mb-1"
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "var(--brand-red)",
                      borderBottom: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {group.title}
                  </div>
                )}
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block hover:bg-black/[0.04] rounded ${multiColumn ? "px-1 py-1.5" : "px-5 py-2.5"}`}
                        onClick={onNavigate}
                      >
                        <span style={{ fontWeight: 700, fontSize: multiColumn ? "13px" : "var(--fs-footer-link)" }}>
                          {item.label}
                        </span>
                        {item.blurb && (
                          <span className="block mt-0.5" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                            {item.blurb}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Link
        href={dropdown.viewAllHref}
        onClick={onNavigate}
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
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // The multi-column panel is hoisted out of its trigger's wrapper (see the
  // render notes below), so outside-click detection needs a second ref for
  // it — a click inside the floating panel isn't inside `dropdownRefs`.
  const floatingPanelRef = useRef<HTMLDivElement | null>(null);
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
      const trigger = dropdownRefs.current[openDropdown];
      const floating = floatingPanelRef.current;
      const target = e.target as Node;
      const insideTrigger = trigger?.contains(target);
      const insideFloating = floating?.contains(target);
      if (!insideTrigger && !insideFloating) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openDropdown]);

  const openDropdownConfig = openDropdown ? DROPDOWNS[openDropdown] : null;
  const openIsMultiColumn = Boolean(openDropdownConfig && openDropdownConfig.columns.length > 1);

  return (
    <header className="sticky top-0 z-50" style={{ background: "var(--bg)" }}>
      <Frame>
        {/* `relative` here so the multi-column panel below can centre
            itself on this row's full width — spanning from the logo to the
            hamburger button — which is what "centered" means for this
            header rather than centering on just the nav links. */}
        <div className="relative flex items-center justify-between py-7 px-6 min-[1440px]:px-[122px]">
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
              const multiColumn = dropdown.columns.length > 1;
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

                  {/* Single-column panels (Products) stay nested here,
                      centred under their own trigger — unchanged, and
                      correct: a 300px panel under any of the 5 nav items
                      never approaches a viewport edge. Multi-column panels
                      render separately below instead of here.

                      `top: 100%` here is relative to THIS wrapper, which is
                      sized to the trigger link alone (~24px, no logo in
                      it) — unlike the hoisted multi-column panel below,
                      whose `relative` ancestor is the full ~100px row. The
                      `calc(100% - 40px)` correction that panel needs would
                      push THIS one to a negative offset, overlapping the
                      nav row instead of sitting under it. A 12px
                      paddingTop is enough gap here. */}
                  {isOpen && !multiColumn && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: "100%", width: `min(${dropdown.panelWidth}px, calc(100vw - 32px))`, paddingTop: 12 }}
                    >
                      <DropdownPanel dropdown={dropdown} multiColumn={false} onNavigate={() => setOpenDropdown(null)} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Multi-column panel, hoisted out of any single trigger's wrapper
              and centred on the whole header row instead (logo included —
              see the `relative` note on the row above). Needs its own
              onMouseEnter/onMouseLeave (the trigger's hover handlers don't
              cover this now-separate element) and its own ref (the outside-
              click check above reads `floatingPanelRef` precisely because
              this panel is no longer inside `dropdownRefs`). */}
          {openDropdownConfig && openIsMultiColumn && (
            <div
              ref={floatingPanelRef}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: "calc(100% - 40px)",
                width: `min(${openDropdownConfig.panelWidth}px, calc(100vw - 32px))`,
                paddingTop: 12,
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <DropdownPanel dropdown={openDropdownConfig} multiColumn={true} onNavigate={() => setOpenDropdown(null)} />
            </div>
          )}

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
          <div className="md:hidden overflow-y-auto" style={{ background: "var(--bg)", maxHeight: "calc(100vh - 96px)" }}>
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
                // Mobile has no room for columns — every column's groups
                // flatten into one accordion list, group titles kept as
                // small section labels so 24 items still read as organised
                // rather than one undifferentiated scroll.
                const allGroups = dropdown.columns.flat();
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
                        {allGroups.map((group, gi) => (
                          <div key={gi} className={gi > 0 ? "mt-2" : ""}>
                            {group.title && (
                              <div
                                className="pl-3 pb-1"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  letterSpacing: "0.04em",
                                  textTransform: "uppercase",
                                  color: "var(--brand-red)",
                                }}
                              >
                                {group.title}
                              </div>
                            )}
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block py-2 pl-3"
                                style={{ fontSize: "var(--fs-footer-link)", color: "var(--nav-text)" }}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                        <Link
                          href={dropdown.viewAllHref}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-3 mt-1"
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
