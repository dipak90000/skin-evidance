import Link from "next/link";
import { COLLECTIONS } from "@/lib/products";
import { SITE } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/team";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-alt">
      <div className="u-container grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="u-label text-[11px]">10% off sitewide for subscribers</p>
          <p className="mt-3 max-w-sm text-[13px] text-ink-muted">
            Subscribe for new arrivals, offers and formulation notes.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-[14px] underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <form className="mt-5 flex max-w-sm border-b border-ink">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 bg-transparent py-3 text-[13px] outline-none placeholder:text-ink-faint"
            />
            <button type="submit" className="u-label text-[11px]">
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <p className="u-label text-[11px]">Shop</p>
          <ul className="mt-4 space-y-2 text-[13px] text-ink-muted">
            <li><Link href="/collections/all" className="hover:text-ink">All Products</Link></li>
            <li><Link href="/collections/best-sellers" className="hover:text-ink">Bestsellers</Link></li>
            {COLLECTIONS.slice(0, 4).map((c) => (
              <li key={c.handle}>
                <Link href={`/collections/${c.handle}`} className="hover:text-ink">{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="u-label text-[11px]">Information</p>
          <ul className="mt-4 space-y-2 text-[13px] text-ink-muted">
            <li><Link href="/pages/about" className="hover:text-ink">About Us</Link></li>
            <li><Link href="/pages/routine" className="hover:text-ink">Find Your Routine</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact Us</Link></li>
            <li><Link href="/pages/shipping" className="hover:text-ink">Shipping &amp; Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="u-container flex flex-col gap-2 py-6 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>Terms of Service · Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
