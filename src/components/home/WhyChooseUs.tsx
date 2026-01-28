import { CheckCircle, Shield, DollarSign, Truck, Users, FileCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "All products from GMP-certified facilities meeting international standards.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: FileCheck,
      title: "Full Documentation",
      description: "COA, MSDS, GMP certificates, and complete batch traceability provided.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Bulk discounts and competitive wholesale rates for all orders.",
      color: "bg-warning/10 text-warning",
    },
    {
      icon: Truck,
      title: "Global Logistics",
      description: "Temperature-controlled shipping to 50+ countries worldwide.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Users,
      title: "Verified Network",
      description: "Secure buyer verification ensuring legitimate transactions.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description: "Bank wire, escrow, and corporate invoicing options available.",
      color: "bg-success/10 text-success",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container-pharma">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Why Pharmoo World</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Your Trusted Partner in Global Pharmaceutical Distribution
              </h2>
              <p className="text-lg text-muted-foreground">
                We combine industry expertise with cutting-edge logistics to deliver pharmaceutical excellence to healthcare providers worldwide.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`h-10 w-10 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="outline" className="group">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Feature Cards */}
          <div className="grid gap-4">
            {features.slice(4).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
              >
                <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">15+</p>
                  <p className="text-sm text-white/80">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm text-white/80">Countries Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">99%</p>
                  <p className="text-sm text-white/80">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;