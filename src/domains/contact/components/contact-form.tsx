"use client";

import type { FormEvent } from "react";

type ContactFormProps = {
  recipient: string;
};

export function ContactForm({ recipient }: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const subject = project ? `Project inquiry: ${project}` : "Project inquiry";
    const body = [`Name: ${name}`, `Reply email: ${email}`, "", message].join(
      "\n",
    );

    window.location.assign(
      `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          required
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">Your email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="contact-field contact-field-wide">
        <label htmlFor="contact-project">What are we capturing?</label>
        <input
          id="contact-project"
          name="project"
          type="text"
          placeholder="Game day, campaign, event…"
          required
        />
      </div>

      <div className="contact-field contact-field-wide">
        <label htmlFor="contact-message">Tell me about it</label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Share the date, location, and what you need."
          required
        />
      </div>

      <div className="contact-form-action">
        <p>Your email app will open with your message ready to send.</p>
        <button type="submit">
          Start the conversation
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </form>
  );
}
