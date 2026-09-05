import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { button, parallelogramClipPath } from "@/lib/tokens";

/**
 * §0.2 / §3.5 — "Get Started" button: true parallelogram, vertical left
 * edge, horizontal bottom edge, right edge slanted from full-width at the
 * top to indented at the bottom by 8.6% of the width (button.slantRatioGetStarted).
 * Radius 0px (straight-line path only, no curves in the source).
 * Implemented with clip-path rather than a border-radius/skew hack so the
 * corners stay perfectly sharp.
 *
 * This is the ONLY button on the site using this exact 8.6% ratio —
 * "Brochure" (Products) and "Submit" (Contact) measure differently and
 * are implemented directly in their own components rather than through
 * this primitive; see the `button` token comment in lib/tokens.ts.
 */
const clip = parallelogramClipPath(button.slantRatioGetStarted);

type CommonProps = {
  children: ReactNode;
  className?: string;
};

export default function Button({
  href,
  children,
  className = "",
  ...rest
}: CommonProps &
  (
    | { href: string; type?: never }
    | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const style = {
    clipPath: clip,
    fontSize: "var(--fs-button)", // 33px, measured on "Get Started"
    fontWeight: 700,
    background: "var(--brand-red)",
    color: "var(--white)",
    borderRadius: 0,
    display: "inline-block",
    padding: "0.55em 1.5em 0.55em 1.15em",
    lineHeight: 1,
  };

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      style={style}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
