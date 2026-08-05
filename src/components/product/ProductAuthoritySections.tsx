import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductPlaceholder from "@/components/ui/product-placeholder";
import {
  CheckCircle,
  Package,
  Thermometer,
  Truck,
  Building2,
  ShieldCheck,
  FileCheck,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import {
  ProductContentInput,
  buildOverview,
  buildFeatures,
  buildFaqs,
  needsColdChain,
  storageTemperature,
} from "@/lib/product-content";

interface Props {
  product: ProductContentInput & { id: string; category_id?: string | null };
  category?: { id: string; name: string; slug: string } | null;
  faqs: { question: string; answer: string }[];
}

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image_url: string | null;
}

const SectionHeading = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <h2 id={id} className="text-xl md:text-2xl font-bold mb-4 scroll-mt-24">
    {children}
  </h2>
);

const ProductAuthoritySections = ({ product, category, faqs }: Props) => {
  const [related, setRelated] = useState<RelatedProduct[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      let query = supabase
        .from("products")
        .select("id, name, slug, price, image_url")
        .neq("id", product.id)
        .limit(6);
      if (product.category_id) query = query.eq("category_id", product.category_id);
      const { data } = await query;
      if (active && data) setRelated(data);
    };
    load();
    return () => {
      active = false;
    };
  }, [product.id, product.category_id]);

  const overview = buildOverview(product, category?.name);
  const features = buildFeatures(product, category?.name);
  const cold = needsColdChain(product, category?.name);
  const temp = storageTemperature(product, category?.name);

  const specs = [
    { label: "Brand", value: product.manufacturer },
    { label: "Product name", value: product.name },
    { label: "Category", value: category?.name },
    { label: "Active ingredient / strength", value: product.dosage },
    { label: "Form", value: product.form },
    { label: "Storage", value: temp },
    { label: "Country of origin", value: product.origin },
    { label: "Shelf life", value: product.shelf_life },
    { label: "Regulatory status", value: product.regulatory_status },
    { label: "Manufacturer", value: product.manufacturer },
    { label: "SKU", value: product.slug },
  ].filter((s) => !!s.value);

  return (
    <div className="mt-14 space-y-14">
      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <SectionHeading id="overview-heading">Product Overview</SectionHeading>
        <div className="space-y-4 text-muted-foreground leading-relaxed max-w-4xl">
          {overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Technical specifications */}
      <section aria-labelledby="specs-heading">
        <SectionHeading id="specs-heading">Technical Specifications</SectionHeading>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">Technical specifications for {product.name}</caption>
              <tbody className="divide-y divide-border">
                {specs.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="text-left font-medium p-3 md:p-4 w-1/2 md:w-1/3 align-top">
                      {row.label}
                    </th>
                    <td className="p-3 md:p-4 text-muted-foreground">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading">
        <SectionHeading id="features-heading">Key Features</SectionHeading>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-4xl">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Packaging + Storage */}
      <section aria-labelledby="packaging-heading" className="grid gap-6 md:grid-cols-2">
        <div>
          <SectionHeading id="packaging-heading">Packaging Information</SectionHeading>
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Package className="h-5 w-5 text-accent" aria-hidden="true" />
                Original manufacturer presentation
              </div>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Sealed original manufacturer box with printed batch and expiry</li>
                <li>{product.form ? `${product.form} presentation` : "Sealed primary container"} with tamper-evident seal</li>
                <li>Protective inserts and cushioning for international freight</li>
                <li>
                  {cold
                    ? "Insulated cold-chain outer with gel packs and temperature indicator"
                    : "Moisture-barrier export carton, discreet outer labelling"}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <SectionHeading id="storage-heading">Storage Conditions</SectionHeading>
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Thermometer className="h-5 w-5 text-accent" aria-hidden="true" />
                {temp}
              </div>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Temperature: {temp}; avoid freezing unless stated by the manufacturer</li>
                <li>Light: keep in the original carton, protected from direct sunlight</li>
                <li>Humidity: store in a dry area, away from steam and condensation</li>
                <li>
                  Shelf life: {product.shelf_life || "as printed on the manufacturer batch label"} — do not use beyond
                  the printed expiry
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Applications */}
      <section aria-labelledby="applications-heading">
        <SectionHeading id="applications-heading">Applications</SectionHeading>
        <div className="grid gap-4 md:grid-cols-3 max-w-5xl">
          {[
            {
              t: "Professional clinical settings",
              d: `${product.name} is supplied for use by qualified healthcare professionals in licensed clinics and hospital departments, in line with the manufacturer's instructions for use.`,
            },
            {
              t: "Authorised distribution",
              d: "Supplied to pharmacies, wholesalers and authorised distributors holding the relevant licence for the destination market.",
            },
            {
              t: "Handling and storage",
              d: `Received goods should be checked against the packing list, inspected for damage and moved into ${temp} storage without delay.`,
            },
          ].map((c) => (
            <Card key={c.t}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 max-w-4xl">
          Information on this page is provided for procurement purposes and is not medical advice. Always follow the
          manufacturer's official product information and applicable local regulations.
        </p>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading">
        <SectionHeading id="benefits-heading">Why Buy From PharmooWorld</SectionHeading>
        <ul className="grid gap-3 sm:grid-cols-2 max-w-4xl">
          {[
            "Reliable manufacturing quality with verifiable batch records",
            "Secure, tamper-evident and discreet packaging",
            "International shipping with export documentation",
            "Wholesale availability and contract pricing for repeat supply",
            "Documentation pack available on request",
            "Dedicated account support before and after dispatch",
          ].map((b) => (
            <li key={b} className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-muted-foreground">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Shipping */}
      <section aria-labelledby="shipping-heading">
        <SectionHeading id="shipping-heading">Shipping Information</SectionHeading>
        <Card>
          <CardContent className="p-6 grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                Worldwide delivery by tracked express and pharmaceutical freight forwarders. Handling takes 1–3 business
                days; transit typically 5–14 business days depending on destination.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Thermometer className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                {cold
                  ? "Validated cold-chain shipping keeps this product within 2–8 °C in transit, with temperature indicators included in the consignment."
                  : "Ambient shipping in protective export packaging, with humidity and impact protection throughout transit."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FileCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                Export documentation — commercial invoice, packing list and, where required, certificates of origin and
                analysis — is prepared for every international consignment.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                Mixed-brand orders are consolidated into one shipment to reduce freight cost. See our{" "}
                <Link to="/shipping" className="text-primary hover:underline">
                  shipping policy
                </Link>{" "}
                and{" "}
                <Link to="/shipping-cold-chain" className="text-primary hover:underline">
                  cold-chain guide
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Brand */}
      {product.manufacturer && (
        <section aria-labelledby="brand-heading">
          <SectionHeading id="brand-heading">About {product.manufacturer}</SectionHeading>
          <Card>
            <CardContent className="p-6 space-y-3 text-muted-foreground text-sm leading-relaxed max-w-4xl">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Building2 className="h-5 w-5 text-accent" aria-hidden="true" />
                Manufacturer profile
              </div>
              <p>
                {product.manufacturer} produces {product.name}
                {product.origin ? ` at facilities in ${product.origin}` : ""}. PharmooWorld sources this line through
                vetted supply channels and verifies packaging, labelling and batch documentation on intake.
              </p>
              <p>
                Manufacturing standards, quality assurance procedures and regulatory status vary by market
                {product.regulatory_status ? `; this item is listed as ${product.regulatory_status}` : ""}. Our
                compliance team can confirm the documentation available for your destination before you order — see{" "}
                <Link to="/compliance" className="text-primary hover:underline">
                  compliance
                </Link>{" "}
                and{" "}
                <Link to="/certifications" className="text-primary hover:underline">
                  certifications
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <SectionHeading id="faq-heading">Frequently Asked Questions</SectionHeading>
        <Accordion type="single" collapsible className="max-w-4xl">
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-sm text-muted-foreground mt-4">
          More answers on our{" "}
          <Link to="/faq" className="text-primary hover:underline">
            FAQ page
          </Link>
          .
        </p>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading">
          <SectionHeading id="related-heading">Related Products</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/product/${r.slug}`}
                className="group rounded-lg border border-border overflow-hidden hover:border-primary transition-colors"
              >
                <div className="aspect-square bg-muted/40">
                  {r.image_url ? (
                    <img
                      src={r.image_url}
                      alt={`${r.name} — wholesale pharmaceutical product`}
                      title={r.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ProductPlaceholder productName={r.name} size="sm" />
                  )}
                </div>
                <div className="p-2 md:p-3">
                  <p className="text-xs md:text-sm font-medium line-clamp-2 group-hover:text-primary">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">${r.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trust */}
      <section aria-labelledby="trust-heading">
        <SectionHeading id="trust-heading">Buyer Assurance</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Truck, t: "Worldwide shipping" },
            { icon: Package, t: "Secure packaging" },
            { icon: MessageCircle, t: "Dedicated support" },
            { icon: ShieldCheck, t: "Wholesale orders" },
            { icon: FileCheck, t: "Quality documentation" },
          ].map(({ icon: Icon, t }) => (
            <Card key={t}>
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{t}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section aria-labelledby="cta-heading" className="rounded-xl bg-primary/5 border border-primary/20 p-6 md:p-10">
        <h2 id="cta-heading" className="text-xl md:text-2xl font-bold mb-2">
          Need wholesale pricing for {product.name}?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          Send us your volumes and destination country and our sales desk will return a formal quotation, including
          freight and documentation, within one business day.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact">
            <Button size="lg">Request a quote</Button>
          </Link>
          <a href="mailto:sales@pharmooworld.com">
            <Button size="lg" variant="outline" className="gap-2">
              <Mail className="h-4 w-4" aria-hidden="true" /> Email sales
            </Button>
          </a>
          <a href="tel:+4012324508">
            <Button size="lg" variant="outline" className="gap-2">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call now
            </Button>
          </a>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="border-t border-border pt-6 text-sm">
        <h2 className="font-semibold mb-3">Explore more</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
          {category && (
            <li>
              <Link to={`/products?category=${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
            </li>
          )}
          <li>
            <Link to="/products" className="hover:text-primary">
              All products
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-primary">
              Industry insights
            </Link>
          </li>
          <li>
            <Link to="/shipping" className="hover:text-primary">
              Shipping
            </Link>
          </li>
          <li>
            <Link to="/returns" className="hover:text-primary">
              Returns
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover:text-primary">
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-primary">
              About us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductAuthoritySections;
