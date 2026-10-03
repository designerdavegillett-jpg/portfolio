"use client";

/* Floating "Get in touch" button plus a modal form. Posts to the Cloudflare
   Pages Function at /api/contact, which emails Dave through Resend.
   Any element with data-contact-open (or a "#contact" link) also opens it. */
import { useEffect, useRef, useState } from "react";
import { MIN_MESSAGE, MAX_MESSAGE, MAX_NAME, validateContact } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = () => {
    if (status === "sent") reset();
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const reset = () => {
    setName(""); setEmail(""); setMessage(""); setWebsite("");
    setTouched({ name: false, email: false, message: false });
    setStatus("idle"); setError("");
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-contact-open], a[href='#contact']");
      if (t) { e.preventDefault(); open(); }
    };
    document.addEventListener("click", onClick);
    if (location.hash === "#contact") open();
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const count = message.trim().length;
  const problem = validateContact({ name, email, message });
  const nameBad = touched.name && !name.trim();
  const emailBad = touched.email && validateContact({ name: "x", email, message: "x".repeat(MIN_MESSAGE) }) !== null;
  const messageShort = touched.message && count < MIN_MESSAGE;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (problem) { setError(problem); return; }
    setStatus("sending"); setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Your message couldn't be sent. Please try again.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Your message couldn't be sent.");
    }
  }

  return (
    <>
      <button type="button" className="contact-fab" onClick={open} aria-haspopup="dialog">
        Get in touch
      </button>

      <dialog
        ref={dialog}
        className="contact-modal"
        aria-labelledby="contact-title"
        onClick={(e) => { if (e.target === dialog.current) close(); }}
      >
        <div className="contact-panel">
          <button type="button" className="contact-close" onClick={close} aria-label="Close">×</button>

          {status === "sent" ? (
            <div className="contact-done" role="status">
              <h2 id="contact-title" className="contact-title">Thanks, message sent.</h2>
              <p>I&apos;ll get back to you at {email.trim()}.</p>
              <button type="button" className="contact-send" onClick={close}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h2 id="contact-title" className="contact-title">Get in touch</h2>
              <p className="contact-sub">Send me a note and I&apos;ll reply by email.</p>

              <label className="contact-field">
                <span>Name</span>
                <input
                  required value={name} maxLength={MAX_NAME} autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  aria-invalid={nameBad}
                />
                {nameBad && <small className="contact-err">Please enter your name.</small>}
              </label>

              <label className="contact-field">
                <span>Email</span>
                <input
                  type="email" required value={email} autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={emailBad}
                />
                {emailBad && <small className="contact-err">Please enter a valid email address.</small>}
              </label>

              <label className="contact-field">
                <span>Message</span>
                <textarea
                  required rows={6} value={message} maxLength={MAX_MESSAGE}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  aria-invalid={messageShort}
                  aria-describedby="contact-count"
                />
                <small id="contact-count" className={`contact-count${messageShort ? " is-short" : ""}`}>
                  {count < MIN_MESSAGE ? `${count} / ${MIN_MESSAGE} characters minimum` : `${count} characters`}
                </small>
              </label>

              {/* Honeypot, hidden from people and screen readers */}
              <input
                className="contact-hp" tabIndex={-1} aria-hidden="true" autoComplete="off"
                name="website" value={website} onChange={(e) => setWebsite(e.target.value)}
              />

              {error && <p className="contact-err" role="alert">{error}</p>}

              <button type="submit" className="contact-send" disabled={!!problem || status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
