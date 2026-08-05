// Deterministic, field-driven long-form content for product pages.
// Everything here is derived from the product record so no claims are invented
// beyond generic handling/logistics statements that apply site-wide.

export interface ProductContentInput {
  name: string;
  description?: string | null;
  manufacturer?: string | null;
  dosage?: string | null;
  form?: string | null;
  origin?: string | null;
  regulatory_status?: string | null;
  shelf_life?: string | null;
  price: number;
  bulk_price?: number | null;
  bulk_min_quantity?: number | null;
  in_stock?: boolean | null;
  slug: string;
}

const COLD_CHAIN_KEYWORDS = ["botul", "botox", "toxin", "venom", "vaccine", "insulin", "serum"];

export const needsColdChain = (p: ProductContentInput, categoryName?: string | null) => {
  const haystack = `${p.name} ${p.form ?? ""} ${categoryName ?? ""}`.toLowerCase();
  return COLD_CHAIN_KEYWORDS.some((k) => haystack.includes(k));
};

export const storageTemperature = (p: ProductContentInput, categoryName?: string | null) =>
  needsColdChain(p, categoryName) ? "2–8 °C (refrigerated)" : "15–25 °C, dry storage";

/** SEO title: Primary keyword + brand + buying intent + site name, kept ≤ 60 chars. */
export const buildProductTitle = (name: string, manufacturer?: string | null) => {
  const brand = manufacturer ? ` ${manufacturer}` : "";
  const candidates = [
    `Buy ${name}${brand} | Wholesale | PharmooWorld`,
    `Buy ${name} | Wholesale | PharmooWorld`,
    `Buy ${name} | PharmooWorld`,
    `Buy ${name}`,
    name,
  ];
  return candidates.find((c) => c.length <= 60) ?? name.slice(0, 60);
};

/** Meta description, 150–160 chars where the data allows. */
export const buildProductDescription = (p: ProductContentInput, categoryName?: string | null) => {
  const by = p.manufacturer ? ` by ${p.manufacturer}` : "";
  const base = `Buy authentic ${p.name}${by} from PharmooWorld. Worldwide wholesale supply, ${
    needsColdChain(p, categoryName) ? "cold-chain" : "secure"
  } packaging, fast shipping and competitive pricing.`;
  return base.length > 160 ? `${base.slice(0, 157).trimEnd()}...` : base;
};

export const buildOverview = (p: ProductContentInput, categoryName?: string | null): string[] => {
  const paras: string[] = [];
  const brand = p.manufacturer ?? "its manufacturer";
  const cat = categoryName ? categoryName.toLowerCase() : "pharmaceutical";

  paras.push(
    p.description?.trim() ||
      `${p.name} is a ${cat} product supplied by PharmooWorld to licensed clinics, hospitals, pharmacies and authorised distributors worldwide. Each unit is sourced through vetted supply channels and handled under documented quality procedures from intake to dispatch.`,
  );

  paras.push(
    `${p.name} is manufactured by ${brand}${p.origin ? ` in ${p.origin}` : ""}${
      p.regulatory_status ? ` and carries the following regulatory status: ${p.regulatory_status}` : ""
    }. ${
      p.form ? `It is supplied in ${p.form.toLowerCase()} form` : "It is supplied in its original manufacturer presentation"
    }${p.dosage ? ` at a strength of ${p.dosage}` : ""}, in sealed original packaging with batch and expiry details printed by the manufacturer.`,
  );

  paras.push(
    `Because ${p.name} is intended for professional use, PharmooWorld supplies it on a business-to-business basis only. Orders are reviewed against the licensing requirements of the destination market before dispatch, and supporting documentation such as a Certificate of Analysis or batch traceability record can be issued on request for each consignment.`,
  );

  paras.push(
    `Wholesale pricing starts at $${p.price.toFixed(2)} per unit${
      p.bulk_price && p.bulk_min_quantity
        ? `, falling to $${p.bulk_price.toFixed(2)} per unit on orders of ${p.bulk_min_quantity} units or more`
        : ""
    }. Larger tenders, recurring supply contracts and mixed-brand consignments are quoted individually — contact our sales desk with your volumes and destination for a formal quotation.`,
  );

  paras.push(
    `Storage and transport conditions are matched to the product: ${p.name} is held at ${storageTemperature(
      p,
      categoryName,
    )}${p.shelf_life ? ` and carries a stated shelf life of ${p.shelf_life}` : ""}. ${
      needsColdChain(p, categoryName)
        ? "Consignments ship in validated cold-chain packaging with temperature monitoring so the product arrives within its specified range."
        : "Consignments ship in tamper-evident, moisture-protected packaging inside the original manufacturer carton."
    }`,
  );

  return paras;
};

export const buildFeatures = (p: ProductContentInput, categoryName?: string | null): string[] => {
  const features = [
    "Supplied in sealed original manufacturer packaging",
    "Batch number and expiry date verifiable on every unit",
    "Documentation available on request (COA, MSDS, GMP certificate)",
  ];
  if (p.manufacturer) features.unshift(`Manufactured by ${p.manufacturer}`);
  if (p.regulatory_status) features.push(`Regulatory status: ${p.regulatory_status}`);
  features.push(
    needsColdChain(p, categoryName)
      ? "Temperature-controlled cold-chain shipping (2–8 °C)"
      : "Protective, tamper-evident export packaging",
  );
  features.push("Wholesale and bulk quantities available worldwide");
  return features;
};

