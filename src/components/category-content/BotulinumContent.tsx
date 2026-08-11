import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createFAQSchema } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

interface BotulinumProduct {
  name: string;
  slug: string;
  price: number;
}

const botoxPricing = [
  { product: "Botox 50 Units", price: "$299" },
  { product: "Botox 100 Units", price: "$399" },
  { product: "Botox 100 Units Non-English", price: "$379" },
  { product: "Botox 100 Units European", price: "$379" },
  { product: "Botox 100 Units Cosmetic", price: "$449" },
  { product: "Botox 100 Units Polish", price: "$379" },
  { product: "Botox 100 Units Indian – English", price: "$379" },
  { product: "Botox International English 100 Units", price: "$389" },
];

const licenseTypes = [
  { abbr: "MD", title: "Medical Doctor", desc: "A licensed physician qualified to diagnose, treat, and perform medical procedures, including Botox injections." },
  { abbr: "DO", title: "Osteopathic Doctor", desc: "A fully licensed physician with specialized training in the musculoskeletal system, authorized to administer Botox." },
  { abbr: "DDS", title: "Doctor of Dental Surgery", desc: "A dental professional trained in surgical procedures, often using Botox for therapeutic and cosmetic purposes." },
  { abbr: "DMD", title: "Doctor of Medical Dentistry", desc: "A dental practitioner with medical training, qualified to use Botox in dental and facial treatments." },
  { abbr: "DPM", title: "Doctor of Podiatric Medicine", desc: "A specialist in foot and ankle care, often using Botox for medical treatments like pain management and muscle conditions." },
  { abbr: "NP", title: "Nurse Practitioner", desc: "An advanced practice nurse with the authority to diagnose, prescribe, and administer treatments, including Botox." },
  { abbr: "PA", title: "Physician Assistant", desc: "A licensed medical professional who works under a physician's supervision and is trained to administer treatments like Botox." },
  { abbr: "ARNP", title: "Advanced Registered Nurse Practitioner", desc: "A highly trained nurse practitioner with advanced clinical skills and the ability to provide medical treatments." },
];

const faqItems = [
  { q: "What is Botulinum Toxin Type A?", a: "Botulinum Toxin Type A is a neurotoxin protein produced by the bacterium Clostridium botulinum. In medical and aesthetic practice, purified formulations of this protein — such as Allergan Botox — are used to temporarily relax targeted muscles by blocking acetylcholine release at the neuromuscular junction. This mechanism makes it effective for treating dynamic wrinkles, chronic migraine, cervical dystonia, hyperhidrosis, and other neuromuscular conditions." },
  { q: "Who can legally purchase and administer Botulinum Toxin?", a: "Botulinum toxin products are prescription-only medical devices intended exclusively for certified healthcare professionals. Eligible buyers include Medical Doctors (MD), Osteopathic Doctors (DO), Dentists (DDS/DMD), Nurse Practitioners (NP), Physician Assistants (PA), and other licensed practitioners with appropriate training. PharmooWorld verifies all professional licenses before processing orders." },
  { q: "How should Botulinum Toxin be stored?", a: "Unopened botulinum toxin vials must be stored between 2°C and 8°C (36°F–46°F) in a refrigerator. Do not freeze. Once reconstituted, the product should be used within 24 hours and stored at 2–8°C. PharmooWorld ships all botulinum products in temperature-controlled packaging with cold chain monitoring to ensure product integrity upon delivery." },
  { q: "What is the difference between Botox and other neurotoxin brands?", a: "While all approved neurotoxins contain botulinum toxin type A, they differ in formulation, unit dosing, onset time, diffusion characteristics, and duration. Allergan Botox (onabotulinumtoxinA) is the most widely studied, with over 30 years of clinical data. Other FDA/EMA-approved options include Dysport (abobotulinumtoxinA), Xeomin (incobotulinumtoxinA), and Jeuveau (prabotulinumtoxinA). Each has distinct clinical profiles suitable for different indications." },
  { q: "Does PharmooWorld guarantee product authenticity?", a: "Yes. PharmooWorld guarantees 100% authenticity of all products sold. Every botulinum toxin shipment includes lot numbers, expiration dates, and certificates of authenticity. We source exclusively from authorized manufacturers and licensed distributors, and all products undergo quality verification before dispatch." },
  { q: "What wholesale pricing is available for bulk orders?", a: "PharmooWorld offers tiered wholesale pricing — the larger your order volume, the greater the discount. Bulk orders of 10+ units qualify for automatic wholesale pricing shown on product pages. For orders exceeding 50 units or for custom contracts, contact our sales team at sales@pharmooworld.com for personalized quotes." },
  { q: "How is Botulinum Toxin shipped internationally?", a: "All botulinum toxin shipments use temperature-controlled cold chain logistics. Products are packaged in insulated containers with gel packs or dry ice to maintain the required 2–8°C range. We ship worldwide via express couriers (DHL, FedEx, UPS) with real-time temperature monitoring and customs-ready documentation including commercial invoices, certificates of analysis, and import permits where required." },
  { q: "What medical conditions can Botulinum Toxin treat?", a: "Beyond cosmetic wrinkle reduction, botulinum toxin is FDA-approved for chronic migraine, cervical dystonia (neck muscle spasms), blepharospasm (eyelid twitching), upper and lower limb spasticity, overactive bladder, severe axillary hyperhidrosis (excessive sweating), and strabismus (crossed eyes). Ongoing research continues to expand its therapeutic applications." },
];

