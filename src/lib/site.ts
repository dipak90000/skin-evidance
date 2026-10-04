export const SITE = {
  name: "SKIN EVIDANCE",
  tagline: "EVIDENCE-LED SKINCARE",
  announcements: [
    "Experience Pro-Level Treatment Results with Skin Evidance",
    "YOU'RE SHOPPING THE OFFICIAL SKIN EVIDANCE STORE",
    "Free US Shipping on Orders Over $80",
    "Share Your Valuable Review and Enjoy $4 Off",
  ],
} as const;

export type NavLink = { label: string; href: string; accent?: boolean };

export const NAV: NavLink[] = [
  { label: "SHOP ALL", href: "/collections/all" },
  { label: "BEST SELLERS", href: "/collections/best-sellers" },
  { label: "FIND YOUR ROUTINE", href: "/pages/routine" },
  { label: "ABOUT US", href: "/pages/about" },
  { label: "CONTACT US", href: "/pages/contact" },
];

/** Hero frame sequence extracted from the brand animation. */
export const HERO_FRAMES = {
  count: 120,
  desktop: (i: number) =>
    `/hero/desktop/f_${String(i + 1).padStart(3, "0")}.webp`,
  mobile: (i: number) => `/hero/mobile/f_${String(i + 1).padStart(3, "0")}.webp`,
} as const;
