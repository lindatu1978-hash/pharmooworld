import SEO, { createBreadcrumbSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Shield, FileCheck, Globe, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Compliance = () => {
  return (
    <>
      <SEO
        title="Compliance & Regulatory Standards"
        description="PharmooWorld compliance standards — licensed pharmaceutical distribution, GMP certification, export regulations, professional verification, and quality assurance for medical supplies."
        keywords="pharmaceutical compliance, GMP certified, FDA registered, WHO standards, licensed distributor, export compliance"
        canonical="/compliance"
        structuredData={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Compliance", url: "/compliance" },
        ])}
      />

      <Layout>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Compliance & Regulatory Standards
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                PharmooWorld operates under strict pharmaceutical distribution standards to ensure product safety, authenticity, and regulatory compliance across all markets we serve.
              </p>

              <div className="space-y-8">
                {/* Licensed Distribution */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Licensed Pharmaceutical Distribution
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>PharmooWorld is a licensed pharmaceutical distributor operating in compliance with applicable national and international regulations governing the wholesale distribution of pharmaceutical products, medical devices, and aesthetic injectables.</p>
                    <p>Our distribution activities adhere to Good Distribution Practice (GDP) guidelines as defined by the EU GDP Guidelines (2013/C 343/01) and equivalent standards in other jurisdictions. This includes maintaining proper temperature-controlled storage facilities, documented quality management systems, qualified personnel, and comprehensive traceability for all products handled.</p>
                    <p>We maintain all necessary licenses and permits required for the lawful distribution and export of pharmaceutical products, including controlled substances documentation where applicable. Our regulatory affairs team continuously monitors changes in pharmaceutical legislation across our operating markets to ensure ongoing compliance.</p>
                  </div>
                </section>

                {/* Sourcing Standards */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Pharmaceutical Sourcing Standards
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>All products distributed by PharmooWorld are sourced exclusively from authorized manufacturers, licensed wholesalers, and verified distribution channels. We never source from grey market suppliers, unauthorized parallel importers, or unverified intermediaries.</p>
                    <p>Our sourcing standards include:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Supplier qualification and audit programs to verify manufacturing site GMP compliance</li>
                      <li>Verification of manufacturer authorization letters and distribution agreements</li>
                      <li>Batch-level documentation including Certificates of Analysis (CoA), Certificates of Conformity, and stability data</li>
                      <li>Serialization and anti-counterfeiting verification where applicable (EU FMD, DSCSA)</li>
                      <li>Regular supplier performance reviews and corrective action processes</li>
                    </ul>
                  </div>
                </section>

                {/* Export Compliance */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Export Compliance & International Regulations
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>PharmooWorld exports pharmaceutical products and medical devices to over 50 countries worldwide. Our export operations comply with all applicable trade regulations, export controls, and sanctions requirements.</p>
                    <p>For each international shipment, we provide:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Commercial invoices with HS tariff codes and product declarations</li>
                      <li>Certificates of Origin for customs clearance</li>
                      <li>Free Sale Certificates (FSC) where required by importing country</li>
                      <li>Import permit coordination and end-user certificate support</li>
                      <li>Temperature-controlled shipping documentation and cold chain certificates</li>
                      <li>Compliance with OFAC sanctions screening and denied party lists</li>
                    </ul>
                    <p>Our logistics team works with specialized pharmaceutical freight forwarders experienced in navigating country-specific import regulations for medical products, including registration requirements, labeling standards, and controlled substance declarations.</p>
                  </div>
                </section>

                {/* Professional Verification */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Professional Verification Requirement
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Many products in our catalog — including botulinum toxins, dermal fillers, and other prescription-grade injectables — are restricted to certified healthcare professionals. PharmooWorld enforces strict buyer verification protocols to ensure these products reach only qualified end users.</p>
                    <p>Our verification process includes:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Manual review of professional medical licenses (MD, DO, DDS, NP, PA, etc.)</li>
                      <li>Verification of license validity through issuing authority databases where available</li>
                      <li>Business registration and pharmacy license verification for wholesale buyers</li>
                      <li>End-user declarations for export orders to restricted markets</li>
                    </ul>
                    <p>Orders for restricted products are held pending license verification and are only released upon successful credential confirmation by our compliance team. This process typically takes 1–2 business days for new customers.</p>
                  </div>
                </section>

                {/* Quality Assurance */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Quality Assurance Statement
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>PharmooWorld is committed to maintaining the highest standards of product quality throughout our supply chain. Our quality management system encompasses:</p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      <li>Temperature-monitored storage with continuous data logging and alarm systems</li>
                      <li>First-Expiry-First-Out (FEFO) inventory rotation to minimize expiry risk</li>
                      <li>Incoming quality inspection for all received shipments</li>
                      <li>Product recall management procedures aligned with manufacturer notification systems</li>
                      <li>Customer complaint handling and adverse event reporting processes</li>
                      <li>Regular internal audits and management reviews of quality metrics</li>
                    </ul>
                    <p>All quality assurance activities are documented and available for regulatory inspection. Our Qualified Person (QP) or equivalent oversees all quality-critical operations to ensure compliance with applicable pharmaceutical regulations.</p>
                  </div>
                </section>

                {/* CTA */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Questions About Our Compliance Standards?</h2>
                  <p className="text-muted-foreground mb-4">Contact our regulatory affairs team for documentation requests, audit arrangements, or compliance inquiries.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">Contact Us</Link>
                    <Link to="/certifications" className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">View Certifications</Link>
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

export default Compliance;
