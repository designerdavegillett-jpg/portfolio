/* Cloudflare Pages Function: POST /api/contact
   Wrangler compiles this folder alongside the static export on every deploy.
   Sends the message to Dave through Resend. Needs the secret RESEND_API_KEY on
   the nifli-portfolio Pages project. Optional vars: CONTACT_TO, CONTACT_FROM. */
import { validateContact, type ContactInput } from "../../lib/contact";

type Env = { RESEND_API_KEY?: string; CONTACT_TO?: string; CONTACT_FROM?: string };
type Ctx = { request: Request; env: Env };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  let data: ContactInput & { website?: string };
  try {
    data = await request.json();
  } catch {
    return json(400, { error: "Bad request." });
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (data.website) return json(200, { ok: true });

  const problem = validateContact(data);
  if (problem) return json(400, { error: problem });

  if (!env.RESEND_API_KEY) return json(500, { error: "The form isn't set up yet." });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const country = request.headers.get("cf-ipcountry") ?? "";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [env.CONTACT_TO || "designerdavegillett@gmail.com"],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>\nSent from portfolio.nifli.design (${country} ${ip})`,
    }),
  });

  if (!res.ok) return json(502, { error: "Your message couldn't be sent. Please try again." });
  return json(200, { ok: true });
};

export const onRequest = async (): Promise<Response> => json(405, { error: "Method not allowed." });
