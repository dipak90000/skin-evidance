/* eslint-disable @next/next/no-img-element --
   One fixed 640x640 portrait, already optimised and sized. */

import { CONTACT_EMAIL, LEAD_SCIENTIST as S } from "@/lib/team";

/** Who actually formulates the products, shown beside the enquiry form. */
export default function ScientistProfile() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="flex flex-col items-center text-center">
        <img
          src={S.photo}
          alt={S.name}
          width={640}
          height={640}
          className="h-40 w-40 rounded-full object-cover ring-1 ring-paper/20"
        />
        <h2 className="mt-6 font-serif text-[1.9rem] leading-tight">{S.name}</h2>
        <p className="mt-2 text-[13px] text-paper/70">{S.role}</p>
        <p className="mt-1 text-[12px] text-paper/50">{S.location}</p>
      </div>

      <p className="mt-7 text-[14px] leading-relaxed text-paper/75">{S.intro}</p>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-paper/15 py-6">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.1em] text-paper/50">
            Formulating since
          </dt>
          <dd className="mt-1 font-serif text-[1.7rem] leading-none">
            {S.since}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.1em] text-paper/50">
            Years in R&amp;D
          </dt>
          <dd className="mt-1 font-serif text-[1.7rem] leading-none">8+</dd>
        </div>
      </dl>

      <section className="mt-7">
        <h3 className="u-label text-[11px] text-paper/50">Qualifications</h3>
        <ul className="mt-4 space-y-4">
          {S.credentials.map((c) => (
            <li key={c.title}>
              <p className="text-[14px]">{c.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-paper/55">
                {c.detail}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h3 className="u-label text-[11px] text-paper/50">Expertise</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {S.expertise.map((e) => (
            <li
              key={e}
              className="rounded-full border border-paper/20 px-3 py-1.5 text-[12px] text-paper/80"
            >
              {e}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h3 className="u-label text-[11px] text-paper/50">Experience</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-paper/70">
          {S.experienceSummary}
        </p>
      </section>

      <section className="mt-8 border-t border-paper/15 pt-6">
        <h3 className="u-label text-[11px] text-paper/50">Email us</h3>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2 block font-serif text-[1.35rem] underline-offset-4 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </section>

      <section className="mt-8">
        <h3 className="u-label text-[11px] text-paper/50">
          Formulated for
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-paper/70">
          {S.brands.join(" · ")}
        </p>
      </section>
    </aside>
  );
}
