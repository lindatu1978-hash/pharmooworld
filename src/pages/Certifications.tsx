import SEO, { createBreadcrumbSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { ShieldCheck, Search, ClipboardCheck, Thermometer, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Certifications = () => {
  return (
    <>
      <SEO
        title="Certifications & Quality Standards"
        description="PharmooWorld certifications — product authenticity verification, supplier vetting, GMP compliance, quality inspection, and storage monitoring for pharmaceutical products."
        keywords="pharmaceutical certifications, GMP compliance, product authenticity, quality assurance, supplier vetting, pharmaceutical quality control"
        canonical="/certifications"
        structuredData={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Certifications", url: "/certifications" },
        ])}
      />

      <Layout>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Certifications & Quality Standards
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                PharmooWorld upholds the highest industry standards for product quality, authenticity, and supply chain integrity. Our multi-layered quality framework ensures every product meets or exceeds regulatory requirements.
              </p>

              <div className="space-y-8">
                {/* Product Authenticity */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Product Authenticity Verification
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Every product distributed by PharmooWorld undergoes rigorous authenticity verification before reaching our customers. Our anti-counterfeiting measures include:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>Direct sourcing</strong> — Products are procured exclusively from authorized manufacturers, their designated agents, or licensed wholesalers with verifiable distribution agreements</li>
                      <li><strong>Batch verification</strong> — Lot numbers and expiration dates are cross-referenced with manufacturer records to confirm authenticity</li>
                      <li><strong>Serialization compliance</strong> — For markets requiring track-and-trace (EU FMD, US DSCSA), we verify serialization data at the unit level</li>
                      <li><strong>Packaging inspection</strong> — Visual and tactile inspection of product packaging, labels, holograms, and tamper-evident seals against manufacturer reference samples</li>
                      <li><strong>Documentation trail</strong> — Complete chain-of-custody documentation from manufacturer to customer, including purchase orders, delivery notes, and CoA</li>
                    </ul>
                    <p>PharmooWorld has a zero-tolerance policy for counterfeit, diverted, or adulterated products. Any product that fails our verification process is rejected and reported to the manufacturer and relevant authorities.</p>
                  </div>
                </section>

                {/* Supplier Vetting */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Supplier Vetting & Qualification
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>PharmooWorld maintains a rigorous supplier qualification program to ensure all supply chain partners meet our quality and compliance standards:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Verification of manufacturing site GMP certificates and regulatory licenses</li>
                      <li>Review of FDA establishment registrations, CE marking, and ISO certifications</li>
                      <li>Assessment of quality management systems (QMS) and standard operating procedures</li>
                      <li>Evaluation of storage conditions, temperature monitoring systems, and GDP compliance</li>
                      <li>Financial stability and business continuity assessments</li>
                      <li>Regular supplier performance reviews and corrective action tracking</li>
                    </ul>
                    <p>New suppliers undergo a comprehensive qualification process before being approved for procurement. Existing suppliers are re-evaluated annually to maintain their approved status.</p>
                  </div>
                </section>

                {/* Quality Inspection */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                    Quality Inspection Process
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>All products undergo a multi-point quality inspection process upon receipt at our facilities and before dispatch to customers:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>Incoming inspection</strong> — Verification of product identity, quantity, lot numbers, expiration dates, packaging integrity, and cold chain documentation</li>
                      <li><strong>Document review</strong> — CoA, CoC, and shipping documentation checked for completeness and accuracy</li>
                      <li><strong>Storage assignment</strong> — Products assigned to appropriate temperature-controlled storage zones based on product requirements</li>
                      <li><strong>Pre-dispatch check</strong> — Final verification of product identity, quantity, expiry (minimum shelf life requirements), and packaging condition before shipment</li>
                      <li><strong>Cold chain preparation</strong> — Temperature-sensitive products packed in validated shipping configurations with pre-conditioned coolants and temperature monitors</li>
                    </ul>
                  </div>
                </section>

                {/* Storage Monitoring */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-primary" />
                    Storage Monitoring & Environmental Control
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Our storage facilities maintain pharmaceutical-grade environmental controls:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li><strong>Temperature monitoring</strong> — Continuous digital temperature logging in all storage areas with automated alarm systems for excursions</li>
                      <li><strong>Dedicated zones</strong> — Separate storage zones for cold chain (2–8°C), controlled room temperature (15–25°C), and ambient products</li>
                      <li><strong>Backup systems</strong> — Redundant cooling/heating systems, UPS power backup, and emergency procedures for equipment failures</li>
                      <li><strong>Access control</strong> — Restricted access to pharmaceutical storage areas with visitor logging and security monitoring</li>
                      <li><strong>Pest control</strong> — Regular professional pest control treatments and monitoring programs</li>
                      <li><strong>Cleaning protocols</strong> — Scheduled cleaning and sanitization of all storage and handling areas</li>
                    </ul>
                  </div>
                </section>

                {/* Industry Standards */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Industry Standards & Frameworks
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">GMP</p>
                      <p className="text-sm text-muted-foreground">Good Manufacturing Practice — Products sourced from GMP-certified facilities</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">GDP</p>
                      <p className="text-sm text-muted-foreground">Good Distribution Practice — Distribution operations follow EU GDP guidelines</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">WHO</p>
                      <p className="text-sm text-muted-foreground">World Health Organization — Products meet WHO prequalification standards</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">FDA</p>
                      <p className="text-sm text-muted-foreground">US Food & Drug Administration — FDA-registered establishment</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">CE</p>
                      <p className="text-sm text-muted-foreground">CE Marking — Medical devices conform to EU safety standards</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-4 text-center">
                      <p className="font-bold text-lg text-foreground">ISO</p>
                      <p className="text-sm text-muted-foreground">ISO Standards — Quality management aligned with ISO 9001 and ISO 13485</p>
                    </div>
                  </div>
                </section>

                {/* CTA */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Request Documentation</h2>
                  <p className="text-muted-foreground mb-4">Need certificates, CoA, or quality documentation for specific products? Our quality team is here to help.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Request Documentation</Link>
                    <Link to="/compliance" className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">View Compliance Info</Link>
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

export default Certifications;
