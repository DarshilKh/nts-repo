import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/ui/Frame";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductGrid from "@/components/sections/ProductGrid";
import JsonLd from "@/components/JsonLd";
import { products, productsByGroup, toCardData, productTitle } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RFID Tags, Readers & Toll Automation Products",
  description:
    "Browse our full range of RFID tags, readers, toll boom barriers, ANPR cameras, traffic lights, and vehicle classification hardware for automation projects.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products", title: "RFID Tags, Readers & Toll Automation Products | Network Toll Solution" },
};

/**
 * The grid itself lives in ProductGrid (a client component) so the search
 * field can actually filter. This page stays a server component: it does the
 * catalog projection at build time and ships only the slim card data.
 *
 * Products are grouped by `group` (Tags, Readers, Cameras, Radar, …) rather
 * than the coarse tags-vs-toll `category` split, matching the "Products"
 * nav dropdown so a visitor lands on the same section they clicked.
 *
 * Footer on this page measures differently from every other page —
 * variant="products".
 */
const groups = productsByGroup().map((g) => ({ ...g, products: g.products.map(toCardData) }));

/** ItemList JSON-LD so Google can see the catalog as a set of linked products. */
function catalogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RFID Tags, Readers & Toll Automation Products",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: productTitle(p),
      url: absoluteUrl(`/products/${p.slug}`),
    })),
  };
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <JsonLd data={catalogJsonLd()} />
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:px-[51px] pt-6">
            <Breadcrumbs items={[{ name: "Products", path: "/products" }]} />
          </div>
          <h1 className="sr-only">RFID Tags, Readers &amp; Toll Automation Products</h1>
          <ProductGrid groups={groups} />
        </Frame>
      </main>
      <Footer variant="products" />
    </>
  );
}
