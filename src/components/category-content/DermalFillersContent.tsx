import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createFAQSchema } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

interface FillerProduct {
  name: string;
  slug: string;
  price: number;
}

const brands = [
  "Juvederm", "Restylane", "Belotero", "Radiesse", "Sculptra", "Teosyal",
  "Stylage", "Perfectha", "Revolax", "Saypha", "Ellanse", "Profhilo",
  "Aliaxin", "Neauvia", "Fillmed", "Regenovue", "Kairax", "Lumifil",
  "Revanesse", "Monalisa", "HyaFilia", "HyaCorp", "Pluryal", "Princess"
];

const faqItems = [
  { q: "What are dermal fillers?", a: "Dermal fillers are injectable gel-based medical devices used in aesthetic and reconstructive medicine to restore volume, smooth wrinkles, enhance facial contours, and hydrate the skin. The most widely used dermal fillers contain hyaluronic acid (HA) — a naturally occurring polysaccharide found in the body's extracellular matrix. HA fillers are biocompatible, biodegradable, and reversible with hyaluronidase enzyme injection if needed." },
  { q: "How long do dermal fillers last?", a: "The duration of dermal filler results depends on the product type, treatment area, cross-linking technology, and individual patient metabolism. Most hyaluronic acid fillers last 6 to 18 months. Calcium hydroxyapatite fillers (Radiesse) can last up to 24 months. Poly-L-lactic acid fillers (Sculptra) stimulate collagen production and may provide results lasting up to 2 years. Factors such as injection depth, volume injected, and patient activity level all influence longevity." },
  { q: "Who can administer dermal fillers?", a: "Dermal fillers are prescription medical devices that must be administered by certified healthcare professionals including licensed physicians (MD/DO), nurse practitioners (NP), physician assistants (PA), dentists (DDS/DMD), and other qualified practitioners with formal injectable training. PharmooWorld verifies all professional licenses before order fulfillment to ensure patient safety." },
  { q: "What is the difference between HA and non-HA fillers?", a: "Hyaluronic acid (HA) fillers — such as Juvederm, Restylane, and Belotero — provide immediate volumization and can be dissolved with hyaluronidase if adjustment is needed. Non-HA fillers include calcium hydroxyapatite (CaHA) fillers like Radiesse, which provide structural support and stimulate neocollagenesis, and poly-L-lactic acid (PLLA) fillers like Sculptra, which work as biostimulators to gradually increase collagen production over several months. Non-HA fillers cannot be easily reversed." },
  { q: "Does PharmooWorld guarantee product authenticity?", a: "Yes, PharmooWorld guarantees 100% authenticity of every dermal filler product we distribute. All products are sourced directly from authorized manufacturers and licensed distributors. Every shipment includes lot numbers, expiration dates, certificates of authenticity, and full traceability documentation. We never sell grey-market, parallel-imported, or relabeled products." },
  { q: "What wholesale pricing is available?", a: "PharmooWorld offers tiered wholesale pricing with automatic discounts starting at 10+ units. Bulk orders of 50+ units qualify for custom contract pricing. Prices range from $150 to $800 per syringe depending on brand, product line, volume, and quantity ordered. Contact sales@pharmooworld.com for personalized bulk quotes, distribution agreements, or tender pricing." },
  { q: "How are dermal fillers shipped?", a: "Dermal fillers are shipped in temperature-controlled packaging where required by manufacturer specifications. Most HA fillers should be stored at room temperature (below 25°C) and protected from freezing and direct sunlight. PharmooWorld uses insulated shipping containers for heat-sensitive products and ships worldwide via express courier (DHL, FedEx, UPS) with typical delivery in 3–7 business days." },
  { q: "What compliance documentation do you provide?", a: "Every dermal filler shipment includes commercial invoices, packing lists, certificates of analysis (CoA), certificates of conformity, and customs declarations. We also provide material safety data sheets (MSDS), CE certificates, and import/export documentation upon request. For regulated markets, we assist with end-user certificates and local registration requirements." },
];

