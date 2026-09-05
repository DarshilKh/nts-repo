import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export default function Breadcrumbs({
  items,
  className = "",
}: {
  /** Current-page trail, excluding Home (added automatically). */
  items: { name: string; path: string }[];
  className?: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5" style={{ fontSize: "var(--fs-footer-link)" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted)" }}>
              Home
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                <span aria-hidden="true" style={{ color: "var(--text-muted)" }}>
                  /
                </span>
                {isLast ? (
                  <span aria-current="page" style={{ color: "var(--brand-red)", fontWeight: 600 }}>
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} style={{ color: "var(--text-muted)" }}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
