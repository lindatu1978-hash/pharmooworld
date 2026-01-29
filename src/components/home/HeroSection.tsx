import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Award, Truck, Globe, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const stats = [
    { value: "500+", label: "Products" },
    { value: "50+", label: "Countries" },
    { value: "10K+", label: "Orders" },
  ];

  const trustBadges = [
    { icon: Shield, label: "GMP Certified" },
    { icon: Award, label: "WHO Compliant" },
    { icon: Globe, label: "Global Shipping" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-muted/50 to-background">
      <div className="container-pharma py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust badges - minimal pill style */}
          <div className="flex flex-wrap justify-center gap-3">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-foreground">
              Global Pharmaceutical{" "}
              <span className="text-primary">Excellence</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium medicines, APIs, dermal fillers, and medical supplies. 
              Certified quality with worldwide regulatory compliance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/products">
              <Button size="lg" className="h-12 px-8 text-base gradient-medical text-white border-0 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all">
                Browse Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2 hover:bg-muted/50">
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Stats - Clean horizontal */}
          <div className="flex justify-center gap-12 pt-8 border-t border-border mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;