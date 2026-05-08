// Auto shipping estimator for B2B pharmaceutical orders.
// Heuristic-based — final shipping is confirmed by sales after order review.

export type ShippingRegion = "domestic" | "europe" | "north_america" | "asia" | "rest_of_world";

const EU_COUNTRIES = [
  "austria","belgium","bulgaria","croatia","cyprus","czech republic","czechia","denmark",
  "estonia","finland","france","germany","greece","hungary","ireland","italy","latvia",
  "lithuania","luxembourg","malta","netherlands","poland","portugal","romania","slovakia",
  "slovenia","spain","sweden","united kingdom","uk","switzerland","norway","iceland",
];

const NORTH_AMERICA = ["united states","usa","us","canada","mexico"];

const ASIA = [
  "china","japan","south korea","korea","singapore","hong kong","taiwan","thailand",
  "vietnam","malaysia","indonesia","philippines","india","united arab emirates","uae",
  "saudi arabia","israel","turkey",
];

const DOMESTIC = ["romania"]; // company base

export const detectRegion = (countryRaw: string): ShippingRegion => {
  const c = countryRaw.trim().toLowerCase();
  if (!c) return "rest_of_world";
  if (DOMESTIC.includes(c)) return "domestic";
  if (EU_COUNTRIES.includes(c)) return "europe";
  if (NORTH_AMERICA.includes(c)) return "north_america";
  if (ASIA.includes(c)) return "asia";
  return "rest_of_world";
};

const REGION_BASE: Record<ShippingRegion, { base: number; perUnit: number; label: string; eta: string }> = {
  domestic:       { base: 25,  perUnit: 1.5, label: "Domestic Express",   eta: "1–2 business days" },
  europe:         { base: 65,  perUnit: 2.0, label: "EU Cold-Chain",      eta: "2–4 business days" },
  north_america:  { base: 120, perUnit: 3.0, label: "Trans-Atlantic Air", eta: "3–5 business days" },
  asia:           { base: 140, perUnit: 3.5, label: "Asia-Pacific Air",   eta: "4–6 business days" },
  rest_of_world:  { base: 160, perUnit: 4.0, label: "International Air",  eta: "5–8 business days" },
};

const FREE_SHIPPING_THRESHOLD = 2500; // USD subtotal qualifies for free standard shipping
const COLD_CHAIN_SURCHARGE = 35;       // applied if any cold-chain product present

export interface ShippingEstimate {
  cost: number;
  label: string;
  eta: string;
  region: ShippingRegion;
  isFree: boolean;
  coldChain: boolean;
  notes: string;
}

export const estimateShipping = (params: {
  country: string;
  subtotal: number;
  totalUnits: number;
  hasColdChain?: boolean;
}): ShippingEstimate => {
  const region = detectRegion(params.country);
  const tier = REGION_BASE[region];
  const coldChain = !!params.hasColdChain;

  const raw = tier.base + tier.perUnit * Math.max(0, params.totalUnits);
  const withColdChain = coldChain ? raw + COLD_CHAIN_SURCHARGE : raw;

  const isFree = params.subtotal >= FREE_SHIPPING_THRESHOLD && !coldChain;
  const cost = isFree ? 0 : Math.round(withColdChain * 100) / 100;

  return {
    cost,
    label: tier.label,
    eta: tier.eta,
    region,
    isFree,
    coldChain,
    notes: isFree
      ? `Free standard shipping on orders over $${FREE_SHIPPING_THRESHOLD.toLocaleString()}.`
      : coldChain
        ? "Includes temperature-controlled (2–8°C) cold-chain handling."
        : "Estimated rate. Final shipping cost confirmed after order review.",
  };
};
