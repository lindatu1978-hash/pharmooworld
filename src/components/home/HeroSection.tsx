import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Award, Truck, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const trustBadges = [
    { icon: Shield, label: "GMP Certified" },
    { icon: Award, label: "WHO Compliant" },
    { icon: Shield, label: "FDA Registered" },
    { icon: CheckCircle, label: "Secure Payments" },
    { icon: Truck, label: "Global Shipping" },
  ];

  return (
    <section className="relative gradient-hero py-16 lg:py-24">
      <div className="container-pharma">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight text-balance">
                Global Pharmaceutical & Medical Supplies
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Trusted by Healthcare Providers Worldwide. High-quality medicines, APIs, cosmetics and medical products delivered with regulatory compliance and global logistics support.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="gradient-medical hover:opacity-90 text-white border-0">
                  Shop Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Request a Quote
                </Button>
              </Link>
              <Link to="/certifications">
                <Button size="lg" variant="ghost">
                  Verify Certifications
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="trust-badge"
                >
                  <badge.icon className="h-4 w-4" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 gradient-medical rounded-full opacity-10 animate-pulse" />
              <div className="absolute inset-8 bg-primary/20 rounded-full" />
              <div className="absolute inset-16 bg-card rounded-full shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="h-16 w-16 rounded-2xl gradient-medical flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">P</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">Pharmoo World</p>
                  <p className="text-muted-foreground">Your Trusted Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;