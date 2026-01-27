import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, CheckCircle, Users, Lock, Clock, FileCheck, HeadphonesIcon } from "lucide-react";

const ClientAssurance = () => {
  const assurances = [
    {
      icon: Shield,
      title: "GMP & Regulatory Verified Suppliers",
      description: "All our suppliers are verified to meet Good Manufacturing Practice standards and comply with international pharmaceutical regulations including WHO, FDA, and EMA guidelines."
    },
    {
      icon: FileCheck,
      title: "Transparent Sourcing",
      description: "Complete supply chain transparency with full documentation including Certificates of Analysis, Material Safety Data Sheets, and batch traceability records."
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "Bank-grade encryption for all transactions. Multiple secure payment options including verified bank transfers and escrow services for large orders."
    },
    {
      icon: CheckCircle,
      title: "Confidentiality",
      description: "Strict confidentiality protocols for all client information, orders, and business relationships. Your data is protected and never shared with third parties."
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Every product is quality-verified before shipment. We stand behind our products with a comprehensive quality guarantee and dispute resolution process."
    },
    {
      icon: Users,
      title: "Dedicated Account Managers",
      description: "Each verified client is assigned a dedicated account manager who understands your business needs and provides personalized service and support."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical and customer support. Our team is available to assist with orders, documentation, and any questions you may have."
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Consultation",
      description: "Access to pharmaceutical experts for product selection, regulatory guidance, and technical specifications to ensure you get exactly what you need."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Client Assurance | Pharmoo World</title>
        <meta name="description" content="Our commitment to quality, security, and customer satisfaction in pharmaceutical distribution." />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Client Assurance
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Our commitment to quality, security, and exceptional service for all our clients worldwide.
            </p>
          </div>
        </div>

        <div className="container-pharma py-12">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <p className="text-lg text-muted-foreground">
              At Pharmoo World, we understand that trust is essential in pharmaceutical distribution. That's why we've built our business on a foundation of transparency, quality, and unwavering commitment to our clients' success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {assurances.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="h-12 w-12 rounded-xl gradient-medical flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 gradient-medical text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Join thousands of healthcare providers and distributors who trust Pharmoo World for their pharmaceutical needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors">
                  Browse Products
                </a>
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default ClientAssurance;