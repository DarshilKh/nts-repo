import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Card from "@/components/ui/Card";
import MediaSlot from "@/components/ui/MediaSlot";
import { button, parallelogramClipPath } from "@/lib/tokens";
import type { ProductCardData } from "@/lib/catalog";

/**
 * §4.3 — panel 435×644, 0 radius (confirmed via path inspection — plain
 * `re`, no curve segments). Title 35px, body 18px. Text content is inset
 * 53px from the panel's left/right edges (measured: title x=104, panel
 * x0=51 → 53px). The Brochure button is NOT inset the same amount — its
 * rect starts flush at x=51, i.e. 0px left padding, matching the panel
 * edge exactly. Button measured 201×36, flush to the card's left edge,
 * label 20px. Path-level inspection shows a 6.1% slant
 * (button.slantRatioBrochure) — shallower than "Get Started"'s 8.6%, not
 * the same ratio at a different size.
 *
 * The button was previously a `<button>` with no handler, so it did nothing
 * when clicked. Every ribbon now reads "View details" and opens the product
 * page; the brochure PDF lives at the foot of that page, after the specs.
 *
 * IMAGE BOX: every card renders its photo into the SAME 435×430 box, not the
 * photo's own aspect ratio. The source photos are a mix of 1:1 and 931×1024,
 * and honouring each one made the cards in a row different heights — the
 * title of a tall-image card sat below its neighbours' and the whole row
 * looked broken. A fixed box plus `object-fit: cover` puts every title,
 * paragraph and ribbon on the same baseline across the row.
 */
const CARD_IMAGE = { width: 435, height: 430 } as const;

export default function ProductCard({
  product,
  priority = false,
}: {
  product: ProductCardData;
  /** First card above the fold — see ProductGrid, which sets this on the very first card only. */
  priority?: boolean;
}) {
  const href = `/products/${product.slug}`;
  const title = product.name.replace(/\n/g, " ");

  const ctaStyle = {
    width: 201,
    height: 36,
    clipPath: parallelogramClipPath(button.slantRatioBrochure),
    background: "var(--brand-red)",
    color: "var(--white)",
    fontSize: "var(--fs-body)",
    fontWeight: 700,
    paddingLeft: "1.1em",
    display: "flex",
    alignItems: "center",
  } as const;

  return (
    <Card className="flex flex-col overflow-hidden group">
      <Link href={href} aria-label={title} tabIndex={-1} className="block">
        <MediaSlot
          src={product.image.src}
          alt={product.image.alt}
          measuredWidth={CARD_IMAGE.width}
          measuredHeight={CARD_IMAGE.height}
          sizes="(min-width: 1440px) 435px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />
      </Link>
      <div className="pt-6 pb-6 flex flex-col flex-1">
        <div className="px-[53px] flex flex-col flex-1">
          <Heading as="h3" size="h3" className="whitespace-pre-line">
            <Link href={href} className="group-hover:underline underline-offset-4">
              {product.name}
            </Link>
          </Heading>
          <Text size="bodyXs" tone="muted" className="mt-3">
            {product.desc}
          </Text>
          {product.bullets && (
            <ul className="mt-3 space-y-1">
              {product.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2"
                  style={{ fontSize: "var(--fs-body-xs)", color: "var(--text-muted)" }}
                >
                  <span style={{ color: "var(--brand-red)" }} aria-hidden="true">
                    •
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={href}
          className="mt-5"
          style={ctaStyle}
          aria-label={`View details for ${title}`}
        >
          View details
        </Link>
      </div>
    </Card>
  );
}
