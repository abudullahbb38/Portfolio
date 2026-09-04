"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) form.reset();
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Name<input required name="name" placeholder="Your name" /></label>
      <label>Email<input required type="email" name="email" placeholder="you@company.com" /></label>
      <label>Message<textarea required name="message" rows={4} placeholder="Tell me what you're building..." /></label>
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : status === "sent" ? "Message sent" : "Send message"}
        <span aria-hidden="true">↗</span>
      </button>
      {status === "error" && <p className="form-note error">Please complete every field and try again.</p>}
      {status === "sent" && <p className="form-note">Thanks. I&apos;ll be in touch shortly.</p>}
    </form>
  );
}
