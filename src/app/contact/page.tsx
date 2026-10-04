import type { Metadata } from "next";
import ConsultationForm from "@/components/contact/ConsultationForm";
import ScientistProfile from "@/components/contact/ScientistProfile";
import { CONTACT_EMAIL } from "@/lib/team";

export const metadata: Metadata = {
  title: "Get in Touch — Skin Evidance",
  description:
    "Talk to the team behind the formulas. Consultation requests go straight to our R&D lead.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-charcoal text-paper">
      {/* Marquee, as on the reference */}
      <div className="overflow-hidden border-b border-paper/10 py-5">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16 whitespace-nowrap">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="u-label text-[13px] text-paper/70">
              Contact Us
            </span>
          ))}
        </div>
      </div>

      <div className="u-container py-16 lg:py-24">
        <header className="max-w-2xl">
          <h1 className="font-serif text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.95]">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/70">
            Tell us what you are working on. Formulation questions go straight
            to our R&amp;D lead rather than a support queue.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-block font-serif text-[clamp(1.3rem,3vw,2rem)] underline-offset-[6px] transition-colors hover:text-paper/70 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </header>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <ConsultationForm />
          <ScientistProfile />
        </div>
      </div>
    </main>
  );
}
