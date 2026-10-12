"use client";

import { useState } from "react";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Frame from "@/components/ui/Frame";
import { button, parallelogramClipPath, fx, headingFontSize } from "@/lib/tokens";
import { useBotGuard } from "@/lib/useBotGuard";
import { submitEnquiry } from "@/lib/submitEnquiry";

const COMMENT_CHAR_LIMIT = 100;

/**
 * §4.1 — the PDF measured this section's heading at x=189 with the form
 * column starting at x=992, giving a 723px text column. Reproducing those
 * numbers left the whole block sitting left of centre with a large dead gap
 * on the right, because the measured left inset (189) and right inset (60)
 * aren't symmetric. The two columns are now centred as a unit inside a
 * max-w-1320 wrapper, keeping the measured proportion between them
 * (text column wider than the form) but balancing the section on the page.
 *
 * The Comment field previously had `borderBottom: none` while Name, Mail and
 * Phone each had an underline, so the last field in the form looked like it
 * had lost its rule. All four now match.
 */
export default function CTASection() {
  const { honeypotProps, isLikelyBot } = useBotGuard();
  const [blocked, setBlocked] = useState(false);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string }
  >({ kind: "idle" });

  return (
    <Frame>
      <style>{`
        @media (min-width: 1024px) {
          .cta-grid { grid-template-columns: ${fx(700)} minmax(0, 1fr); column-gap: ${fx(80)}; }
        }
      `}</style>
      {/* Side inset is the measured 60px (the old max-w-[1320px] centred in a
          1440px frame) scaled proportionally, never below 24px — rather than a
          flat 24px that jumped to 60px only once the viewport passed 1344px. */}
      <section className="py-16 md:py-24" style={{ paddingInline: `max(24px, ${fx(60)})` }}>
        <div className="cta-grid grid grid-cols-1 gap-12 lg:gap-20 items-start w-full">
          {/* Sized from this column's own width (cqw) so the longest line,
              "Ready to Automate" (~9.2em wide), always stays on one line —
              viewport-based sizing let it wrap word-by-word on 1024-1439px
              screens, where the column is narrower than the font assumes. */}
          <div className="min-w-0" style={{ containerType: "inline-size" }}>
            <Heading
              as="h2"
              size="displayXl"
              style={{ fontSize: `min(${headingFontSize("displayXl")}, 10.2cqw)` }}
            >
              Ready to Automate
              <br />
              Your Operations?
            </Heading>
            <Text size="bodyLg" tone="muted" className="mt-6 max-w-md">
              Transform the way you manage vehicles, assets, access control,
              and infrastructure with intelligent RFID-powered solutions.
            </Text>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/contact" style={{ color: "var(--brand-red)", fontSize: "var(--fs-body)", fontWeight: 600 }}>
                Contact Us
              </Link>
              <Link href="/contact" style={{ color: "var(--brand-red)", fontSize: "var(--fs-body)", fontWeight: 600 }}>
                Schedule a Cosultation
              </Link>
            </div>
          </div>

          <form
            className="flex flex-col gap-10 pt-2"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              // See lib/useBotGuard.ts — client-side first filter; the API
              // route re-checks the honeypot and validates every field.
              if (isLikelyBot(form)) {
                setBlocked(true);
                return;
              }
              if (status.kind === "sending") return;
              const f = new FormData(form);
              const get = (k: string) => String(f.get(k) ?? "");
              setStatus({ kind: "sending" });
              const result = await submitEnquiry(
                { name: get("name"), email: get("email"), phone: get("phone"), message: get("message") },
                { source: "cta", honeypot: get(honeypotProps.name) }
              );
              if (result.ok) {
                form.reset();
                setComment("");
                setStatus({ kind: "success" });
              } else {
                setStatus({ kind: "error", message: result.error });
              }
            }}
          >
            <input type="text" {...honeypotProps} />
            {blocked && (
              <p role="alert" className="sr-only">
                This submission looked automated and was not sent.
              </p>
            )}
            {(
              [
                { label: "Name", name: "name", type: "text", autoComplete: "name" },
                { label: "Mail", name: "email", type: "email", autoComplete: "email" },
                { label: "Phone", name: "phone", type: "tel", autoComplete: "tel" },
              ] as const
            ).map((field) => (
              <label key={field.name} className="flex flex-col">
                <span className="sr-only">{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  autoComplete={field.autoComplete}
                  required={field.name === "name"}
                  maxLength={field.name === "email" ? 200 : 100}
                  placeholder={field.label}
                  style={{
                    width: "100%",
                    borderBottom: "1px solid var(--text-label)",
                    paddingBottom: "1.25rem",
                    fontSize: "var(--fs-body-xs)",
                  }}
                />
              </label>
            ))}
            <label className="flex flex-col">
              <span className="sr-only">Comment</span>
              <textarea
                name="message"
                placeholder="Comment"
                rows={3}
                maxLength={COMMENT_CHAR_LIMIT}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  resize: "vertical",
                  borderBottom: "1px solid var(--text-label)",
                  paddingBottom: "1.25rem",
                  fontSize: "var(--fs-body-xs)",
                }}
              />
              <Text size="bodyXs" tone="muted" className="mt-1 self-end">
                {comment.length}/{COMMENT_CHAR_LIMIT} characters
              </Text>
            </label>
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="self-start mt-2"
              style={{
                opacity: status.kind === "sending" ? 0.7 : 1,
                width: 200,
                height: 60,
                clipPath: parallelogramClipPath(button.slantRatioSubmit, true),
                background: "var(--brand-red)",
                color: "var(--white)",
                fontSize: "var(--fs-body)",
                fontWeight: 700,
                paddingLeft: "1.2em",
              }}
            >
              {status.kind === "sending" ? "Sending..." : "Submit"}
            </button>
          {status.kind !== "idle" && (
            <p
              role={status.kind === "error" ? "alert" : "status"}
              className="-mt-4"
              style={{
                fontSize: "var(--fs-body-xs)",
                fontWeight: 600,
                color: status.kind === "success" ? "#1a7f37" : "var(--brand-red)",
              }}
            >
              {status.kind === "success"
                ? "Thank you! Your message has been sent. We will get back to you shortly."
                : status.kind === "error"
                  ? status.message
                  : null}
            </p>
          )}
          </form>
        </div>
      </section>
    </Frame>
  );
}
