import nodemailer from "nodemailer";
import type { NextRequest } from "next/server";

/**
 * POST /api/contact — receives both site forms (the Contact page form and the
 * "Ready to Automate" CTA form) and emails them to the sales inbox over SMTP.
 *
 * All configuration is environment variables (see .env.example) — nothing
 * secret is in the repo. Runs on the Node.js runtime because nodemailer needs
 * raw TCP sockets, which the Edge runtime doesn't have.
 */
export const runtime = "nodejs";

const FIELD_LIMITS = {
  name: 100,
  email: 200,
  phone: 30,
  city: 100,
  company: 150,
  service: 100,
  message: 1000,
} as const;
type Field = keyof typeof FIELD_LIMITS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SEND_FAILED =
  "Sorry, we couldn't send your message right now. Please call or email us directly.";

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status });
}

/**
 * Trim, strip control characters, cap length. Only the message may span
 * several lines; every other field is flattened to one line so a pasted
 * CR/LF can never reach the Subject or any other mail header.
 */
function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  const stripped = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  return (multiline ? stripped : stripped.replace(/[\r\n]+/g, " ")).trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Best-effort per-IP throttle. In-memory, so on a serverless host it only
 * limits within one warm instance — it blunts a simple flood, it isn't a
 * substitute for a CAPTCHA or an edge rate limit (see HANDOFF.md).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  // Port 465 = implicit TLS ("secure"); 587/25 = STARTTLS upgrade. Override
  // with SMTP_SECURE=true|false if your provider differs.
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: a hidden field real visitors never fill. Pretend success so a
  // bot gets no signal that it was caught.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "Too many requests. Please try again in a few minutes." }, 429);
  }

  const data = {} as Record<Field, string>;
  for (const field of Object.keys(FIELD_LIMITS) as Field[]) {
    data[field] = clean(body[field], FIELD_LIMITS[field], field === "message");
  }
  const source = body.source === "cta" ? "Enquiry form (Home / About / Solution pages)" : "Contact page form";

  if (!data.name) return json({ ok: false, error: "Please enter your name." }, 400);
  if (!data.email && !data.phone) {
    return json(
      { ok: false, error: "Please enter an email address or phone number so we can reach you." },
      400
    );
  }
  if (data.email && !EMAIL_RE.test(data.email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const transport = createTransport();
  if (!transport) {
    console.error("[contact] SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return json({ ok: false, error: SEND_FAILED }, 500);
  }

  const to = process.env.MAIL_TO || "sales@networktoll.com";
  // Most providers require From to be the authenticated mailbox, so the
  // visitor's address goes in Reply-To instead — hitting "Reply" goes to them.
  // Some providers (SendGrid, Mailgun...) use a non-email SMTP username, so
  // only use SMTP_USER as the sender when it actually looks like an address.
  const smtpUser = process.env.SMTP_USER ?? "";
  const from =
    process.env.MAIL_FROM || `Network Toll website <${EMAIL_RE.test(smtpUser) ? smtpUser : to}>`;

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["City / State", data.city],
    ["Company", data.company],
    ["Service interested", data.service],
    ["Message", data.message],
  ];
  const filled = rows.filter(([, v]) => v);

  const text = [`New enquiry - ${source}`, "", ...filled.map(([k, v]) => `${k}: ${v}`)].join("\n");
  const html =
    `<p><strong>New enquiry</strong> - ${escapeHtml(source)}</p>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
    filled
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
          `<td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
      )
      .join("") +
    `</table>`;

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Website enquiry from ${data.name}${data.service ? ` - ${data.service}` : ""}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return json({ ok: false, error: SEND_FAILED }, 502);
  }
}
