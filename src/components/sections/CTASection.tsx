"use client";

import { useState } from "react";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Frame from "@/components/ui/Frame";
import { button, parallelogramClipPath } from "@/lib/tokens";
import { useBotGuard } from "@/lib/useBotGuard";

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

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .cta-grid { display: grid; grid-template-columns: 620px 1fr; gap: 80px; }
        }
      `}</style>
      <section className="py-16 md:py-24 px-6">
        <div className="cta-grid grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mx-auto w-full max-w-[1320px]">
          <div>
            <Heading as="h2" size="displayXl">
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
            onSubmit={(e) => {
              e.preventDefault();
              // See lib/useBotGuard.ts. No backend wired up yet — a real
              // submit call belongs here, guarded by the same check.
              if (isLikelyBot(e.currentTarget)) {
                setBlocked(true);
                return;
              }
            }}
          >
            <input type="text" {...honeypotProps} />
            {blocked && (
              <p role="alert" className="sr-only">
                This submission looked automated and was not sent.
              </p>
            )}
            {["Name", "Mail", "Phone"].map((field) => (
              <label key={field} className="flex flex-col">
                <span className="sr-only">{field}</span>
                <input
                  type="text"
                  placeholder={field}
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
              className="self-start mt-2"
              style={{
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
              Submit
            </button>
          </form>
        </div>
      </section>
    </Frame>
  );
}
