import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";

/**
 * §4.1 stat row: 4 cards, 317.3×295.6 measured panel size, 18.6px gap,
 * number at 48px, caption at 23px. Icon glyphs are themselves raster
 * images in the source (§3.7), so they go through the same placeholder
 * asset registry as photos, not hardcoded SVG.
 */
export default function StatCard({
  icon,
  value,
  label,
}: {
  icon: { src: string; alt: string; width: number; height: number };
  value: string;
  label: string;
}) {
  return (
    <Card className="flex flex-col items-center text-center gap-4 px-6 py-8">
      <div
        className="flex items-center justify-center"
        style={{ width: 56, height: 56, background: "var(--brand-red)" }}
      >
        <MediaSlot
          src={icon.src}
          alt={icon.alt}
          measuredWidth={icon.width}
          measuredHeight={icon.height}
          className="w-9 h-9"
          sizes="36px"
        />
      </div>
      <div>
        <Heading as="span" size="statNumber" className="block">
          {value}
        </Heading>
        <Text size="bodySm" tone="muted" className="mt-1" style={{ fontSize: "var(--fs-stat-label)" }}>
          {label}
        </Text>
      </div>
    </Card>
  );
}
