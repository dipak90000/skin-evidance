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
  badge?: "NEW" | "BEST" | "SALE";
  skinType: string;
  concerns: string[];
  /** kept out of Shop All until the line launches */
  comingSoon?: boolean;
  description: string;
  keyIngredients: { name: string; role: string }[];
  howToUse: string[];
  variants: { label: string; size: string; price: number }[];
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
    handle: "pdrn-line",
    title: "PDRN Line",
    concern: "Even Skin Tone",
    tint: "#d4849c",
    wash: "#fbeaf0",
    blurb: "Barrier repair and plump, dewy finish.",
  },
  {
    handle: "txa-line",
    title: "TXA Line",
    concern: "Dark Spots",
    tint: "#8e6fb0",
    wash: "#efe9f7",
    blurb: "Tranexamic acid for stubborn discolouration.",
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
    handle: "zero-pore-serum",
    name: "Zero Pore Serum",
    tagline: "Pore refining serum with 2% BHA",
    collection: "zero-line",
    form: "dropper",
    tint: "#2f6fae",
    size: "30ml",
    price: 32,
    compareAt: 38,
    reviews: 214,
    badge: "BEST",
    concerns: ["Visible Pores", "Blackheads", "Uneven Texture"],
    description:
      "A lightweight daily serum that clears congestion and refines the look of pores without stripping the barrier. Salicylic acid works through oil to loosen build-up while panthenol keeps the skin calm.",
    keyIngredients: [
      { name: "2% Salicylic Acid", role: "Clears pore congestion" },
      { name: "Niacinamide 5%", role: "Balances oil, evens tone" },
      { name: "Panthenol", role: "Buffers irritation" },
    ],
    howToUse: [
      "Apply 3–4 drops to clean, dry skin in the evening.",
      "Start twice weekly and build to nightly as tolerated.",
      "Always follow with moisturiser and daily SPF.",
    ],
    variants: [
      { label: "Single", size: "30ml", price: 32 },
      { label: "Duo", size: "2 × 30ml", price: 56 },
    ],
  },
  {
    ...base,
    handle: "zero-pore-pad",
    name: "Zero Pore Pad",
    tagline: "Daily exfoliating toner pad",
    collection: "zero-line",
    form: "jar",
    tint: "#2f6fae",
    size: "70 pads",
    price: 28,
    reviews: 489,
    badge: "BEST",
    concerns: ["Blackheads", "Rough Texture"],
    description:
      "Pre-soaked pads that sweep away dead surface cells and leave skin smooth. Textured on one side for gentle manual exfoliation, smooth on the other for toning.",
    keyIngredients: [
      { name: "LHA + PHA", role: "Gentle surface exfoliation" },
      { name: "Witch Hazel", role: "Tightens the look of pores" },
    ],
    howToUse: [
      "Sweep the textured side over cleansed skin.",
      "Follow with the smooth side to tone.",
      "Use up to once daily; do not rinse.",
    ],
    variants: [{ label: "Single", size: "70 pads", price: 28 }],
  },
  {
    ...base,
    handle: "glow-collagen-serum",
    name: "Glow Collagen Serum",
    tagline: "Firming serum with triple collagen",
    collection: "glow-line",
    form: "dropper",
    tint: "#c4607a",
    size: "30ml",
    price: 38,
    compareAt: 45,
    reviews: 331,
    badge: "NEW",
    concerns: ["Fine Lines", "Loss of Firmness"],
    description:
      "A cushiony serum that sinks in fast and leaves a soft, bouncy finish. Hydrolysed collagen holds water at the surface while peptides support firmness over time.",
    keyIngredients: [
      { name: "Triple Collagen", role: "Surface plumping" },
      { name: "Matrixyl Peptides", role: "Supports firmness" },
      { name: "Squalane", role: "Seals in moisture" },
    ],
    howToUse: [
      "Press 3 drops into damp skin morning and night.",
      "Layer under moisturiser.",
    ],
    variants: [
      { label: "Single", size: "30ml", price: 38 },
      { label: "Value", size: "50ml", price: 54 },
    ],
  },
  {
    ...base,
    handle: "glow-night-wrapping-mask",
    name: "Glow Night Wrapping Mask",
    tagline: "Overnight collagen sleeping mask",
    collection: "glow-line",
    form: "jar",
    tint: "#c4607a",
    size: "75ml",
    price: 34,
    reviews: 276,
    concerns: ["Dryness", "Dullness"],
    description:
      "A sleeping mask that forms a breathable seal so actives stay put overnight. Skin wakes up softer, with a dewy surface and visibly smoother texture.",
    keyIngredients: [
      { name: "Collagen Complex", role: "Overnight plumping" },
      { name: "Ceramide NP", role: "Barrier support" },
    ],
    howToUse: [
      "Apply a generous layer as the last step at night.",
      "Rinse in the morning.",
      "Use 2–3 times a week.",
    ],
    variants: [{ label: "Single", size: "75ml", price: 34 }],
  },
  {
    ...base,
    handle: "deep-vita-c-serum",
    name: "Deep Vita C Serum",
    tagline: "15% vitamin C brightening serum",
    collection: "deep-line",
    form: "dropper",
    tint: "#A8611C",
    size: "30ml",
    price: 42,
    reviews: 402,
    badge: "BEST",
    concerns: ["Dark Spots", "Dullness"],
    description:
      "A stabilised vitamin C serum that lifts dullness and fades the look of post-blemish marks. Formulated at a pH that stays effective without stinging.",
    keyIngredients: [
      { name: "15% Ascorbic Acid", role: "Brightens, fades marks" },
      { name: "Ferulic Acid", role: "Stabilises vitamin C" },
      { name: "Vitamin E", role: "Antioxidant support" },
    ],
    howToUse: [
      "Apply 3 drops to clean skin each morning.",
      "Always follow with SPF 30 or higher.",
    ],
    variants: [
      { label: "Single", size: "30ml", price: 42 },
      { label: "Duo", size: "2 × 30ml", price: 74 },
    ],
  },
  {
    ...base,
    handle: "deep-retinal-cream",
    name: "Deep Retinal Cream",
    tagline: "0.1% retinal renewal cream",
    collection: "deep-line",
    form: "jar",
    tint: "#A8611C",
    size: "50ml",
    price: 46,
    reviews: 158,
    badge: "NEW",
    concerns: ["Fine Lines", "Uneven Tone"],
    description:
      "Retinaldehyde works faster than retinol with less irritation. Buffered in a rich cream base so you can use it nightly without the usual adjustment period.",
    keyIngredients: [
      { name: "0.1% Retinal", role: "Accelerates cell turnover" },
      { name: "Bisabolol", role: "Calms retinoid irritation" },
    ],
    howToUse: [
      "Apply a pea-sized amount at night.",
      "Begin twice weekly, increase slowly.",
      "Not for use during pregnancy.",
    ],
    variants: [{ label: "Single", size: "50ml", price: 46 }],
  },
  {
    ...base,
    handle: "kojic-brightening-essence",
    name: "Kojic Brightening Essence",
    tagline: "Kojic acid tone-correcting essence",
    collection: "kojic-acid-line",
    form: "pump",
    tint: "#c9a227",
    size: "150ml",
    price: 36,
    reviews: 97,
    concerns: ["Hyperpigmentation", "Uneven Tone"],
    description:
      "A watery essence that layers under everything and targets stubborn patches of discolouration over consistent use.",
    keyIngredients: [
      { name: "Kojic Acid", role: "Targets pigment" },
      { name: "Niacinamide", role: "Evens overall tone" },
    ],
    howToUse: ["Pat 2 pumps into skin after cleansing, morning and night."],
    variants: [{ label: "Single", size: "150ml", price: 36 }],
  },
  {
    ...base,
    handle: "pdrn-barrier-cream",
    name: "PDRN Barrier Cream",
    tagline: "Repairing cream for a dewy finish",
    collection: "pdrn-line",
    form: "jar",
    tint: "#d4849c",
    size: "50ml",
    price: 40,
    reviews: 188,
    concerns: ["Dryness", "Sensitivity"],
    description:
      "A rich but fast-absorbing cream that rebuilds a compromised barrier and leaves a healthy, glassy finish.",
    keyIngredients: [
      { name: "PDRN", role: "Supports barrier recovery" },
      { name: "5 Ceramides", role: "Restores lipid balance" },
    ],
    howToUse: ["Smooth over face and neck as the last step, morning and night."],
    variants: [{ label: "Single", size: "50ml", price: 40 }],
  },
  {
    ...base,
    handle: "txa-dark-spot-ampoule",
    name: "TXA Dark Spot Ampoule",
    tagline: "Tranexamic acid spot ampoule",
    collection: "txa-line",
    form: "dropper",
    tint: "#8e6fb0",
    size: "20ml",
    price: 44,
    reviews: 64,
    badge: "NEW",
    concerns: ["Dark Spots", "Melasma"],
    description:
      "A concentrated ampoule for areas that have not shifted with vitamin C alone. Use as a targeted treatment rather than all over.",
    keyIngredients: [
      { name: "5% Tranexamic Acid", role: "Targets stubborn pigment" },
      { name: "Alpha Arbutin", role: "Brightens over time" },
    ],
    howToUse: ["Dab onto darker areas nightly after serum."],
    variants: [{ label: "Single", size: "20ml", price: 44 }],
  },
  {
    ...base,
    handle: "clear-cica-gel",
    name: "Clear Cica Gel",
    tagline: "Calming gel for breakouts",
    collection: "clear-line",
    form: "tube",
    tint: "#3f8f7a",
    size: "60ml",
    price: 26,
    reviews: 141,
    concerns: ["Acne-prone Skin", "Redness"],
    description:
      "A cooling gel that settles angry spots and reduces the look of redness without drying the rest of the face.",
    keyIngredients: [
      { name: "Centella Asiatica", role: "Calms visible redness" },
      { name: "Zinc PCA", role: "Balances excess oil" },
    ],
    howToUse: ["Apply a thin layer to affected areas up to twice daily."],
    variants: [{ label: "Single", size: "60ml", price: 26 }],
  },
  {
    ...base,
    handle: "clear-foam-cleanser",
    name: "Clear Foam Cleanser",
    tagline: "Low-pH daily foaming cleanser",
    collection: "clear-line",
    form: "pump",
    tint: "#3f8f7a",
    size: "150ml",
    price: 22,
    reviews: 305,
    concerns: ["Acne-prone Skin", "Congestion"],
    description:
      "A low-pH cleanser that removes sunscreen and grime without the tight, squeaky feeling that triggers more oil.",
    keyIngredients: [
      { name: "Amino Acid Surfactants", role: "Cleanses without stripping" },
      { name: "Green Tea", role: "Soothes" },
    ],
    howToUse: ["Massage into damp skin, rinse thoroughly. Morning and night."],
    variants: [{ label: "Single", size: "150ml", price: 22 }],
  },
  /* ---- Not yet launched: excluded from Shop All ---- */
  {
    ...base,
    handle: "body-wash",
    name: "Evidance Body Wash",
    tagline: "Gentle resurfacing body cleanser",
    collection: "clear-line",
    form: "bottle",
    tint: "#A8611C",
    size: "300ml",
    price: 24,
    reviews: 0,
    comingSoon: true,
    concerns: ["Body Care"],
    description: "Launching soon.",
    keyIngredients: [],
    howToUse: [],
    variants: [{ label: "Single", size: "300ml", price: 24 }],
  },
  {
    ...base,
    handle: "pigmentation-serum",
    name: "Pigmentation Serum",
    tagline: "Targeted pigment corrector",
    collection: "deep-line",
    form: "dropper",
    tint: "#7a4a16",
    size: "30ml",
    price: 48,
    reviews: 0,
    comingSoon: true,
    concerns: ["Hyperpigmentation"],
    description: "Launching soon.",
    keyIngredients: [],
    howToUse: [],
    variants: [{ label: "Single", size: "30ml", price: 48 }],
  },
];

/** Everything buyable right now — Shop All and the rails use this. */
export const SHOP_ALL = PRODUCTS.filter((p) => !p.comingSoon);

export const getProduct = (handle: string) =>
  PRODUCTS.find((p) => p.handle === handle);

export const getCollection = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle);

export const productsIn = (collection: string) =>
  SHOP_ALL.filter((p) => p.collection === collection);

export const collectionTint = (handle: string) =>
  COLLECTIONS.find((c) => c.handle === handle)?.tint ?? "#A8611C";
