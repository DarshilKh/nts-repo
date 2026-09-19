import Text from "@/components/ui/Text";
import MissionVisionRow from "@/components/sections/MissionVisionRow";
import { aboutAssets } from "@/lib/assets";

const items = [
  { title: "Customized Solutions", body: "Tailored systems designed around your operational needs." },
  { title: "Advanced Technology", body: "Modern RFID and automation solutions built for accuracy and reliability." },
  { title: "Expert Support", body: "Dedicated assistance from consultation to deployment and maintenance." },
  { title: "Scalable Systems", body: "Solutions that grow with your business." },
];

/**
 * Same row component as Mission/Vision (image panel + text panel, same
 * padding/centering/corner-mark system) — only the media panel is wider
 * (517px, matching this illustration's own measured size, vs the 386px
 * icon panel Mission/Vision use) and the text panel holds a bulleted list
 * instead of a paragraph.
 */
export default function WhyChooseUs() {
  return (
    <MissionVisionRow
      styleId="whyus"
      heading="Why Choose Us"
      media={aboutAssets.whyUs}
      mediaClassName="w-full"
      mediaPanelWidthPx={517}
      panelSide="left"
    >
      <ul className="mt-8 flex flex-col gap-6">
        {items.map((item) => (
          <li key={item.title} className="flex gap-3">
            <span className="mt-2 w-1.5 h-1.5 shrink-0" style={{ background: "var(--brand-red)" }} />
            <div>
              <Text size="body" as="p" style={{ fontSize: "var(--fs-item-heading)", fontWeight: 700 }}>
                {item.title}
              </Text>
              <Text size="body" tone="muted" className="mt-1">
                {item.body}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </MissionVisionRow>
  );
}
