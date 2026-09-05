import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/ui/Frame";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MediaSlot from "@/components/ui/MediaSlot";
import ProductEnquiry from "@/components/sections/ProductEnquiry";
import SpecTable from "@/components/sections/SpecTable";
import JsonLd from "@/components/JsonLd";
import { products, getProduct, productTitle, PRODUCT_GROUPS, type Product } from "@/lib/catalog";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { card } from "@/lib/tokens";

/**
 * One page per catalog entry. The old WordPress site had a page per product
 * carrying the model numbers, spec tables, FAQs and brochure PDFs that buyers
 * actually search for — all of that would have been lost by shipping only the
 * card grid, along with ~25 indexed URLs. These pages carry it forward, with
 * the copy transcribed in src/lib/catalog.ts.
 *
 * Statically generated: the catalog is a build-time constant, so every product
 * page is prerendered and `dynamicParams` is off — an unknown slug is a 404,
 * not a runtime render.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      url: `/products/${product.slug}`,
      title: `${product.seo.title} | ${SITE_NAME}`,
      description: product.seo.description,
      type: "website",
    },
  };
}

function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productTitle(product),
    description: product.seo.description,
    image: absoluteUrl(product.image.src),
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: PRODUCT_GROUPS.find((g) => g.id === product.group)?.label ?? "Products",
  };
}

/**
 * FAQPage JSON-LD, emitted only where the page actually has FAQs. Google
 * penalises FAQ markup that doesn't match visible page content, so this is
 * derived from the same array that renders below rather than hand-maintained.
 */
function faqJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (product.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const title = productTitle(product);

  /**
   * Every brochure on the product, gathered into one Downloads block at the
   * foot of the page. They were previously scattered — one set in the hero,
   * one per model — which meant a buyer had to scroll past the specs to find
   * the PDF and then scroll back up. Reading order is now: what it is →
   * models → specs → downloads.
   *
   * De-duplicated by href because a single-model product repeats the same
   * PDF at both product and model level.
   */
  const downloads = [
    ...(product.brochures ?? []),
    ...(product.models?.flatMap((m) => (m.brochure ? [m.brochure] : [])) ?? []),
  ].filter((b, i, all) => all.findIndex((x) => x.href === b.href) === i);

  const related = products
    .filter((p) => p.group === product.group && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <Header />
      <JsonLd data={productJsonLd(product)} />
      {product.faqs?.length ? <JsonLd data={faqJsonLd(product)} /> : null}
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:px-[122px] pt-6">
            <Breadcrumbs
              items={[
                { name: "Products", path: "/products" },
                { name: title, path: `/products/${product.slug}` },
              ]}
            />
          </div>

          {/* Hero: image left, headline + lead copy right. */}
          <section className="px-6 min-[1440px]:px-[122px] pt-10 pb-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div style={{ boxShadow: card.shadow, background: "var(--bg)" }}>
              <MediaSlot
                src={product.image.src}
                alt={product.image.alt}
                measuredWidth={product.image.width}
                measuredHeight={product.image.height}
                sizes="(min-width: 768px) 45vw, 100vw"
                priority
              />
            </div>
            <div>
              <Heading as="h1" size="h2">
                {product.heading ?? title}
              </Heading>
              {product.tagline && (
                <Text size="bodyLg" tone="brand" weight={600} className="mt-3">
                  {product.tagline}
                </Text>
              )}
              {(product.intro ?? [product.desc]).map((para) => (
                <Text key={para} size="body" tone="muted" className="mt-4">
                  {para}
                </Text>
              ))}
            </div>
          </section>

          {product.gallery?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.gallery.map((g) => (
                <div key={g.src} style={{ boxShadow: card.shadow, background: "var(--bg)" }}>
                  <MediaSlot
                    src={g.src}
                    alt={g.alt}
                    measuredWidth={g.width}
                    measuredHeight={g.height}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </div>
              ))}
            </section>
          ) : null}

          {/* Models — each with its own photo, spec bullets and brochure. */}
          {product.models?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] pt-10 pb-4">
              <Heading as="h2" size="h3Lg">
                Models &amp; specifications
              </Heading>
              <div className="mt-8 space-y-14">
                {product.models.map((model, i) => (
                  <article
                    key={model.name}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                  >
                    {model.image && (
                      <div
                        className={i % 2 === 1 ? "md:order-2" : ""}
                        style={{ boxShadow: card.shadow, background: "var(--bg)" }}
                      >
                        <MediaSlot
                          src={model.image.src}
                          alt={model.image.alt}
                          measuredWidth={model.image.width}
                          measuredHeight={model.image.height}
                          sizes="(min-width: 768px) 45vw, 100vw"
                        />
                      </div>
                    )}
                    <div className={!model.image ? "md:col-span-2" : ""}>
                      <Heading as="h3" size="itemHeading" weight={700}>
                        {model.name}
                      </Heading>
                      {model.body?.map((para) => (
                        <Text key={para} size="bodyXs" tone="muted" className="mt-3">
                          {para}
                        </Text>
                      ))}
                      {model.specs && (
                        <ul className="mt-4 space-y-2">
                          {model.specs.map((s, j) => (
                            <li
                              key={`${s.label ?? ""}-${j}`}
                              className="flex gap-2"
                              style={{
                                fontSize: "var(--fs-body-xs)",
                                color: "var(--text-muted)",
                              }}
                            >
                              <span style={{ color: "var(--brand-red)" }} aria-hidden="true">
                                •
                              </span>
                              <span>
                                {s.label && (
                                  <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                                    {s.label}:{" "}
                                  </strong>
                                )}
                                {s.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {/* Titled prose / bullet blocks — "Function", "Features", etc. */}
          {product.sections?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-6 space-y-10">
              {product.sections.map((s) => (
                <div key={s.title}>
                  <Heading as="h2" size="itemHeading" weight={700}>
                    {s.title}
                  </Heading>
                  {s.body?.map((para) => (
                    <Text key={para} size="bodyXs" tone="muted" className="mt-3 max-w-4xl">
                      {para}
                    </Text>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2 max-w-4xl">
                      {s.list.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2"
                          style={{ fontSize: "var(--fs-body-xs)", color: "var(--text-muted)" }}
                        >
                          <span style={{ color: "var(--brand-red)" }} aria-hidden="true">
                            •
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ) : null}

          {product.specTables?.length ? (
            <div className="px-6 min-[1440px]:px-[122px] pb-6">
              {product.specTables.map((t) => (
                <SpecTable key={t.title ?? t.rows[0]?.[0]} table={t} />
              ))}
            </div>
          ) : null}

          {product.outro?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-6">
              {product.outro.map((para) => (
                <Text key={para} size="body" tone="muted" className="max-w-4xl">
                  {para}
                </Text>
              ))}
            </section>
          ) : null}

          {product.faqs?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="h3Lg">
                FAQs — {title}
              </Heading>
              <div className="mt-6 max-w-4xl">
                {product.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="py-4"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}
                  >
                    <summary
                      className="cursor-pointer"
                      style={{
                        fontSize: "var(--fs-body)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {f.q}
                    </summary>
                    <Text size="bodyXs" tone="muted" className="mt-3">
                      {f.a}
                    </Text>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {downloads.length > 0 && (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="h3Lg">
                Downloads
              </Heading>
              <Text size="bodyXs" tone="muted" className="mt-3">
                Full datasheets in PDF, with the complete specification for each model.
              </Text>
              <ul className="mt-6 flex flex-col gap-3 max-w-2xl">
                {downloads.map((b) => (
                  <li key={b.href}>
                    <a
                      href={b.href}
                      download
                      className="flex items-center justify-between gap-4 px-5 py-4"
                      style={{
                        background: "var(--brand-red)",
                        color: "var(--white)",
                        fontSize: "var(--fs-body-xs)",
                        fontWeight: 700,
                      }}
                    >
                      <span>{b.label}</span>
                      <span aria-hidden="true">PDF ↓</span>
                      <span className="sr-only">Download PDF</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="itemHeading" weight={700}>
                Related products
              </Heading>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/products/${r.slug}`}
                      style={{ color: "var(--brand-red)", fontSize: "var(--fs-body-xs)", fontWeight: 600 }}
                    >
                      {productTitle(r)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/products"
                    style={{ color: "var(--text-muted)", fontSize: "var(--fs-body-xs)", fontWeight: 600 }}
                  >
                    All products →
                  </Link>
                </li>
              </ul>
            </section>
          )}
        </Frame>

        <ProductEnquiry productName={title} />
      </main>
      <Footer />
    </>
  );
}
