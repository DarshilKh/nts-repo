"use client";

import { useState } from "react";
import Frame from "@/components/ui/Frame";
import Text from "@/components/ui/Text";
import { button, parallelogramClipPath } from "@/lib/tokens";
import { useBotGuard } from "@/lib/useBotGuard";

const MESSAGE_CHAR_LIMIT = 100;

/**
 * §4.4 — two label columns at x=189 (Name/Phone Number/City,State) and
 * x=516 (Email Address/Company Name/Service Interested), each row an
 * underline-only input: 3px solid red, 263px wide. Message field at
 * x=843: 2px solid red BOX (not underline), measured 388×188. Submit
 * button: solid red parallelogram, 340×68, flush to the frame's right
 * edge (x:1100–1440), 30px white label. Path-level inspection shows an
 * 11.9% slant that cuts the TOP-LEFT corner (button.slantRatioSubmit,
 * mirrored) — the opposite corner and a steeper angle than "Get Started"
 * (8.6%, bottom-right) or "Brochure" (6.1%, bottom-right). Makes sense
 * given this button is right-flush rather than left-flush, but it's a
 * genuinely different shape, not the same one mirrored by CSS alone.
 *
 * Every field is wrapped in a <label> with a visually-hidden (sr-only)
 * text description, matching the source's placeholder-only visual design
 * while still giving each input an accessible name.
 */
const fieldStyle = {
  borderBottom: "3px solid var(--brand-red)",
  width: 263,
  paddingBottom: "0.6rem",
  fontSize: "var(--fs-body-xs)",
};

export default function ContactForm() {
  const { honeypotProps, isLikelyBot } = useBotGuard();
  const [blocked, setBlocked] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .contact-form-grid { padding-left: 189px; padding-right: 60px; }
        }
      `}</style>
      <section className="py-14 px-6 min-[1440px]:px-0 contact-form-grid">
        <form
          className="flex flex-col md:flex-row gap-10 md:gap-16"
          onSubmit={(e) => {
            e.preventDefault();
            // See lib/useBotGuard.ts. This form has no backend yet — once one
            // exists, its call belongs in the `else` branch below, guarded by
            // this same check.
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
          <div className="flex flex-col gap-8 shrink-0">
            <label>
              <span className="sr-only">Name</span>
              <input type="text" placeholder="Name" style={fieldStyle} />
            </label>
            <label>
              <span className="sr-only">Phone Number</span>
              <input type="tel" placeholder="Phone Number" style={fieldStyle} />
            </label>
            <label>
              <span className="sr-only">City / State</span>
              <input type="text" placeholder="City / State" style={fieldStyle} />
            </label>
          </div>
          <div className="flex flex-col gap-8 shrink-0">
            <label>
              <span className="sr-only">Email Address</span>
              <input type="email" placeholder="Email Address" style={fieldStyle} />
            </label>
            <label>
              <span className="sr-only">Company Name</span>
              <input type="text" placeholder="Company Name" style={fieldStyle} />
            </label>
            <label>
              <span className="sr-only">Service Interested</span>
              <select
                defaultValue=""
                style={{ ...fieldStyle, color: "var(--text-label)", appearance: "none" }}
              >
                <option value="" disabled>
                  Service Interested
                </option>
                <option>Toll Management</option>
                <option>Smart Parking Management</option>
                <option>Inventory Management</option>
                <option>Fleet Monitoring</option>
                <option>Personnel Management</option>
                <option>ANPR Monitering</option>
                <option>Plaza Center &amp; Database Server</option>
                <option>RFID Software System</option>
                <option>Number Plate Detection</option>
                <option>Face Attendance System</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <label>
              <span className="sr-only">Message</span>
              <textarea
                placeholder="Message"
                rows={5}
                maxLength={MESSAGE_CHAR_LIMIT}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  border: "2px solid var(--brand-red)",
                  borderRadius: 0,
                  width: "100%",
                  maxWidth: 388,
                  minHeight: 188,
                  padding: "0.9rem",
                  fontSize: "var(--fs-body-xs)",
                }}
              />
            </label>
            <Text size="bodyXs" tone="muted" className="mt-1" style={{ maxWidth: 388 }}>
              {message.length}/{MESSAGE_CHAR_LIMIT} characters
            </Text>
            <button
              type="submit"
              className="self-end mt-6"
              style={{
                width: "min(340px, 100%)",
                height: 68,
                clipPath: parallelogramClipPath(button.slantRatioSubmit, true),
                background: "var(--brand-red)",
                color: "var(--white)",
                fontSize: "var(--fs-subhead)",
                fontWeight: 700,
                paddingLeft: "1.3em",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Frame>
  );
}
