export type EnquiryFields = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  company?: string;
  service?: string;
  message?: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * POSTs a form to /api/contact (which emails it to the sales inbox). The
 * honeypot value is forwarded so the server can run its own check — the
 * client-side guard in useBotGuard is only a first filter.
 */
export async function submitEnquiry(
  fields: EnquiryFields,
  extra: { source: "contact" | "cta"; honeypot: string }
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, source: extra.source, company_website: extra.honeypot }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok) return { ok: true };
    return { ok: false, error: data?.error ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
