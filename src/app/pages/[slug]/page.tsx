import { notFound } from "next/navigation";
import Link from "next/link";
import { COLLECTIONS } from "@/lib/products";

type Content = { title: string; intro: string; body: string[] };

const PAGES: Record<string, Content> = {
  about: {
    title: "About Us",
    intro: "Evidence-led skincare, built on actives that earn their place.",
    body: [
      "Skin Evidance started from a simple frustration: most skincare asks you to take its word for it. Claims outrun the data, concentrations go unpublished, and the part that actually works is buried behind the part that markets well.",
      "We formulate the other way round. Every product starts with an active that has published evidence behind it, at a concentration that reflects the studies rather than a label-friendly trace. What goes on the front of the bottle is what is doing the work.",
      "Everything is dermatologist tested and made in small batches, so a formula can be corrected rather than defended.",
    ],
  },
  routine: {
    title: "Find Your Routine",
    intro: "Start with the concern, not the product.",
    body: [
      "Pick the line that matches what you actually want to change. Each one is built as a sequence, so the products layer without pilling or cancelling each other out.",
      "If you are new to actives, start with one and give it eight weeks before adding another. Most routines fail because too much changed at once.",
    ],
  },
  shipping: {
    title: "Shipping & Returns",
    intro: "Free US shipping on orders over $80.",
    body: [
      "Orders ship within two working days. Standard delivery is three to five working days; expedited options are shown at checkout.",
      "If a product does not suit your skin, return it within 60 days — opened or not — for a full refund.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const page = PAGES[slug];
  return { title: page ? `${page.title} — Skin Evidance` : "Skin Evidance" };
}

export default async function ContentPage({
  params,
}: PageProps<"/pages/[slug]">) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <main className="flex-1">
      <header className="bg-paper-alt py-16 lg:py-24">
        <div className="u-container max-w-3xl">
          <h1 className="text-[clamp(2rem,5vw,3.4rem)] font-light tracking-tight">
            {page.title}
          </h1>
          <p className="mt-4 font-serif text-[clamp(1.1rem,2vw,1.4rem)] italic text-ink-muted">
            {page.intro}
          </p>
        </div>
      </header>

      <section className="py-14">
        <div className="u-container max-w-3xl space-y-5">
          {page.body.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-ink-muted">
              {p}
            </p>
          ))}

          {slug === "routine" && (
            <ul className="!mt-10 grid gap-3 sm:grid-cols-2">
              {COLLECTIONS.map((c) => (
                <li key={c.handle}>
                  <Link
                    href={`/collections/${c.handle}`}
                    className="flex items-center justify-between border border-line p-5 transition-colors hover:border-ink"
                  >
                    <span>
                      <span className="block text-[15px]">{c.title}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-muted">
                        {c.concern}
                      </span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