const DermalFillersContent = () => {
  const [products, setProducts] = useState<FillerProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("name, slug, price")
        .eq("category_id", "c13570dc-4f92-4c46-b982-f9938975f111")
        .order("name");
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dermal Filler Products",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://pharmooworld.com/product/${p.slug}`,
      name: p.name,
    })),
  };

  const faqSchema = createFAQSchema(faqItems.map(f => ({ question: f.q, answer: f.a })));

  return (
    <section className="mt-12 md:mt-16 space-y-10 md:space-y-14 text-foreground">
      <Helmet>
        {products.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* H1 */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Dermal Fillers – Hyaluronic Acid Injectable Supply
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld is a licensed international distributor of premium dermal fillers, serving board-certified aesthetic practitioners, dermatology clinics, medical spas, and pharmaceutical wholesalers worldwide. Our catalog features over 24 leading filler brands including Juvederm, Restylane, Belotero, Teosyal, Stylage, and Radiesse — all available at competitive wholesale prices with global shipping and full compliance documentation.
        </p>
      </div>

      {/* H2: What Are Dermal Fillers? */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">What Are Dermal Fillers?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Dermal fillers are injectable gel-based medical devices designed to restore facial volume, smooth wrinkles, enhance contours, and hydrate the skin from within. The most widely used fillers are based on hyaluronic acid (HA) — a naturally occurring glycosaminoglycan found in the skin's extracellular matrix, synovial fluid, and vitreous humor. HA's exceptional capacity to bind water (up to 1,000 times its weight) makes it an ideal volumizing agent.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Modern HA fillers use cross-linking technology (typically BDDE — 1,4-butanediol diglycidyl ether) to create a stable gel network that resists enzymatic degradation, allowing results to last months to over a year depending on the product's cross-linking density, HA concentration, and particle size. Higher cross-linking produces firmer gels suitable for deep volume restoration, while lighter cross-linking creates smoother gels ideal for superficial lines and lip enhancement.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Beyond HA, the dermal filler market includes calcium hydroxyapatite (CaHA) microspheres suspended in a carboxymethylcellulose carrier gel (Radiesse), poly-L-lactic acid (PLLA) microparticles that stimulate neocollagenesis (Sculptra), and polycaprolactone (PCL) microspheres in a CMC gel carrier (Ellanse). Each platform offers distinct clinical characteristics — immediate volumization, collagen biostimulation, or a combination of both.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Dermal fillers are classified as medical devices (not drugs) under EU MDR regulations and by the FDA. They require professional administration by trained healthcare providers in a clinical setting. Patient selection, injection technique, product choice, and anatomical knowledge are all critical for safe, effective outcomes.
        </p>
      </div>

      {/* H2: Types of Dermal Fillers */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Types of Dermal Fillers</h2>

        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Lip Fillers</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Lip fillers use soft, smooth-flowing HA gels designed for the delicate lip tissue. Products like Juvederm Ultra Smile, Restylane Kysse, and Teosyal RHA Kiss provide natural-looking lip augmentation, border definition, and vermilion enhancement. Most lip fillers contain lidocaine for patient comfort and last 6–12 months. PharmooWorld stocks a wide range of lip-specific fillers from all major manufacturers.
          </p>
        </div>

        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Nasolabial & Marionette Line Fillers</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Medium-viscosity HA fillers are indicated for nasolabial folds (smile lines) and marionette lines — the two most common areas of age-related volume loss. Products like Juvederm Volift, Restylane Defyne, Belotero Intense, and Stylage M provide smooth, natural correction with good tissue integration. These fillers typically last 9–15 months depending on injection depth and volume used.
          </p>
        </div>

        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Volume & Contouring Fillers</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            High-viscosity, densely cross-linked HA fillers are designed for deep tissue volumization and facial contouring. Products such as Juvederm Voluma, Restylane Lyft, Stylage XXL, and Radiesse restore cheek volume, enhance jawline definition, and correct age-related midface descent. These products offer strong lifting capacity and typically last 12–24 months. Non-HA alternatives like Sculptra and Ellanse provide biostimulatory volume that develops gradually over 4–6 weeks.
          </p>
        </div>

        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Cross-Linked HA Fillers & Skin Boosters</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Skin boosters like Profhilo, Restylane Skinboosters, and Teosyal Redensity I use low or ultra-low cross-linked HA to hydrate, firm, and improve skin quality rather than add volume. These products are injected into the superficial dermis across the face, neck, décolleté, and hands. They stimulate collagen and elastin production while providing deep hydration. Treatment protocols typically involve 2–3 sessions spaced 4 weeks apart, with results lasting 6–12 months.
          </p>
        </div>
      </div>

      {/* H2: Storage & Handling Standards */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Storage & Handling Standards</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Proper storage and handling of dermal fillers is essential for maintaining product quality, sterility, and clinical efficacy. While storage requirements vary by product type, general guidelines apply across the category:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">🌡️ Temperature</p>
            <p className="text-sm text-muted-foreground">Most HA fillers: store at 2–25°C. Do NOT freeze. CaHA fillers (Radiesse): store at 2–25°C. PLLA fillers (Sculptra): store below 30°C. Always check product-specific IFU.</p>
          </div>
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">📦 Packaging</p>
            <p className="text-sm text-muted-foreground">PharmooWorld ships fillers in protective, insulated packaging to prevent temperature excursions, light exposure, and physical damage. Products arrive in original manufacturer packaging with intact seals.</p>
          </div>
        </div>
      </div>

      {/* H2: Wholesale Dermal Filler Distribution */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Wholesale Dermal Filler Distribution</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld is your trusted wholesale partner for dermal filler procurement. We serve clinics, hospitals, medical spas, pharmacy chains, and national distributors across 50+ countries with competitive pricing, reliable supply, and full regulatory support.
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li><strong>Bulk Pricing</strong> — Tiered wholesale discounts starting at 10+ units. Custom contract pricing for orders exceeding 50 units. Volume rebates for annual purchase commitments.</li>
          <li><strong>Export Support</strong> — Complete export documentation including commercial invoices, CoA, CE certificates, certificates of origin, and customs declarations. Assistance with local registration and import permits.</li>
          <li><strong>Professional Use Restriction</strong> — All purchasers must provide valid medical, dental, or pharmacy licenses. Orders are processed only after credential verification by our compliance team.</li>
        </ul>

        {/* Available brands grid */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Brands Available at PharmooWorld</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {brands.map((brand) => (
              <div key={brand} className="bg-secondary/40 rounded-lg px-3 py-2 text-center">
                <p className="text-sm font-medium">{brand}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <Link to="/compliance" className="text-sm text-primary hover:underline font-medium">→ View Compliance Information</Link>
          <Link to="/shipping-cold-chain" className="text-sm text-primary hover:underline font-medium">→ Cold Chain Shipping Details</Link>
          <Link to="/certifications" className="text-sm text-primary hover:underline font-medium">→ Our Certifications</Link>
        </div>
      </div>

      {/* Product links */}
      {products.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-bold">Browse Our Dermal Filler Catalog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {products.slice(0, 12).map(p => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="text-sm text-primary hover:underline py-1">
                → {p.name} — ${p.price.toFixed(2)}
              </Link>
            ))}
          </div>
          {products.length > 12 && (
            <Link to="/products?category=Dermal-Fillers" className="text-sm text-primary hover:underline font-medium">
              View all {products.length} dermal filler products →
            </Link>
          )}
        </div>
      )}

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Frequently Asked Questions — Dermal Fillers</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm md:text-base font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default DermalFillersContent;
