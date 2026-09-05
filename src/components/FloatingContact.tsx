import { companyInfo } from "@/lib/data";

/**
 * Fixed WhatsApp chat + phone call buttons, shown on every page (mounted
 * once in the root layout). Both use companyInfo.phone/whatsapp so the
 * number only needs to change in one place. Kept circular with brand-
 * recognizable colors (WhatsApp green, site red) rather than the sharp
 * 0-radius shapes used elsewhere — this is a new, universally-recognized
 * UI convention layered on top of the cloned design, not a measured
 * element from the source PDF.
 *
 * A slow pulse ring + a text label that slides out on hover/focus make the
 * pair legible at a glance rather than relying on a first-time visitor to
 * guess two bare icons — the native `title` tooltip is too slow/subtle to
 * carry that on its own.
 */
export default function FloatingContact() {
  const callHref = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${companyInfo.whatsapp}`;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-4">
      <style>{`
        .floating-contact-btn {
          position: relative;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .floating-contact-btn:hover,
        .floating-contact-btn:focus-visible {
          transform: scale(1.1);
        }
        .floating-contact-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          box-shadow: 0 0 0 0 currentColor;
          opacity: 0.55;
          animation: floating-contact-pulse 2.4s ease-out infinite;
          pointer-events: none;
        }
        .floating-contact-btn--whatsapp::before {
          animation-delay: 1.2s;
        }
        @keyframes floating-contact-pulse {
          0% { box-shadow: 0 0 0 0 currentColor; opacity: 0.55; }
          70% { box-shadow: 0 0 0 16px currentColor; opacity: 0; }
          100% { box-shadow: 0 0 0 16px currentColor; opacity: 0; }
        }
        .floating-contact-label {
          max-width: 0;
          opacity: 0;
          white-space: nowrap;
          overflow: hidden;
          transition: max-width 0.25s ease, opacity 0.2s ease, padding 0.25s ease;
        }
        .floating-contact-btn:hover + .floating-contact-label,
        .floating-contact-btn:focus-visible + .floating-contact-label {
          max-width: 160px;
          opacity: 1;
          padding-inline: 14px;
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-contact-btn::before { animation: none; }
        }
      `}</style>

      <div className="flex items-center flex-row-reverse">
        <a
          href={callHref}
          aria-label={`Call us at ${companyInfo.phone}`}
          title={`Call us at ${companyInfo.phone}`}
          className="floating-contact-btn flex items-center justify-center rounded-full"
          style={{
            width: 58,
            height: 58,
            background: "linear-gradient(145deg, var(--brand-red), #b3141f)",
            color: "var(--brand-red)",
            boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
            border: "2px solid rgba(255,255,255,0.85)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <div
          className="floating-contact-label flex items-center h-9 rounded-full text-sm font-semibold"
          style={{ background: "#ffffff", color: "var(--text-primary)", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
        >
          Call Us
        </div>
      </div>

      <div className="flex items-center flex-row-reverse">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
          className="floating-contact-btn floating-contact-btn--whatsapp flex items-center justify-center rounded-full"
          style={{
            width: 58,
            height: 58,
            background: "linear-gradient(145deg, #2fe375, #1fa855)",
            color: "#25D366",
            boxShadow: "0 8px 22px rgba(0,0,0,0.35)",
            border: "2px solid rgba(255,255,255,0.85)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
            <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 1.998.58 3.86 1.583 5.428L2 22l4.696-1.539A9.955 9.955 0 0 0 12.004 22C17.522 22 22 17.514 22 12.004 22 6.486 17.522 2 12.004 2zm0 18.06a8.03 8.03 0 0 1-4.32-1.267l-.31-.185-2.786.913.923-2.717-.202-.31A8.02 8.02 0 1 1 20.02 12.004 8.03 8.03 0 0 1 12.004 20.06z" />
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
        </a>
        <div
          className="floating-contact-label flex items-center h-9 rounded-full text-sm font-semibold"
          style={{ background: "#ffffff", color: "var(--text-primary)", boxShadow: "0 4px 14px rgba(0,0,0,0.18)" }}
        >
          Chat on WhatsApp
        </div>
      </div>
    </div>
  );
}
