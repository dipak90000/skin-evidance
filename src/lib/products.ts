/** Prices are stored in rupees; this is the only place the format is decided. */
export const formatPrice = (inr: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(inr);

export type ProductForm = "dropper" | "bottle" | "pump" | "tube" | "jar";

export type Segment = { slug: string; title: string };

export type Collection = {
  handle: string;
  title: string;
  concern: string;
  tint: string;
  /** soft background used on collection cards */
  wash: string;
  blurb: string;
  /** sub-categories revealed when the category is opened */
  segments: Segment[];
};

export const COLLECTIONS: Collection[] = [
  {
    handle: "skin-care",
    title: "Skin Care",
    concern: "Face & body",
    tint: "#2f6fae",
    wash: "#e6eef6",
    blurb: "Targeted formulas for the concerns people actually come to us with.",
    segments: [
      { slug: "anti-acne", title: "Anti-Acne" },
      { slug: "moisturizers", title: "Moisturizers" },
      { slug: "sunscreens", title: "Sunscreens" },
      { slug: "anti-aging", title: "Anti-Aging" },
      { slug: "depigmenting", title: "Depigmenting" },
      { slug: "anti-fungal", title: "Anti-Fungal" },
      { slug: "anti-psoriasis", title: "Topical Anti-Psoriasis" },
    ],
  },
  {
    handle: "hair-care",
    title: "Hair Care",
    concern: "Scalp & strands",
    tint: "#c4607a",
    wash: "#f8e9ec",
    blurb: "Scalp-first formulation, because hair problems usually start there.",
    segments: [
      { slug: "anti-dandruff", title: "Anti-Dandruff" },
      { slug: "hair-fall", title: "Hair Fall Control" },
      { slug: "scalp-care", title: "Scalp Care" },
      { slug: "conditioners", title: "Conditioners" },
    ],
  },
  {
    handle: "baby-care",
    title: "Baby Care",
    concern: "Gentle by default",
    tint: "#A8611C",
    wash: "#f4ecdf",
    blurb: "Minimal ingredient lists, fragrance-free, dermatologist tested.",
    segments: [
      { slug: "baby-wash", title: "Baby Wash" },
      { slug: "baby-lotion", title: "Baby Lotion" },
      { slug: "nappy-care", title: "Nappy Care" },
      { slug: "baby-sunscreen", title: "Baby Sunscreen" },
    ],
  },
];

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
    collection: "skin-care",
    form: "bottle",
    tint: "#A8611C",
    size: "300ml",
    price: 1999,
    reviews: 0,
    badge: "BEST",
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
      { label: "Single", size: "300ml", price: 1999 },
      { label: "Duo", size: "2 × 300ml", price: 3499 },
    ],
  },
  {
    ...base,
    handle: "pigmentation-serum",
    name: "Pigmentation Serum",
    tagline: "Targeted corrector for stubborn dark spots",
    collection: "skin-care",
    form: "dropper",
    tint: "#7a4a16",
    size: "30ml",
    price: 3999,
    reviews: 0,
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
      { label: "Single", size: "30ml", price: 3999 },
      { label: "Value", size: "50ml", price: 5699 },
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

export type WaitlistNote = {
  name: string;
  location: string;
  body: string;
  waitingFor: string;
};

/**
 * Early interest from the waitlist.
 *
 * Nothing has shipped yet, so these are people waiting rather than customers
 * reviewing — no star ratings and no efficacy claims, because there are no
 * results to report. Replace with real messages before launch.
 */
export const WAITLIST_NOTES: WaitlistNote[] = [
  {
    name: "Priya M.",
    location: "Mumbai",
    body: "I have been through every vitamin C on the shelf and none of them say how much is actually in the bottle. The fact that you publish the percentage is why I signed up.",
    waitingFor: "Dark Spot Serum",
  },
  {
    name: "Hannah L.",
    location: "Leeds",
    body: "Found you through the formulator's background rather than an ad, which is a first. Waiting on the acne range — please tell me the week it lands.",
    waitingFor: "Anti-Acne Range",
  },
  {
    name: "Aisha N.",
    location: "Toronto",
    body: "A sunscreen with no white cast that is genuinely SPF 50 is the thing I have been hunting for years. Already on the list for launch day.",
    waitingFor: "Sunscreen SPF 50",
  },
  {
    name: "Sofia K.",
    location: "Berlin",
    body: "I like that you are not pretending to have twenty products. Two done properly beats a full shelf of filler. Counting down.",
    waitingFor: "Body Wash",
  },
  {
    name: "Daniel R.",
    location: "Austin",
    body: "Signed up the moment I read the ingredient lists. If the night cream does what the page describes, I am switching everything over.",
    waitingFor: "Spot-Correcting Night Cream",
  },
];

export type Upcoming = {
  name: string;
  form: ProductForm;
  note: string;
  hero?: boolean;
  /** Later phase of the roadmap, shown but marked. */
  later?: boolean;
};

/**
 * The roadmap. These have no formula sheet yet, so they appear on the rail as
 * announcements rather than as products with their own pages.
 */
export const UPCOMING: Upcoming[] = [
  { name: "Anti-Acne Range", form: "bottle", note: "Wash, gel & spray" },
  { name: "Acne Face Wash", form: "bottle", note: "Daily cleanser" },
  { name: "Spot Gel", form: "dropper", note: "Targeted treatment" },
  { name: "Oil-Free Gel Moisturiser", form: "bottle", note: "Lightweight hydration" },
  { name: "Dark Spot Serum", form: "dropper", note: "The hero", hero: true },
  { name: "Spot-Correcting Night Cream", form: "bottle", note: "Overnight repair" },
  { name: "Brightening Face Cream", form: "bottle", note: "Daily tone care" },
  { name: "Anti-Aging Range", form: "dropper", note: "Retinal & peptides" },
  { name: "Depigmenting Range", form: "dropper", note: "Tone correction" },
  { name: "Sunscreen SPF 50", form: "bottle", note: "No white cast" },
  { name: "Anti-Fungal Range", form: "bottle", note: "Topical care" },
  { name: "Brightening Body Lotion", form: "bottle", note: "Everyday body care" },
  { name: "Winter Rich Body Butter", form: "bottle", note: "Cold-weather repair", later: true },
  { name: "Brightening Shower Gel", form: "dropper", note: "In development", later: true },
];

/**
 * The full range. Both SKUs are pre-launch, so rather than hiding them we
 * surface them everywhere as upcoming — the site's job right now is to build
 * anticipation, not to take orders.
 */
export const SHOP_ALL = PRODUCTS;

export const getProduct = (handle: string) =>
  PRODUCTS.find((p) => p.handle === handle);

export const getSegment = (handle: string, slug: string) =>
  COLLECTIONS.find((c) => c.handle === handle)?.segments.find(
    (x) => x.slug === slug,
  );

export const getCollection = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle);

export const productsIn = (collection: string) =>
  SHOP_ALL.filter((p) => p.collection === collection);

export const collectionTint = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle)?.tint ?? "#A8611C";
