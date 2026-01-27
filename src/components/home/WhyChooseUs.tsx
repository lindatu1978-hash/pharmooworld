import { CheckCircle, Shield, DollarSign, Truck, Users, FileCheck } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Manufacturers",
      description: "All products sourced from GMP-certified facilities meeting international quality standards.",
    },
    {
      icon: FileCheck,
      title: "Regulatory Compliance",
      description: "Full documentation including COA, MSDS, GMP certificates, and batch traceability.",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Bulk pricing options and competitive rates for wholesale pharmaceutical purchases.",
    },
    {
      icon: Truck,
      title: "Fast Global Delivery",
      description: "Reliable worldwide shipping with temperature-controlled logistics when required.",
    },
    {
      icon: Users,
      title: "Buyer Verification",
      description: "Secure buyer verification process ensuring legitimate pharmaceutical transactions.",
    },
    {
      icon: CheckCircle,
      title: "Secure Checkout",
      description: "Multiple secure payment options including bank transfer, escrow, and crypto.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container-pharma">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Pharmoo World
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by healthcare providers and pharmaceutical distributors across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;