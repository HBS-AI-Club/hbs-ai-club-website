"use client";

import type { FormEvent } from "react";

const INPUT_CLASS =
  "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-crimson";

export function SponsorshipInquiry() {
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const organization = String(data.get("organization") || "");
    const interest = String(data.get("interest") || "");
    const note = String(data.get("note") || "");
    const subject = `HBS AI Club partnership — ${organization || "introduction"}`;
    const body = [
      `Hi HBS AI Club team,`,
      "",
      `I'm ${name} from ${organization}.`,
      `I'm interested in: ${interest}.`,
      note ? `\nA little more context:\n${note}` : "",
      "",
      `Best way to reach me: ${email}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:ai@studentclubs.hbs.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={prepareEmail} className="hairline-card rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink-soft">
          Your name
          <input name="name" required autoComplete="name" className={INPUT_CLASS} />
        </label>
        <label className="text-sm font-medium text-ink-soft">
          Work email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={INPUT_CLASS}
          />
        </label>
        <label className="text-sm font-medium text-ink-soft">
          Organization
          <input
            name="organization"
            required
            autoComplete="organization"
            className={INPUT_CLASS}
          />
        </label>
        <label className="text-sm font-medium text-ink-soft">
          Partnership interest
          <select name="interest" required className={INPUT_CLASS} defaultValue="">
            <option value="" disabled>
              Select a format
            </option>
            <option>Learning partner</option>
            <option>Conversation partner</option>
            <option>Community partner</option>
            <option>Not sure yet</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-ink-soft">
        What should students understand about your work?
        <textarea
          name="note"
          rows={4}
          placeholder="A short note is plenty."
          className={`${INPUT_CLASS} resize-y`}
        />
      </label>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-md text-xs leading-relaxed text-muted">
          This prepares an email in your default mail app so you can review it
          before sending.
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-crimson-dark"
        >
          Prepare introduction
        </button>
      </div>
    </form>
  );
}
