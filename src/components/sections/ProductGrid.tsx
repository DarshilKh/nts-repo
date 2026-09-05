"use client";

import { useMemo, useState, useId } from "react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import ProductCard from "@/components/sections/ProductCard";
import { productGroupSectionId, type ProductCardData } from "@/lib/catalog";

export type ProductGridGroup = {
  id: string;
  label: string;
  blurb: string;
  products: ProductCardData[];
};

/**
 * §4.3 — grid: 3 explicit columns at x=51/503/954 (435px each, ~17px gaps),
 * symmetric 51px right margin. Row pitch 661px (644 card + 17 gap).
 *
 * Section headings previously used a measured-but-asymmetric 122px left /
 * 51px right pad, 71px more on the left than the right. That's the PDF's
 * fixed 1440px canvas value, but this page is wrapped in a Frame that
 * centers on wider viewports (marginInline: auto) — so on any screen wider
 * than 1440px, that 71px imbalance reads as "the whole page is shifted
 * left, with more empty margin on the left than the right" (the same bug
 * the footer had — see Footer.tsx's `sidePad`). Headings now share the
 * grid's own symmetric 51px, which also puts them flush with the card grid
 * below them instead of indented past its edge.
 *
 * One section per catalog `group` (Tags, Readers, Cameras, Radar, …) rather
 * than the old two-bucket Tags/Toll Plaza split — with 29 products across
 * 17 toll-plaza SKUs, "Toll Plaza" alone told a buyer nothing about which
 * of a boom barrier, a camera and a radar unit they were looking at. Each
 * section's id comes from `productGroupSectionId` (lib/catalog.ts) so the
 * nav dropdown can link straight to it.
 *
 * The design has a search field above the grid, but it was an uncontrolled
 * input with no handler — it looked interactive and did nothing, which is
 * worse than not having it. It now filters every section live. With 29
 * products across seven groups that is a real navigation aid, and the match
 * runs against model numbers and spec text (see `toCardData`), so "NTS-IR-05"
 * or "Impinj" finds the right card rather than only the card title matching.
 *
 * Filtering is client-side because the whole catalog is a build-time constant
 * — no request needed, and the page stays statically prerendered.
 */
export default function ProductGrid({ groups }: { groups: ProductGridGroup[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const q = query.trim().toLowerCase();
  const terms = useMemo(() => q.split(/\s+/).filter(Boolean), [q]);

  const match = useMemo(
    () => (p: ProductCardData) => terms.every((t) => p.search.includes(t)),
    [terms]
  );

  const visibleGroups = groups.map((g) => ({
    ...g,
    products: terms.length ? g.products.filter(match) : g.products,
  }));
  const total = visibleGroups.reduce((sum, g) => sum + g.products.length, 0);

  return (
    <>
      <style>{`
        @media (min-width: 1440px) {
          .products-grid { display: grid; grid-template-columns: repeat(3, 435px); column-gap: 17px; }
          .products-heading { padding-left: 51px; padding-right: 51px; }
          .products-grid-wrap { padding-left: 51px; padding-right: 51px; }
        }
        .products-group-anchor { scroll-margin-top: 100px; }
      `}</style>

      <section className="products-heading pt-10 pb-6 px-6">
        <label htmlFor={inputId} className="relative block max-w-xl">
          <span className="sr-only">Search products</span>
          <svg
            className="absolute left-0 top-1/2 -translate-y-1/2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="#9aa3ac" strokeWidth="1.8" />
            <path d="M20 20l-4.5-4.5" stroke="#9aa3ac" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, models or specs"
            className="w-full border-b-2 pl-7 pb-2 bg-transparent outline-none"
            style={{ borderColor: "var(--brand-red)", fontSize: "var(--fs-body)" }}
          />
        </label>
        <p aria-live="polite" className="sr-only">
          {terms.length ? `${total} products match ${query}` : `${total} products`}
        </p>
      </section>

      {terms.length > 0 && total === 0 && (
        <section className="products-heading px-6 pb-16">
          <Text size="body" tone="muted">
            No products match “{query}”. Try a model number, a chip name, or clear the search to
            browse the full range.
          </Text>
        </section>
      )}

      {visibleGroups.map(
        (g, i) =>
          g.products.length > 0 && (
            <section
              key={g.id}
              id={productGroupSectionId(g.id)}
              className={`products-group-anchor px-6 ${i === 0 ? "pt-8" : "pt-4"} ${
                i === visibleGroups.length - 1 ? "pb-16" : "pb-12"
              }`}
            >
              <div className="products-heading">
                <Heading as="h2" size="h3" className="inline">
                  {g.label}{" "}
                </Heading>
                <Heading as="span" size="h3" weight={400} color="var(--text-muted)">
                  {g.blurb}
                </Heading>
              </div>
              <div className="products-grid-wrap">
                <div className="products-grid mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {g.products.map((p, j) => (
                    <ProductCard key={p.slug} product={p} priority={i === 0 && j === 0} />
                  ))}
                </div>
              </div>
            </section>
          )
      )}
    </>
  );
}
