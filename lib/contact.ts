/* Shared rules for the contact form. Used by the modal (components/ContactModal)
   and the Cloudflare Pages Function that sends the email (functions/api/contact.ts),
   so the browser and the server always agree on what is valid. */
export const MIN_MESSAGE = 50;
export const MAX_MESSAGE = 5000;
export const MAX_NAME = 120;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactInput = { name?: string; email?: string; message?: string };

export function validateContact(input: ContactInput): string | null {
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();
  const name = (input.name ?? "").trim();
  if (!name) return "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 254) return "Please enter a valid email address.";
  if (message.length < MIN_MESSAGE) return `Your message needs at least ${MIN_MESSAGE} characters.`;
  if (message.length > MAX_MESSAGE) return `Please keep your message under ${MAX_MESSAGE} characters.`;
  if (name.length > MAX_NAME) return "That name is too long.";
  return null;
}
