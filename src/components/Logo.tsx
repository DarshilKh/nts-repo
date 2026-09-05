import Link from "next/link";
import Image from "next/image";

/**
 * Official logo asset, provided directly by the client (CIM/NTS Logo.svg).
 * Recolored from the file's shipped #e50505 to the exact brand spec
 * (#E41F26, confirmed against CIM/Brand_Color_Specifications.pdf) —
 * otherwise unmodified. Replaces the earlier hand-approximated two-square
 * mark now that the real asset is available.
 */
export default function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image
        src="/images/nts-logo.svg"
        alt="Network Toll Solution"
        width={356}
        height={80}
        className="h-11 w-auto"
        // Always above the fold on every page — `priority` is deprecated in
        // this Next version (an alias for `preload`); loading="eager" +
        // fetchPriority="high" is the replacement.
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
}
