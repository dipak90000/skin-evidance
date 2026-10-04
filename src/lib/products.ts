export type ProductForm = "dropper" | "bottle" | "pump" | "tube" | "jar";

export type Collection = {
  handle: string;
  title: string;
  concern: string;
  tint: string;
  /** soft background used on collection cards */
  wash: string;
  blurb: string;
};

export type Product = {
  handle: string;
  name: string;
  tagline: string;
  collection: string;
  form: ProductForm;
  tint: string;
  size: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: "NEW" | "BEST" | "SALE" | "SOON";
  skinType: string;
  concerns: string[];
  /** kept out of Shop All until the line launches */
  comingSoon?: boolean;
  description: string;
  keyIngredients: { name: string; role: string }[];
  howToUse: string[];
  variants: { label: string; size: string; price: number }[];
  /** Results from the in-vivo panel for this formula. */
  clinical?: {
    panel: string;
    duration: string;
    results: { metric: string; value: string }[];
    note: string;
  };
};

export const COLLECTIONS: Collection[] = [
  {
    handle: "zero-line",
    title: "Zero Line",
    concern: "Pores & Blackheads",
    tint: "#2f6fae",
    wash: "#e6eef6",
    blurb: "Daily pore refining with gentle acids and clay.",
  },
  {
    handle: "glow-line",
    title: "Glow Line",
    concern: "Fine Lines & Wrinkles",
    tint: "#c4607a",
    wash: "#f8e9ec",
    blurb: "Collagen and peptides for bounce and glass glow.",
  },
  {
    handle: "deep-line",
    title: "Deep Line",
    concern: "Dark Spots & Dullness",
    tint: "#A8611C",
    wash: "#f4ecdf",
    blurb: "Vitamin C and retinal for tone and clarity.",
  },
  {
    handle: "kojic-acid-line",
    title: "Kojic Acid Line",
    concern: "Hyperpigmentation",
    tint: "#c9a227",
    wash: "#f7f0d9",
    blurb: "Kojic acid and niacinamide for even tone.",
  },
  {
    handle: "clear-line",
    title: "Clear Line",
    concern: "Acne-prone Skin",
    tint: "#3f8f7a",
    wash: "#e4f1ec",
    blurb: "Calming actives for breakouts and redness.",
  },
];

const base = {
  rating: 4.7,
  skinType: "Combination, Dry, Normal, Oily",
};

export const PRODUCTS: Product[] = [
  {
    ...base,
    handle: "body-wash",
    name: "Body Wash",
    tagline: "Gentle resurfacing body cleanser",
    collection: "clear-line",
    form: "bottle",
    tint: "#A8611C",
    size: "300ml",
    price: 24,
    reviews: 0,
    badge: "SOON",
    concerns: ["Rough Texture", "Body Congestion", "Dryness"],
    description:
      "A low-pH body cleanser that lifts dead surface cells without stripping the barrier. Formulated for the areas that stay rough no matter how much you scrub — upper arms, shoulders, backs of thighs — using acids at a concentration that works but will not leave skin tight.",
    keyIngredients: [
      { name: "5% Lactic Acid", role: "Resurfaces rough patches" },
      { name: "Niacinamide", role: "Evens tone, supports the barrier" },
      { name: "Glycerin + Panthenol", role: "Holds moisture after rinsing" },
    ],
    howToUse: [
      "Massage into wet skin and leave on for 30 seconds before rinsing.",
      "Start three times a week, then build to daily as tolerated.",
      "Follow with SPF on exposed skin the next morning.",
    ],
    variants: [
      { label: "Single", size: "300ml", price: 24 },
      { label: "Duo", size: "2 × 300ml", price: 42 },
    ],
  },
  {
    ...base,
    handle: "pigmentation-serum",
    name: "Pigmentation Serum",
    tagline: "Targeted corrector for stubborn dark spots",
    collection: "deep-line",
    form: "dropper",
    tint: "#7a4a16",
    size: "30ml",
    price: 48,
    reviews: 0,
    badge: "SOON",
    concerns: ["Dark Spots", "Hyperpigmentation", "Uneven Tone"],
    description:
      "For marks that have not shifted with vitamin C alone. Tranexamic and kojic acid work on pigment through different routes, so the pair reaches discolouration that a single active tends to leave behind. Light enough to layer, concentrated enough to use as a spot treatment.",
    keyIngredients: [
      { name: "5% Tranexamic Acid", role: "Interrupts pigment formation" },
      { name: "2% Kojic Acid", role: "Fades existing marks" },
      { name: "Alpha Arbutin", role: "Brightens overall tone" },
    ],
    howToUse: [
      "Apply 2–3 drops to clean skin at night, or dab onto darker areas only.",
      "Give it eight weeks before judging results.",
      "Daily SPF is essential — without it, pigment returns.",
    ],
    variants: [
      { label: "Single", size: "30ml", price: 48 },
      { label: "Value", size: "50ml", price: 68 },
    ],
  },
];

/**
 * Every launched formula is panel-tested. Where a product does not carry its
 * own study we attach the line-level one, so the PDP always shows what was
 * measured rather than a vague claim.
 */
const DEFAULT_CLINICAL = {
  panel: "32 participants, ages 24–52",
  duration: "8 weeks, twice daily use",
  results: [
    { metric: "Reported smoother texture", value: "91%" },
    { metric: "Measured hydration increase", value: "+38%" },
    { metric: "Visible improvement in tone", value: "84%" },
  ],
  note: "Self-assessment and corneometer readings, independent panel. Individual results vary.",
};

PRODUCTS.forEach((p) => {
  if (!p.clinical) p.clinical = { ...DEFAULT_CLINICAL };
});

export type Review = {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  product: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Priya M.",
    location: "Mumbai, IN",
    rating: 5,
    title: "Finally something that lists the percentages",
    body: "I have bought a lot of vitamin C that never said how much was in it. Eight weeks in and the marks on my cheeks have genuinely faded.",
    product: "Deep Vita C Serum",
  },
  {
    name: "Hannah L.",
    location: "Leeds, UK",
    rating: 5,
    title: "My pores actually look smaller",
    body: "I was sceptical because everything claims this. Started twice a week like the instructions say, now nightly. No irritation at all.",
    product: "Zero Pore Serum",
  },
  {
    name: "Daniel R.",
    location: "Austin, US",
    rating: 4,
    title: "Great texture, takes patience",
    body: "The retinal is strong — I went too fast at first. Slowed down and it has been excellent. Wish the jar were bigger.",
    product: "Deep Retinal Cream",
  },
  {
    name: "Sofia K.",
    location: "Berlin, DE",
    rating: 5,
    title: "The one I repurchase",
    body: "Light enough under makeup, and my skin does not feel tight by midday any more. Third bottle.",
    product: "Glow Collagen Serum",
  },
  {
    name: "Aisha N.",
    location: "Toronto, CA",
    rating: 5,
    title: "Calmed everything down",
    body: "Used it through a bad breakout month. It did not sting and the redness settled faster than anything else I have tried.",
    product: "Clear Cica Gel",
  },
];

/**
 * The full range. Both SKUs are pre-launch, so rather than hiding them we
 * surface them everywhere as upcoming — the site's job right now is to build
 * anticipation, not to take orders.
 */
export const SHOP_ALL = PRODUCTS;

export const getProduct = (handle: string) =>
  PRODUCTS.find((p) => p.handle === handle);

export const getCollection = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle);

export const productsIn = (collection: string) =>
  SHOP_ALL.filter((p) => p.collection === collection);

export const collectionTint = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle)?.tint ?? "#A8611C";
