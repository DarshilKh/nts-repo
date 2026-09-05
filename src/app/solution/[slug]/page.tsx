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
import JsonLd from "@/components/JsonLd";
import { solutionPages, getSolution, solutions, type Solution } from "@/lib/solutions";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { card } from "@/lib/tokens";

/**
 * One page per solution that has content on the live site. Mirrors the product
 * detail page: hero → gallery → sections → video → downloads → FAQs.
 *
 * `solutionPages` currently equals the full `solutions` list — every
 * remaining row has a detail page (Fleet Monitoring and Attendance
 * Management, the two rows that didn't, were removed outright).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};

  return {
    title: solution.seo.title,
    description: solution.seo.description,
    alternates: { canonical: `/solution/${solution.slug}` },
    openGraph: {
      url: `/solution/${solution.slug}`,
      title: `${solution.seo.title} | ${SITE_NAME}`,
      description: solution.seo.description,
      type: "website",
    },
  };
}

function serviceJsonLd(s: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.seo.description,
    url: absoluteUrl(`/solution/${s.slug}`),
    provider: { "@id": `${absoluteUrl("/")}#organization` },
    areaServed: "IN",
  };
}

function faqJsonLd(s: Solution) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (s.faqs ?? []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution || !solution.detail) notFound();

  const related = solutions.filter((s) => s.detail && s.slug !== solution.slug);

  return (
    <>
      <Header />
      <JsonLd data={serviceJsonLd(solution)} />
      {solution.faqs?.length ? <JsonLd data={faqJsonLd(solution)} /> : null}
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:px-[122px] pt-6">
            <Breadcrumbs
              items={[
                { name: "Solution", path: "/solution" },
                { name: solution.name, path: `/solution/${solution.slug}` },
              ]}
            />
          </div>

          <section className="px-6 min-[1440px]:px-[122px] pt-10 pb-4">
            <Heading as="h1" size="h2" className="max-w-4xl">
              {solution.heading ?? solution.name}
            </Heading>
            {solution.tagline && (
              <Text size="bodyLg" tone="brand" weight={600} className="mt-3">
                {solution.tagline}
              </Text>
            )}
            {solution.intro?.map((para) => (
              <Text key={para} size="body" tone="muted" className="mt-5 max-w-4xl">
                {para}
              </Text>
            ))}
          </section>

          {solution.gallery?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.gallery.map((g) => (
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

          {solution.sections?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-6 space-y-10">
              {solution.sections.map((s) => (
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

          {solution.video && (
            <section className="px-6 min-[1440px]:px-[122px] py-8">
              <div
                className="relative w-full max-w-4xl"
                style={{ aspectRatio: "16 / 9", boxShadow: card.shadow }}
              >
                <iframe
                  src={solution.video}
                  title={`${solution.name} — overview video`}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </section>
          )}

          {solution.brochures?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="h3Lg">
                Downloads
              </Heading>
              <ul className="mt-6 flex flex-col gap-3 max-w-2xl">
                {solution.brochures.map((b) => (
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
          ) : null}

          {solution.faqs?.length ? (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="h3Lg">
                FAQs — {solution.name}
              </Heading>
              <div className="mt-6 max-w-4xl">
                {solution.faqs.map((f) => (
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

          {related.length > 0 && (
            <section className="px-6 min-[1440px]:px-[122px] py-10">
              <Heading as="h2" size="itemHeading" weight={700}>
                Other solutions
              </Heading>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/solution/${r.slug}`}
                      style={{
                        color: "var(--brand-red)",
                        fontSize: "var(--fs-body-xs)",
                        fontWeight: 600,
                      }}
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Frame>

        <ProductEnquiry productName={solution.name} />
      </main>
      <Footer />
    </>
  );
}
