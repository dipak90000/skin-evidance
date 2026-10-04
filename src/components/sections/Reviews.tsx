import { WAITLIST_NOTES } from "@/lib/products";

/**
 * Early interest, not reviews.
 *
 * Nothing has shipped, so there is nothing to rate. These are people on the
 * waitlist saying why they signed up — no stars, no results, no invented
 * average, because any of those would be a claim the brand cannot stand
 * behind yet.
 */
export default function Reviews() {
  return (
    <section className="bg-paper-alt py-16 lg:py-24">
      <div className="u-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight">
            People are already
            <br />
            <span className="font-serif italic">waiting on these</span>
          </h2>
          <p className="max-w-xs text-[13px] leading-relaxed text-ink-muted">
            From the waitlist. Nothing has shipped yet, so there is nothing to
            rate — just why they signed up.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WAITLIST_NOTES.slice(0, 3).map((note) => (
            <li key={note.name} className="flex flex-col bg-paper p-7">
              <span className="u-label text-[10px] text-accent">
                Waiting for {note.waitingFor}
              </span>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-muted">
                “{note.body}”
              </p>
              <p className="mt-6 border-t border-line pt-4 text-[12px] text-ink-muted">
                <span className="text-ink">{note.name}</span> · {note.location}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[12px] text-ink-faint">
          Want to be told first?{" "}
          <a href="/contact" className="text-ink underline underline-offset-4">
            Join the list
          </a>
          .
        </p>
      </div>
    </section>
  );
}
