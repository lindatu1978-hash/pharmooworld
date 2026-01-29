import { Shield, FileCheck, DollarSign, Truck, Users, CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "GMP-certified facilities meeting international standards.",
    },
    {
      icon: FileCheck,
      title: "Full Documentation",
      description: "COA, MSDS, certificates, and batch traceability.",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Bulk discounts and wholesale rates for all orders.",
    },
    {
      icon: Truck,
      title: "Global Logistics",
      description: "Temperature-controlled shipping to 50+ countries.",
    },
    {
      icon: Users,
      title: "Verified Network",
      description: "Secure buyer verification for legitimate transactions.",
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description: "Bank wire, escrow, and corporate invoicing.",
    },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="container-pharma">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary mb-3">Why Pharmoo World</p>
          <h2 className="text-foreground mb-4">
            Your Trusted Partner in Pharmaceutical Distribution
          </h2>
          <p className="text-muted-foreground">
            Industry expertise combined with cutting-edge logistics for pharmaceutical excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 p-8 rounded-2xl gradient-medical">
          <div className="grid grid-cols-3 gap-8 text-center text-white">
            <div>
              <p className="text-3xl lg:text-4xl font-bold">15+</p>
              <p className="text-sm text-white/80 mt-1">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold">50+</p>
              <p className="text-sm text-white/80 mt-1">Countries Served</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold">99%</p>
              <p className="text-sm text-white/80 mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;