const BotulinumContent = () => {
  const [products, setProducts] = useState<BotulinumProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("name, slug, price")
        .eq("category_id", "c13570dc-4f92-4c46-b982-f9938975f2a5")
        .order("name");
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Botulinum Toxin Type A Products",
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

      {/* H1 – Primary Keyword Target */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Botulinum Toxin Type A Products – Wholesale Medical Supply
        </h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld is a licensed international distributor of botulinum toxin type A products, serving board-certified medical professionals, aesthetic clinics, hospitals, and pharmaceutical wholesalers worldwide. Our catalog includes Allergan Botox and other FDA/EMA-approved neurotoxin formulations available at competitive wholesale prices with temperature-controlled global shipping.
        </p>
      </div>

      {/* H2: What Is Botulinum Toxin Type A? */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">What Is Botulinum Toxin Type A?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botulinum toxin type A is a highly purified neurotoxin protein derived from the bacterium <em>Clostridium botulinum</em>. When injected in controlled, therapeutic doses, it acts as a potent neuromodulator by blocking the release of acetylcholine at the neuromuscular junction. This mechanism produces temporary, localized muscle relaxation — the foundational principle behind both its medical and aesthetic applications.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The neuromodulator mechanism of botulinum toxin involves a multi-step process. After injection into the target muscle, the toxin binds to specific receptors on the nerve terminal, is internalized into the nerve cell, and then cleaves SNARE proteins (specifically SNAP-25) that are essential for the fusion of acetylcholine-containing vesicles with the cell membrane. Without acetylcholine release, the nerve impulse cannot reach the muscle, resulting in temporary muscle paralysis that typically lasts 3 to 6 months.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          In aesthetic medicine, this temporary muscle relaxation is used to smooth dynamic wrinkles — expression lines caused by repeated facial muscle contractions over time. Common cosmetic treatment areas include glabellar lines (frown lines between the eyebrows), horizontal forehead lines, and lateral canthal lines (crow's feet). The treatment is minimally invasive, typically takes 10–15 minutes, and produces visible results within 3–7 days.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Beyond aesthetics, botulinum toxin has broad therapeutic indications approved by the FDA and EMA. These include chronic migraine prevention (for patients experiencing 15+ headache days per month), cervical dystonia (involuntary neck muscle contractions), blepharospasm (uncontrollable eyelid twitching), upper and lower limb spasticity in adults and children with cerebral palsy, overactive bladder with urinary incontinence, severe primary axillary hyperhidrosis (excessive underarm sweating), and strabismus (misalignment of the eyes). Ongoing clinical trials continue to explore new applications including depression, premature ejaculation, and neuropathic pain management.
        </p>
        <div className="bg-secondary/40 rounded-lg p-4 md:p-6 mt-4">
          <p className="text-sm md:text-base font-semibold text-foreground">⚠️ Professional Use Only</p>
          <p className="text-sm text-muted-foreground mt-1">
            Botulinum toxin type A is a prescription-only neurotoxin intended exclusively for administration by trained, licensed healthcare professionals. Improper use can cause serious adverse effects including difficulty swallowing, breathing problems, and muscle weakness beyond the injection site. All purchasers must provide valid professional credentials.
          </p>
        </div>
      </div>

      {/* H2: Available Botulinum Products */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Available Botulinum Products</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld maintains a comprehensive inventory of botulinum toxin type A formulations from leading pharmaceutical manufacturers. Each product is sourced from authorized channels with full traceability, lot-level documentation, and guaranteed cold chain integrity.
        </p>

        {/* H3: Allergan Botox */}
        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Allergan Botox (OnabotulinumtoxinA)</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Allergan Botox is the world's most recognized and extensively studied botulinum toxin brand, with over 30 years of clinical experience and more than 3,500 published studies. Available in 50-unit and 100-unit vacuum-dried powder vials for reconstitution, Botox holds FDA approval for 11 therapeutic indications and carries CE marking for distribution across the European Economic Area.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            PharmooWorld stocks multiple Botox regional variants including US-market English packaging, European packaging, Polish packaging, and Indian-English packaging — all manufactured by Allergan at GMP-certified facilities. Pricing starts from $299 for 50-unit vials with volume discounts available.
          </p>
          <div className="rounded-lg border overflow-hidden mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold text-right">Price (2026)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {botoxPricing.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell className="text-sm">{item.product}</TableCell>
                    <TableCell className="text-sm font-medium text-right">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {products.filter(p => p.name.toLowerCase().includes("botox")).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {products.filter(p => p.name.toLowerCase().includes("botox")).map(p => (
                <Link key={p.slug} to={`/product/${p.slug}`} className="text-sm text-primary hover:underline">
                  → {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* H3: Other FDA/EMA Approved Neurotoxins */}
        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Other FDA/EMA Approved Neurotoxins</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            In addition to Allergan Botox, PharmooWorld distributes alternative botulinum toxin type A formulations that hold FDA and/or EMA approval. These include Dysport (abobotulinumtoxinA by Ipsen/Galderma), which features a smaller molecular complex that may diffuse more broadly — making it well-suited for larger treatment areas such as the forehead. Xeomin (incobotulinumtoxinA by Merz) is a "naked" neurotoxin free of complexing proteins, potentially reducing the risk of antibody formation with repeated use. Jeuveau (prabotulinumtoxinA by Evolus) is a newer entrant specifically approved for aesthetic glabellar lines.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Each neurotoxin has distinct unit equivalencies — for example, Dysport units are NOT interchangeable with Botox units. Healthcare professionals should consult product-specific prescribing information for appropriate dosing conversions. PharmooWorld provides technical product data sheets and dosing guides upon request.
          </p>
          {products.filter(p => !p.name.toLowerCase().includes("botox")).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {products.filter(p => !p.name.toLowerCase().includes("botox")).map(p => (
                <Link key={p.slug} to={`/product/${p.slug}`} className="text-sm text-primary hover:underline">
                  → {p.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* H3: Bulk Botulinum Distribution */}
        <div className="space-y-3 border-l-4 border-primary/30 pl-4 md:pl-6">
          <h3 className="text-lg md:text-xl font-bold">Bulk Botulinum Distribution</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            PharmooWorld serves as a volume distributor for clinics, hospital networks, medical spas, and national distributors requiring consistent bulk supply of botulinum toxin products. Our bulk distribution program offers tiered wholesale pricing (10+ units automatic discount, 50+ units custom pricing), dedicated account management, scheduled recurring orders with guaranteed stock allocation, and priority cold chain logistics with expedited customs clearance for international clients.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Contact <a href="mailto:sales@pharmooworld.com" className="text-primary hover:underline">sales@pharmooworld.com</a> for volume quotes, distribution partnership agreements, or tender pricing.
          </p>
        </div>
      </div>

      {/* H2: Storage & Cold Chain Requirements */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Storage & Cold Chain Requirements</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Proper storage is critical for maintaining the efficacy and safety of botulinum toxin products. All approved formulations require strict temperature control throughout the supply chain — from manufacturer to final administration.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">🌡️ Temperature Range</p>
            <p className="text-sm text-muted-foreground">Store between 2°C and 8°C (36°F–46°F). Do not freeze. Do not expose to temperatures above 25°C. Protect from light.</p>
          </div>
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">📦 Refrigerated Logistics</p>
            <p className="text-sm text-muted-foreground">PharmooWorld uses insulated EPS containers with phase-change gel packs calibrated for 48–72 hour transit. Temperature data loggers accompany every shipment.</p>
          </div>
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">📊 Stability Control</p>
            <p className="text-sm text-muted-foreground">Each shipment includes temperature monitoring documentation confirming product remained within the required 2–8°C range throughout transit. Temperature excursion protocols are in place.</p>
          </div>
          <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
            <p className="font-semibold text-foreground">🔬 Handling Standards</p>
            <p className="text-sm text-muted-foreground">Products are handled in GDP-compliant (Good Distribution Practice) warehousing with continuous temperature monitoring, access control, and first-expiry-first-out (FEFO) rotation.</p>
          </div>
        </div>
      </div>

      {/* H2: Wholesale Supply & Export Services */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Wholesale Supply & Export Services</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld provides end-to-end wholesale supply and international export services for botulinum toxin type A products. Our distribution infrastructure supports licensed buyers across North America, Europe, Asia-Pacific, the Middle East, Africa, and Latin America.
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li><strong>Licensed Buyers Only</strong> — All purchasers must hold valid medical, dental, or pharmacy licenses. Professional credentials are manually verified by our compliance team before order fulfillment.</li>
          <li><strong>International Shipping</strong> — We ship to 50+ countries via temperature-controlled express courier (DHL Medical Express, FedEx Custom Critical, UPS Temperature True). Transit time is typically 3–7 business days.</li>
          <li><strong>Compliance Documentation</strong> — Every shipment includes commercial invoices, packing lists, certificates of analysis (CoA), certificates of origin, and customs declarations. We assist with import permits, end-user certificates, and regulatory filings where required.</li>
          <li><strong>Bulk Order Support</strong> — Volume discounts start at 10 units. Custom contracts available for recurring orders of 50+ units. Dedicated account managers handle large-volume distribution partnerships.</li>
        </ul>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link to="/compliance" className="text-sm text-primary hover:underline font-medium">→ View Compliance Information</Link>
          <Link to="/shipping-cold-chain" className="text-sm text-primary hover:underline font-medium">→ Cold Chain Shipping Details</Link>
          <Link to="/certifications" className="text-sm text-primary hover:underline font-medium">→ Our Certifications</Link>
        </div>
      </div>

      {/* License types */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Professional Licenses We Accept</h2>
        <div className="space-y-3">
          {licenseTypes.map((l) => (
            <div key={l.abbr} className="border-l-2 border-primary/30 pl-4">
              <p className="text-sm md:text-base font-semibold">{l.title} ({l.abbr})</p>
              <p className="text-sm text-muted-foreground">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Frequently Asked Questions — Botulinum Toxin</h2>
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

export default BotulinumContent;
