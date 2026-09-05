import Heading from "@/components/ui/Heading";
import type { SpecTable as SpecTableData } from "@/lib/catalog";

/**
 * Renders a catalog spec table. Two shapes are supported by the same
 * component because the source pages use both:
 *
 *  - no `headers`  → a two-column label/value table (most products)
 *  - with `headers` → a real multi-column comparison table (the radars, the
 *    animal tag variants), rendered with a proper <thead> so screen readers
 *    and Google both read the column relationships correctly.
 *
 * A row containing a single cell is a group heading (e.g. "Performance",
 * "Communication") and spans the full width — the live site fakes these with
 * bolded empty rows, which reads as a broken table to assistive tech.
 *
 * Wrapped in an overflow-x container: the radar tables are 5 columns wide and
 * will not fit a phone, and a horizontally scrollable table is far better
 * than one that blows out the page width.
 */
export default function SpecTable({ table }: { table: SpecTableData }) {
  const cols = table.headers?.length ?? 2;

  return (
    <section className="mt-12">
      {table.title && (
        <Heading as="h3" size="itemHeading" weight={700}>
          {table.title}
        </Heading>
      )}
      <div className="mt-4 overflow-x-auto">
        <table
          className="w-full border-collapse text-left"
          style={{ fontSize: "var(--fs-body-xs)", minWidth: cols > 2 ? 640 : undefined }}
        >
          {table.headers && (
            <thead>
              <tr>
                {table.headers.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="align-bottom py-3 pr-6"
                    style={{
                      borderBottom: "2px solid var(--brand-red)",
                      color: "var(--text-primary)",
                      fontWeight: 700,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {table.rows.map((row, i) => {
              if (row.length === 1) {
                return (
                  <tr key={`${row[0]}-${i}`}>
                    <th
                      scope="colgroup"
                      colSpan={cols}
                      className="py-3 pt-6"
                      style={{
                        color: "var(--brand-red)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        fontSize: "var(--fs-footer-link)",
                      }}
                    >
                      {row[0]}
                    </th>
                  </tr>
                );
              }
              return (
                <tr key={`${row[0]}-${i}`} style={{ borderTop: "1px solid rgba(0,0,0,0.10)" }}>
                  <th
                    scope="row"
                    className="align-top py-3 pr-6 w-1/4"
                    style={{ color: "var(--text-primary)", fontWeight: 600 }}
                  >
                    {row[0]}
                  </th>
                  {row.slice(1).map((cell, j) => (
                    <td
                      key={j}
                      className="align-top py-3 pr-6"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.notes && (
        <ol className="mt-4 space-y-1 list-decimal pl-5">
          {table.notes.map((n) => (
            <li key={n} style={{ fontSize: "var(--fs-footer-link)", color: "var(--text-muted)" }}>
              {n}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
