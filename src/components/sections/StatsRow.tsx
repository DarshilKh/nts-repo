import StatCard from "./StatCard";
import Frame from "@/components/ui/Frame";
import { homeAssets } from "@/lib/assets";

const stats = [
  { icon: homeAssets.iconClients, value: "100+", label: "Satisfied clients" },
  { icon: homeAssets.iconProjects, value: "500+", label: "Project Serverd" },
  { icon: homeAssets.iconExperience, value: "9+", label: "Years of Experience" },
  { icon: homeAssets.iconInstallations, value: "250+", label: "Successful Installation" },
];

/**
 * §4.1 — measured independently of the hero: x=60 to x=1385 (paddingLeft
 * 60, paddingRight 55), 4 cards, 18.6px gap. This happens to be close to
 * the old shared-Container value, but it's set here explicitly for this
 * section only, not inherited from a shared component.
 */
export default function StatsRow() {
  return (
    <Frame>
      <section className="pb-16 md:pb-20 px-6 min-[1440px]:pl-[60px] min-[1440px]:pr-[55px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[18.6px]">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />
          ))}
        </div>
      </section>
    </Frame>
  );
}