export const buildFaqs = (p: ProductContentInput, categoryName?: string | null) => {
  const brand = p.manufacturer ?? "the original manufacturer";
  const temp = storageTemperature(p, categoryName);
  const cold = needsColdChain(p, categoryName);

  return [
    {
      question: `What is ${p.name}?`,
      answer:
        p.description?.trim() ||
        `${p.name} is a ${categoryName ? categoryName.toLowerCase() : "pharmaceutical"} product supplied by PharmooWorld to licensed healthcare buyers and authorised distributors for professional use.`,
    },
    {
      question: `Who manufactures ${p.name}?`,
      answer: `${p.name} is manufactured by ${brand}${p.origin ? `, with production based in ${p.origin}` : ""}. Every unit ships in the manufacturer's original sealed packaging.`,
    },
    {
      question: `How should ${p.name} be stored?`,
      answer: `Store ${p.name} at ${temp}, away from direct light and excess humidity, and keep it in its original carton until use. Follow the storage instructions printed on the manufacturer packaging and any local pharmacy regulations.`,
    },
    {
      question: `What strength and form is ${p.name} supplied in?`,
      answer: `${p.name} is supplied${p.form ? ` as ${p.form.toLowerCase()}` : " in its original manufacturer presentation"}${p.dosage ? ` at ${p.dosage}` : ""}. Exact presentation details are listed in the technical specification table on this page.`,
    },
    {
      question: `How is ${p.name} packaged for shipping?`,
      answer: `Units are shipped inside the original manufacturer box, secured with protective inserts and tamper-evident seals. ${
        cold
          ? "Cold-chain consignments add insulated packaging, phase-change gel packs and a temperature indicator."
          : "Export cartons include moisture protection and cushioning suitable for international freight."
      }`,
    },
    {
      question: `What is the shelf life of ${p.name}?`,
      answer: p.shelf_life
        ? `${p.name} carries a stated shelf life of ${p.shelf_life} from the date of manufacture. Remaining shelf life on any specific batch can be confirmed before dispatch.`
        : `Shelf life is printed on each batch by the manufacturer. We can confirm the remaining shelf life of the batch allocated to your order before dispatch.`,
    },
    {
      question: `Is ${p.name} currently in stock?`,
      answer: p.in_stock
        ? `Yes — ${p.name} is currently listed as in stock. Availability for very large volumes is confirmed at the time of quotation.`
        : `${p.name} is currently out of stock. Contact our sales desk to be notified when the next batch is allocated or to discuss an equivalent product.`,
    },
    {
      question: `What is the minimum order quantity for ${p.name}?`,
      answer: `There is no fixed minimum for standard orders. Wholesale pricing${
        p.bulk_min_quantity ? ` begins at ${p.bulk_min_quantity} units` : " applies to bulk volumes"
      }, and contract pricing is available for recurring supply.`,
    },
    {
      question: `How much does ${p.name} cost wholesale?`,
      answer: `Listed pricing starts at $${p.price.toFixed(2)} per unit${
        p.bulk_price && p.bulk_min_quantity
          ? `, with a wholesale rate of $${p.bulk_price.toFixed(2)} per unit from ${p.bulk_min_quantity} units`
          : ""
      }. Freight, documentation and destination requirements are quoted separately.`,
    },
    {
      question: `Do you ship ${p.name} internationally?`,
      answer: `Yes. We ship worldwide using tracked express and freight forwarders experienced with pharmaceutical consignments, including export documentation for the destination market.`,
    },
    {
      question: `How long does delivery take?`,
      answer: `Handling takes 1–3 business days after order confirmation and payment clearance. Transit typically takes 5–14 business days depending on destination, customs clearance and the shipping method selected.`,
    },
    {
      question: `What documentation is supplied with ${p.name}?`,
      answer: `A Certificate of Analysis, Material Safety Data Sheet, GMP certificate and batch traceability record can be issued on request for the batch supplied, subject to manufacturer availability.`,
    },
    {
      question: `Do I need a licence to order ${p.name}?`,
      answer: `Products of this type are supplied to licensed clinics, hospitals, pharmacies and authorised distributors. Where the destination market requires it, we will ask for proof of licence before releasing an order.`,
    },
    {
      question: `Can I request a sample or a trial order?`,
      answer: `Small trial orders are possible for qualified buyers so you can verify packaging, labelling and cold-chain performance before committing to a larger volume.`,
    },
    {
      question: `Which payment methods do you accept?`,
      answer: `We accept bank wire transfer, escrow, invoice terms for approved accounts and Bitcoin. Payment options appear at checkout, and proforma invoices are available for procurement approval.`,
    },
    {
      question: `What happens if a consignment arrives damaged?`,
      answer: `Report the issue with photographs within the window set out in our returns policy. Damaged or temperature-excursed consignments are investigated against the shipment record and replaced or credited where the claim is upheld.`,
    },
    {
      question: `Can I order ${p.name} together with other brands?`,
      answer: `Yes. Mixed consignments across brands and categories are consolidated into a single shipment, which reduces freight cost and simplifies customs paperwork.`,
    },
    {
      question: `How do I request a formal quotation?`,
      answer: `Email sales@pharmooworld.com or use the contact form with the product name, quantity, destination country and any documentation you require. Quotations are normally returned within one business day.`,
    },
  ];
};
