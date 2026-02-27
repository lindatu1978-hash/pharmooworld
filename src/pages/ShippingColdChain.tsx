import SEO, { createBreadcrumbSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Thermometer, Package, Truck, Clock, FileCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ShippingColdChain = () => {
  return (
    <>
      <SEO
        title="Cold Chain Shipping & Pharmaceutical Logistics"
        description="PharmooWorld cold chain shipping — temperature-controlled pharmaceutical logistics, refrigerated packaging, express courier delivery, and international customs documentation."
        keywords="cold chain shipping, pharmaceutical logistics, temperature controlled shipping, refrigerated packaging, express courier, international pharmaceutical shipping"
        canonical="/shipping-cold-chain"
        structuredData={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Cold Chain Shipping", url: "/shipping-cold-chain" },
        ])}
      />

      <Layout>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Cold Chain Shipping & Pharmaceutical Logistics
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                PharmooWorld maintains a pharmaceutical-grade cold chain logistics infrastructure to ensure product integrity from warehouse to delivery — anywhere in the world.
              </p>

              <div className="space-y-8">
                {/* Refrigerated Packaging */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Refrigerated Packaging Solutions
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Products requiring temperature control — including botulinum toxins (2–8°C) and certain dermal fillers — are shipped using validated cold chain packaging systems designed to maintain the required temperature range for 48–96 hours depending on transit route and ambient conditions.</p>
                    <p>Our packaging solutions include:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>Expanded Polystyrene (EPS) insulated containers</strong> — Provides thermal insulation with consistent temperature maintenance for 48–72 hours</li>
                      <li><strong>Phase-change gel packs</strong> — Pre-conditioned to the target temperature range (2–8°C or 15–25°C) to provide active cooling without freezing the product</li>
                      <li><strong>Vacuum Insulated Panels (VIP)</strong> — Used for extended transit routes (72–96 hours) requiring superior thermal performance</li>
                      <li><strong>Temperature data loggers</strong> — Single-use or reusable digital loggers included in every cold chain shipment to document temperature history throughout transit</li>
                    </ul>
                  </div>
                </section>

                {/* Express Courier */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Express Courier Services
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>PharmooWorld partners with leading international express couriers experienced in pharmaceutical and cold chain logistics:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>DHL Medical Express</strong> — Specialized pharmaceutical logistics with GDP-compliant handling, temperature-controlled vehicles, and priority customs clearance</li>
                      <li><strong>FedEx Custom Critical / Priority Alert</strong> — Premium cold chain service with real-time temperature monitoring and proactive shipment management</li>
                      <li><strong>UPS Temperature True</strong> — End-to-end temperature control with dedicated pharmaceutical handling lanes and customs brokerage</li>
                    </ul>
                    <p>All shipments include real-time tracking, proof of delivery, and shipment alerts. Priority handling is used for all temperature-sensitive products to minimize transit time.</p>
                  </div>
                </section>

                {/* Temperature Ranges */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-primary" />
                    Temperature Categories
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-secondary/40 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-foreground">❄️ Cold Chain (2–8°C)</p>
                      <p className="text-sm text-muted-foreground">Botulinum toxins, certain vaccines, and biologics. Shipped with gel packs in insulated containers with temperature monitoring.</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-foreground">🌡️ Controlled Room Temp (15–25°C)</p>
                      <p className="text-sm text-muted-foreground">Most dermal fillers, medical devices, and pharmaceuticals. Protected from extreme heat, cold, and direct sunlight during transit.</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-foreground">⚠️ Do Not Freeze</p>
                      <p className="text-sm text-muted-foreground">HA dermal fillers, suspensions, and emulsions. Freezing can irreversibly damage product structure and sterility.</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-foreground">🔒 Ambient / Standard</p>
                      <p className="text-sm text-muted-foreground">Surgical supplies, PPE, and stable pharmaceuticals. Standard protective packaging with shock absorption.</p>
                    </div>
                  </div>
                </section>

                {/* Delivery Timelines */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Delivery Timelines
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Typical delivery timelines from order confirmation to receipt:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>North America (US, Canada)</strong> — 2–4 business days</li>
                      <li><strong>Europe (EU, UK, Switzerland)</strong> — 2–5 business days</li>
                      <li><strong>Middle East & GCC</strong> — 3–5 business days</li>
                      <li><strong>Asia-Pacific (Australia, Japan, Korea, Southeast Asia)</strong> — 4–7 business days</li>
                      <li><strong>Africa</strong> — 5–10 business days</li>
                      <li><strong>Latin America</strong> — 5–10 business days</li>
                    </ul>
                    <p>In-stock items are dispatched within 1–2 business days of license verification and payment confirmation. Items requiring sourcing may add 3–5 business days to the above timelines.</p>
                  </div>
                </section>

                {/* Customs Documentation */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    International Customs Documentation
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Every international shipment from PharmooWorld includes complete customs documentation to facilitate smooth importation:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Commercial invoices with detailed product descriptions and HS codes</li>
                      <li>Packing lists with unit counts, weights, and dimensions</li>
                      <li>Certificates of Analysis (CoA) for pharmaceutical products</li>
                      <li>Certificates of Origin for tariff preference claims</li>
                      <li>Free Sale Certificates (FSC) where required by destination country</li>
                      <li>Cold chain temperature monitoring documentation</li>
                      <li>Material Safety Data Sheets (MSDS) for hazardous materials classification</li>
                    </ul>
                    <p>For markets with specific import requirements (import permits, end-user certificates, local registration), our regulatory affairs team provides guidance and documentation support to expedite customs clearance.</p>
                  </div>
                </section>

                {/* CTA */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Need Shipping Assistance?</h2>
                  <p className="text-muted-foreground mb-4">Our logistics team is available to discuss shipping requirements, provide delivery estimates, and coordinate customs clearance.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Contact Logistics Team</Link>
                    <Link to="/shipping" className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">General Shipping Info</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ShippingColdChain;
