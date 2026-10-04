/**
 * Team profiles shown on the public site.
 *
 * Drawn from the supplied CV. Personal mobile numbers and private email
 * addresses are deliberately left out — public pages get brand contact routes
 * instead. Add them only with the person's explicit consent.
 */
export const CONTACT_EMAIL = "admin@theskinevidence.com";

export const LEAD_SCIENTIST = {
  name: "Naresh Pagi",
  role: "Research Scientist Manager — Cosmetic R&D",
  photo: "/team/naresh-pagi.webp",
  location: "Vadodara, Gujarat, India",
  since: 2018,
  intro:
    "Every Skin Evidance formula is developed and signed off by Naresh. He takes a product from literature review and ingredient science through formulation, stability testing and scale-up — so what reaches the bottle is what was tested in the lab.",
  credentials: [
    {
      title: "Dual MBA — Germany & UK",
      detail:
        "IU International University of Applied Sciences (Germany) and London South Bank University (UK)",
    },
    {
      title: "MSc Organic Chemistry",
      detail: "Gujarat University, India",
    },
    {
      title: "BSc Chemistry",
      detail: "Gujarat University, India",
    },
  ],
  expertise: [
    "Formulation development",
    "Ingredient science & literature review",
    "Stability studies",
    "Lab-to-production scale-up",
    "MFR & batch documentation",
    "Claim substantiation",
  ],
  experienceSummary:
    "8+ years in cosmetic R&D across multiple organisations, from lab-scale formulation through to commercial production.",
  brands: [
    "Lupin India (baby care)",
    "Reliance Cosmetics",
    "Myntra cosmetic range",
    "Fabindia",
    "Blush Bees",
  ],
} as const;
