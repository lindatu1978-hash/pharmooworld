import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const treatmentAreas = [
  "Forehead",
  "Temples",
  "Under eye zone",
  "Cheekbones",
  "Nose",
  "Midface (nasolabial folds)",
  "Around the mouth",
  "Lips",
  "Chin",
  "Jawline",
];

const treatedConditions = [
  "Aging wrinkles, as well as mimic ones in the soft tissue",
  "Deep creases and folds",
  "Uneven skin tone and texture",
  "Lost volume and elasticity in the dermis",
  "Unattractive lip shape",
  "Dark circles under eyes",
  "Post acne marks and scars",
];

const sideEffects = [
  "Injection site reactions (redness, swelling, bruising, etc.)",
  "Painful feeling around the injection spot",
  "High skin tenderness",
  "Temporary numbness or tingling",
];

const contraindications = [
  "Allergies related to any components of the product",
  "Bleeding disorder (or prescribed medications with blood-thinning abilities)",
  "Skin damage, irritation, or infection in the target area",
  "Pregnancy or breastfeeding period in women",
  "Age less than 18",
];

const faqItems = [
  { q: "What are dermal fillers?", a: "Dermal fillers are injectable gel-like products used in aesthetic medicine to restore facial volume, smooth wrinkles, enhance lips, and contour facial features. Most fillers use hyaluronic acid (HA), a naturally occurring substance in the body, making them safe and biocompatible." },
  { q: "How long do dermal fillers last?", a: "The longevity of dermal fillers depends on the product type, treatment area, and individual metabolism. Most hyaluronic acid fillers last between 6 to 18 months, while calcium hydroxyapatite fillers (like Radiesse) can last up to 24 months. Poly-L-lactic acid fillers (like Sculptra) may provide results lasting up to 2 years." },
  { q: "Who can administer dermal fillers?", a: "Dermal fillers should only be administered by certified healthcare professionals, including licensed physicians (MD/DO), nurse practitioners (NP), physician assistants (PA), and other qualified medical professionals with proper training in injectable treatments." },
  { q: "Why should I choose PharmooWorld for purchasing dermal fillers?", a: "PharmooWorld offers 100% authentic dermal fillers from world-renowned brands at competitive wholesale prices. We provide free fast shipping on orders over $750, bulk discounts, and dedicated customer support for licensed medical professionals." },
  { q: "What brands of dermal fillers are available at PharmooWorld?", a: "PharmooWorld carries a comprehensive range of premium filler brands including Juvederm, Restylane, Belotero, Radiesse, Sculptra, Teosyal, Stylage, Perfectha, Revolax, Saypha, Ellanse, Profhilo, and many more." },
  { q: "Do I need a medical license to buy dermal fillers from PharmooWorld?", a: "Yes, since dermal fillers are professional-grade medical products, a valid medical license is required to place an order. Our team manually verifies all licenses during the order approval process to ensure patient safety." },
  { q: "Does PharmooWorld offer wholesale pricing on dermal fillers?", a: "Yes, PharmooWorld provides generous wholesale discounts on all dermal filler products. The more you order in bulk, the greater the discount. Contact our sales team for custom bulk pricing on large orders." },
  { q: "Are all dermal fillers at PharmooWorld authentic?", a: "Absolutely. PharmooWorld guarantees the authenticity of every product we sell. All dermal fillers come with lot numbers, certificates of authenticity, and are sourced directly from authorized distributors and manufacturers." },
  { q: "What is the difference between HA fillers and non-HA fillers?", a: "Hyaluronic acid (HA) fillers like Juvederm and Restylane provide immediate volume and can be dissolved with hyaluronidase if needed. Non-HA fillers like Radiesse (calcium hydroxyapatite) and Sculptra (poly-L-lactic acid) stimulate collagen production for longer-lasting results but cannot be easily reversed." },
  { q: "How do I order dermal fillers from PharmooWorld?", a: "Simply create an account, browse our dermal filler catalog, add products to your cart, provide your valid medical license, and complete the checkout. Our team will verify your credentials and process your order with fast, secure shipping." },
];

