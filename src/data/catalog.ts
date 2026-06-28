export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  subcategories: string[];
  cover?: string; // "Browse by craft" cover image (falls back to a tile)
}

export interface Review {
  rating: number; // 1..5
  author: string;
  text: string;
  hasImage?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  subcategory: string;
  price: number; // EUR
  difficulty: DifficultyLevel;
  difficultyScore: number; // 1..4 diamonds shown on card
  rating: number; // avg star rating 1..5
  reviewCount: number;
  duration: string; // est. time to make
  description: string;
  includes: string[];
  image?: string; // real product photo (falls back to a placeholder tile)
  imageHover?: string; // shown on the cover when hovered (e.g. the bare base)
  bestseller?: boolean;
  reviews: Review[];
}

export const DIFFICULTY_ORDER: DifficultyLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const categories: Category[] = [
  {
    slug: "mother-of-pearl",
    name: "Mother-of-Pearl",
    blurb: "Luminous raden inlay kits — slice, fit and seal iridescent shell.",
    subcategories: ["Brooch", "Necklace", "Bracelet", "Earrings"],
    cover: "/categories/mother-of-pearl.png",
  },
  {
    slug: "metal-beading",
    name: "Metal",
    blurb: "Wire, findings and beads to string heirloom jewellery.",
    subcategories: ["Brooch", "Necklace", "Bracelet"],
  },
  {
    slug: "knitting",
    name: "Knitting",
    blurb: "Cosy yarn bundles with chart cards for every season.",
    subcategories: ["Brooch", "Necklace", "Bracelet"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "UV resin, lamps, tweezers & storage — the tools to finish your makes.",
    subcategories: ["Tools", "Materials", "Storage"],
  },
];

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

// No reviews yet — add Review objects here (or to a product's `reviews`)
// and they'll appear automatically on the product page.
const sampleReviews: Review[] = [];

function build(
  id: string,
  name: string,
  categorySlug: string,
  subcategory: string,
  price: number,
  difficulty: DifficultyLevel,
  difficultyScore: number,
  rating: number,
  reviewCount: number,
  duration: string,
  description: string,
  includes: string[],
  bestseller = false,
  image?: string,
  imageHover?: string
): Product {
  return {
    id,
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name,
    categorySlug,
    subcategory,
    price,
    difficulty,
    difficultyScore,
    rating,
    reviewCount,
    duration,
    description,
    includes,
    image,
    imageHover,
    bestseller,
    reviews: sampleReviews.slice(0, Math.min(3, Math.max(1, reviewCount % 4 || 2))),
  };
}

export const products: Product[] = [
  build(
    "p16",
    "Aurora Clover Studs",
    "mother-of-pearl",
    "Earrings",
    26,
    "Beginner",
    1,
    4.9,
    31,
    "",
    "Pastel mother-of-pearl caught in a four-leaf clover, like dawn glimpsed through a dewdrop. Each petal is filled with iridescent shell flakes and sealed under a softly domed glaze, then framed in a gold-tone bead edge — so the colour shifts with every turn of the light and no two pairs are ever quite the same. Light to wear and just under 2cm, they bring a quiet bit of magic to everyday outfits.",
    [
      "Pair of clover stud earrings (~1.8 cm)",
      "Hypoallergenic stainless-steel posts",
      "Soft pouch & little gift box",
    ],
    true,
    "/products/clover-studs.png"
  ),
  build(
    "p17",
    "Mermaid Tail Brooch",
    "mother-of-pearl",
    "Brooch",
    32,
    "Beginner",
    1,
    4.9,
    24,
    "",
    "A mermaid's tail rendered in fragments of blue and violet mother-of-pearl, each shard hand-laid inside a gold-tone frame and trimmed with a row of pearls. Catch it in the light and the shell mosaic ripples like water. Hover the cover photo to see the bare brass base it starts from — every scale of colour is set by hand from there. A statement piece at roughly 5 cm.",
    [
      "Mermaid tail brooch (~5 cm)",
      "Secure locking pin back",
      "Soft pouch & gift box",
    ],
    true,
    "/products/mermaid-tail.png",
    "/products/mermaid-tail-base.png"
  ),
  build(
    "p18",
    "Cactus Bloom Brooch",
    "mother-of-pearl",
    "Brooch",
    30,
    "Beginner",
    1,
    4.8,
    19,
    "",
    "A little desert in bloom: the cactus body is paved with chips of green mother-of-pearl that flicker between moss, mint and gold, topped with a soft pink blossom. Gold-tone spines outline every arm. Hover the cover photo to see the bare brass base — each speck of shell is then placed by hand. About 5 cm of cheerful, wear-anywhere charm.",
    [
      "Cactus brooch (~5 cm)",
      "Secure locking pin back",
      "Soft pouch & gift box",
    ],
    true,
    "/products/cactus.png",
    "/products/cactus-base.png"
  ),
  build(
    "p19",
    "Stargazer Fox Brooch",
    "mother-of-pearl",
    "Brooch",
    30,
    "Beginner",
    1,
    4.9,
    27,
    "",
    "A little fox reaching for a star, its coat a warm patchwork of peach and cream mother-of-pearl with a snowy-tipped tail. Tiny dark eyes and a gold star complete the scene. Hover the cover photo to see the bare brass base — each fleck of shell is set by hand from there. About 4 cm of pocket-sized wonder.",
    [
      "Fox brooch (~4 cm)",
      "Secure locking pin back",
      "Soft pouch & gift box",
    ],
    true,
    "/products/fox.png",
    "/products/fox-base.png"
  ),
  build(
    "p20",
    "Crescent Moon & Planet Brooch",
    "mother-of-pearl",
    "Brooch",
    34,
    "Beginner",
    1,
    4.9,
    22,
    "",
    "A whole little cosmos: a crescent moon paved in golden mother-of-pearl cradles a tiny planet of blue-green abalone, ringed with crystals and a sparkling star. The shell glows amber and teal as it catches the light. Hover the cover photo to see the bare brass base — every shimmering chip is set by hand from there. About 4.5 cm.",
    [
      "Moon & planet brooch (~4.5 cm)",
      "Secure locking pin back",
      "Soft pouch & gift box",
    ],
    true,
    "/products/moon.png",
    "/products/moon-base.png"
  ),
  build(
    "p04",
    "Hearth Mittens",
    "knitting",
    "Bracelet",
    19,
    "Beginner",
    1,
    4.7,
    61,
    "Weekend",
    "Squishy merino mittens with a folk motif. Includes a chart card and our friendly knitting glossary.",
    ["2 skeins merino wool", "Bamboo needles", "Chart card", "Darning needle"],
    true
  ),
  build(
    "p05",
    "Meadow Scarf",
    "knitting",
    "Necklace",
    26,
    "Intermediate",
    3,
    4.5,
    23,
    "1–2 weeks",
    "A lace-edged scarf in plant-dyed wool. Learn yarn-overs and a tidy bind-off.",
    ["3 skeins plant-dyed wool", "Circular needles", "Lace pattern", "Stitch markers"]
  ),
  build(
    "p06",
    "Acorn Brooch Set",
    "knitting",
    "Brooch",
    14,
    "Beginner",
    1,
    4.4,
    12,
    "2 hrs",
    "Tiny knitted acorns you can pin anywhere. A perfect scrap-yarn starter.",
    ["Mini wool bundle", "Felt backing", "Pins", "Pattern leaflet"]
  ),
  build(
    "p07",
    "Constellation Necklace",
    "metal-beading",
    "Necklace",
    22,
    "Intermediate",
    3,
    4.8,
    37,
    "3 hrs",
    "Map the night sky in tiny brass and glass beads strung on a delicate chain.",
    ["Brass & glass beads", "Beading wire", "Clasp set", "Layout mat & guide"],
    true
  ),
  build(
    "p08",
    "Riverstone Bracelet",
    "metal-beading",
    "Bracelet",
    18,
    "Beginner",
    2,
    4.6,
    44,
    "1–2 hrs",
    "Smooth matte beads in earthy tones on a stretch cord — wearable in an afternoon.",
    ["Matte stone beads", "Elastic cord", "Finishing glue", "Quick-start card"]
  ),
  build(
    "p09",
    "Filigree Brooch",
    "metal-beading",
    "Brooch",
    30,
    "Advanced",
    4,
    4.9,
    16,
    "4–5 hrs",
    "Coil fine wire into a lace-like filigree blossom. A patient maker's reward.",
    ["Fine craft wire", "Round-nose pliers", "Brooch back", "Filigree templates"]
  ),
  build(
    "p10",
    "UV Resin — Crystal Clear",
    "accessories",
    "Materials",
    9,
    "Beginner",
    1,
    4.8,
    63,
    "",
    "Low-odour, bubble-free UV resin — the secret to glassy mother-of-pearl and bead settings. Cures hard in minutes under a UV lamp.",
    ["60g UV resin bottle", "Fine pour nozzle", "Tips card"],
    true
  ),
  build(
    "p11",
    "UV Curing Lamp",
    "accessories",
    "Tools",
    18,
    "Beginner",
    1,
    4.9,
    51,
    "",
    "Compact USB lamp that sets UV resin in 60–120 seconds. Folds flat for storage.",
    ["USB UV lamp", "USB-C cable", "User guide"],
    true
  ),
  build(
    "p12",
    "Precision Tweezers",
    "accessories",
    "Tools",
    5,
    "Beginner",
    1,
    4.7,
    38,
    "",
    "Anti-static, fine-tip tweezers for placing tiny shell flakes and beads exactly where you want them.",
    ["Stainless-steel tweezers", "Protective tip cap"]
  ),
  build(
    "p13",
    "Desktop Storage Box",
    "accessories",
    "Storage",
    6,
    "Beginner",
    1,
    4.6,
    44,
    "",
    "Japanese-style compartment box that keeps beads, findings and shell pieces sorted and tidy on your desk.",
    ["Clear compartment box", "Adjustable dividers"],
    true
  ),
  build(
    "p14",
    "Silicone Work Mat",
    "accessories",
    "Tools",
    7,
    "Beginner",
    1,
    4.5,
    19,
    "",
    "Non-stick, heat-resistant mat — mix resin and glue without the mess.",
    ["A5 silicone mat"]
  ),
  build(
    "p15",
    "Craft Glue Set",
    "accessories",
    "Materials",
    8,
    "Beginner",
    1,
    4.6,
    22,
    "",
    "Strong, clear-drying glue for findings, pins and felt — a maker's everyday essential.",
    ["2 × precision glue", "Spare nozzles"]
  ),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export const bestsellers = products.filter((p) => p.bestseller);
