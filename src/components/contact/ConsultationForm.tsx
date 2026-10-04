"use client";

import { useState } from "react";

/**
 * Consultation enquiry, laid out like the reference: pill fields in pairs,
 * then grouped radio choices on cream panels.
 *
 * Design build — submitting shows a confirmation locally. Nothing is sent
 * anywhere until a form endpoint is connected.
 */
export default function ConsultationForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="grid min-h-[420px] place-items-center rounded-[28px] bg-paper p-10 text-center text-ink">
        <div>
          <p className="font-serif text-[2rem] leading-tight">Thank you.</p>
          <p className="mt-3 max-w-xs text-[14px] text-ink-muted">
            This is a design preview, so nothing was actually sent. Connect a
            form endpoint to start receiving these.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="u-label mt-6 text-[11px] underline underline-offset-4"
          >
            Back to the form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4 text-ink"
    >
      <div className="grid overflow-hidden rounded-full bg-paper sm:grid-cols-2">
        <input
          required
          name="name"
          placeholder="FULL NAME*"
          aria-label="Full name"
          className="u-label border-b border-line bg-transparent px-8 py-5 text-[11px] outline-none placeholder:text-ink/70 focus:bg-paper-alt sm:border-b-0 sm:border-r"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="EMAIL*"
          aria-label="Email"
          className="u-label bg-transparent px-8 py-5 text-[11px] outline-none placeholder:text-ink/70 focus:bg-paper-alt"
        />
      </div>

      <div className="overflow-hidden rounded-full bg-paper">
        <input
          name="phone"
          placeholder="PHONE NUMBER"
          aria-label="Phone number"
          className="u-label w-full bg-transparent px-8 py-5 text-[11px] outline-none placeholder:text-ink/70 focus:bg-paper-alt"
        />
      </div>

      <div className="rounded-[28px] bg-paper px-8 py-7">
        <label htmlFor="brief" className="u-label text-[12px]">
          Tell us about the project
        </label>
        <textarea
          id="brief"
          name="brief"
          rows={4}
          placeholder="Target skin concern, volumes, timeline…"
          className="mt-4 w-full resize-none bg-transparent text-[14px] outline-none placeholder:text-ink-faint"
        />
      </div>

      <button
        type="submit"
        className="u-label w-full rounded-full bg-paper py-5 text-[12px] text-ink transition-colors hover:bg-accent hover:text-paper"
      >
        Send enquiry
      </button>
    </form>
  );
}
