import type { FlowDiagram as FlowDiagramData } from "@/lib/catalog";
import { card } from "@/lib/tokens";

/**
 * Renders a catalog flow diagram as real HTML (not an image), so the text is
 * selectable, indexable and scales with the page. Zones stack top to bottom
 * with a captioned arrow between them. Inside a zone, nodes sit in a grid, or
 * in a left-to-right chain when `chain` is set (it turns top-to-bottom on
 * phones so nothing needs a horizontal scroll).
 */
export default function FlowDiagram({ diagram }: { diagram: FlowDiagramData }) {
  return (
    <figure className="max-w-5xl" style={{ margin: 0 }}>
      <ol className="list-none p-0 m-0 mt-8">
        {diagram.zones.map((zone, i) => {
          const link = diagram.links?.[i];
          const isLast = i === diagram.zones.length - 1;
          return (
            <li key={zone.label}>
              <div
                className="px-5 pt-4 pb-5"
                style={{ background: "var(--bg)", boxShadow: card.shadow, borderLeft: "6px solid var(--brand-red)" }}
              >
                <div
                  style={{
                    color: "var(--brand-red)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontSize: "var(--fs-footer-link)",
                  }}
                >
                  {zone.label}
                </div>
                <ul
                  className={
                    zone.chain
                      ? "list-none p-0 mt-3 flex flex-col lg:flex-row lg:items-stretch gap-2"
                      : "list-none p-0 mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  }
                >
                  {zone.nodes.map((n, j) => (
                    <li
                      key={n.title}
                      className={zone.chain ? "flex flex-col lg:flex-row lg:items-stretch gap-2 lg:flex-1" : ""}
                    >
                      <div
                        className="px-4 py-3 w-full"
                        style={{ border: "1px solid rgba(0,0,0,0.14)", background: "var(--white)" }}
                      >
                        <div style={{ fontSize: "var(--fs-nav)", fontWeight: 700, color: "var(--text-primary)" }}>
                          {n.title}
                        </div>
                        {n.note && (
                          <div className="mt-1" style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
                            {n.note}
                          </div>
                        )}
                      </div>
                      {zone.chain && j < zone.nodes.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="flex items-center justify-center shrink-0"
                          style={{ color: "var(--brand-red)", fontWeight: 700, fontSize: "var(--fs-body-xs)" }}
                        >
                          <span className="lg:hidden">↓</span>
                          <span className="hidden lg:inline">→</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {!isLast && (
                <div className="flex items-center gap-3 pl-6 py-2">
                  <span style={{ color: "var(--brand-red)", fontWeight: 700, fontSize: "var(--fs-body-xs)" }} aria-hidden="true">
                    ↓
                  </span>
                  {link && (
                    <span style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)", fontWeight: 600 }}>
                      {link}
                    </span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
