import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/ui/Frame";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  alternates: { canonical: "/404" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Frame>
          <section className="px-6 min-[1440px]:px-[122px] py-24 md:py-32 text-center">
            <Text
              size="body"
              style={{ color: "var(--brand-red)", fontWeight: 700, letterSpacing: "0.04em" }}
            >
              404
            </Text>
            <Heading as="h1" size="displayLg" className="mt-4">
              Page not found
            </Heading>
            <Text size="bodyLg" tone="muted" className="mt-5 max-w-xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved. Try one of the links below, or head back to the
              homepage.
            </Text>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/">Back to Home</Button>
            </div>
            <nav aria-label="Suggested pages" className="mt-10">
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[
                  ["Solutions", "/solution"],
                  ["Products", "/products"],
                  ["About Us", "/about"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} style={{ color: "var(--text-muted)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </Frame>
      </main>
      <Footer />
    </>
  );
}
