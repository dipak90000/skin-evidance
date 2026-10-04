import { REVIEWS } from "@/lib/products";

/** Customer reviews, as on the reference homepage. */
export default function Reviews() {
  return (
    <section className="bg-paper-alt py-16 lg:py-24">
      <div className="u-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight">
            What people say
            <br />
            <span className="font-serif italic">after eight weeks</span>
          </h2>
          <p className="text-[13px] text-ink-muted">
            <span className="text-accent" aria-hidden="true">★★★★★</span>{" "}
            4.8 average from 1,842 verified reviews
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <li key={r.name} className="flex flex-col bg-paper p-7">
              <span className="text-accent" aria-hidden="true">
                {"★".repeat(r.rating)}
                <span className="text-ink-faint">{"★".repeat(5 - r.rating)}</span>
              </span>
              <p className="mt-4 text-[15px] font-medium">{r.title}</p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-muted">
                “{r.body}”
              </p>
              <p className="mt-6 border-t border-line pt-4 text-[12px] text-ink-muted">
                <span className="text-ink">{r.name}</span> · {r.location}
                <br />
                <span className="text-ink-faint">on {r.product}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