const DermalFillersContent = () => {
  return (
    <section className="mt-12 md:mt-16 space-y-10 md:space-y-14 text-foreground">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Buy Dermal Fillers Online at PharmooWorld</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld offers the best ordering conditions and a wide selection of world-renowned dermal fillers to board-certified professionals around the globe. Choose us as your reliable supplier and enjoy advantageous wholesale prices, products for various aesthetic procedures (lip fillers, facial contouring, mesotherapy, and more), safe packaging with fast delivery, and a friendly customer support team ready to assist throughout the ordering process.
        </p>
      </div>

      {/* What are dermal fillers */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">What Are Dermal Fillers for Skin Rejuvenation?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          A dermal filler is a unique injectable product used for various purposes in aesthetic medicine. Thanks to its gel-like texture, it effectively fills in even deep wrinkles, making it a preferred rejuvenation method for patients of various ages and aesthetic goals. There are three main types of injectable fillers based on their active ingredient:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          <li>Fillers with non-animal <strong>hyaluronic acid (HA)</strong> — the most popular and versatile option</li>
          <li>Injectables with <strong>calcium hydroxyapatite (CaHA)</strong> — such as Radiesse, offering longer-lasting results</li>
          <li><strong>Poly-L-lactic acid</strong> based fillers — such as Sculptra, stimulating natural collagen production</li>
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Hyaluronic acid is the most commonly used ingredient as it is naturally produced in the body, making it exceptionally biocompatible and suitable for various treatment areas. Many popular HA-based brands are available at PharmooWorld, including Juvederm, Restylane, Belotero, Stylage, and more.
        </p>
      </div>

      {/* Target Areas */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Target Areas and Expected Effects</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Dermal fillers vary in composition, texture, density, and other characteristics. It is crucial to define the treatment area during a consultation with a qualified practitioner and select the most suitable product. Facial fillers may be used in these regions:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
          {treatmentAreas.map((area) => (
            <div key={area} className="border-l-2 border-primary/30 pl-3 py-1">
              <p className="text-sm md:text-base text-muted-foreground">{area}</p>
            </div>
          ))}
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          Beyond facial treatments, dermal fillers are also effective for the neck, décolleté, and hands. Here are the most common concerns that can be addressed with injectable fillers:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {treatedConditions.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>

      {/* Available Brands */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Buy Facial Fillers Online — Available Brands at PharmooWorld</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The variety of dermal fillers on the aesthetic medicine market is truly impressive. Different product variations serve various needs, and understanding their differences is key to selecting the right one for each patient.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld carries an extensive catalog of premium brands:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {[
            "Juvederm", "Restylane", "Belotero", "Radiesse", "Sculptra", "Teosyal",
            "Stylage", "Perfectha", "Revolax", "Saypha", "Ellanse", "Profhilo",
            "Aliaxin", "Neauvia", "Fillmed", "Regenovue", "Kairax", "Lumifil",
            "Revanesse", "Monalisa", "HyaFilia", "HyaCorp", "Pluryal", "Princess"
          ].map((brand) => (
            <div key={brand} className="bg-secondary/40 rounded-lg px-3 py-2 text-center">
              <p className="text-sm font-medium">{brand}</p>
            </div>
          ))}
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-4">
          Prices range from $150 to $800 per syringe depending on the brand, product type, volume, and quantity ordered. PharmooWorld offers excellent wholesale prices and special bonuses for regular customers, so there is always an opportunity to save.
        </p>

        <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2 mt-4">
          <p className="text-sm md:text-base font-semibold">How to Order Dermal Fillers from PharmooWorld:</p>
          <ol className="list-decimal list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
            <li>Register your personal account</li>
            <li>Browse our dermal filler catalog and add products to your cart</li>
            <li>Provide your valid medical license or prescription</li>
            <li>Complete your shipping and billing details</li>
            <li>Proceed with secure payment</li>
            <li>Your license will be verified by our team, and your order shipped promptly</li>
          </ol>
        </div>
      </div>

      {/* Safety Information */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Primary Safety Information</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Hyaluronic acid is a natural substance produced in the body, making adverse reactions after injection minimal. However, there are some typical post-treatment symptoms that patients should be aware of:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {sideEffects.map((e) => <li key={e}>{e}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          With proper aftercare, most side effects resolve within 2–3 days. To avoid severe complications, it is essential to review all contraindications before treatment:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {contraindications.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Once all contraindications are reviewed and cleared by the treating physician, dermal fillers can be safely administered for optimal aesthetic results.
        </p>
      </div>

      {/* Why PharmooWorld */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Buy Dermal Fillers at Wholesale Prices</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld offers the best ordering conditions and a wide selection of famous worldwide dermal fillers to board-certified professionals. Choose us as your reliable supplier and enjoy:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li><strong>Competitive wholesale prices</strong> — save up to 40% on bulk orders</li>
          <li><strong>100% authentic products</strong> — every item comes with lot numbers and certificates</li>
          <li><strong>Free fast shipping</strong> — complimentary 1–5 day shipping on orders over $750</li>
          <li><strong>Wide product selection</strong> — dermal fillers, botulinum toxins, mesotherapy, and more</li>
          <li><strong>Dedicated support</strong> — our team is available to assist with orders, pricing, and product selection</li>
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          <Link to="/contact" className="text-primary hover:underline">Contact us</Link> if you have questions about pricing, shipment, delivery, or our referral program. The PharmooWorld customer support team is always ready to help. When you order dermal fillers from PharmooWorld, you can be confident you're purchasing 100% authentic, top-quality products that guarantee your patients the best possible results.
        </p>
      </div>

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
