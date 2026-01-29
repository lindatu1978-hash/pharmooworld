import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Globe, ArrowRight, FileCheck, Truck, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const trustBadges = [
    { icon: Shield, label: "GMP Certified" },
    { icon: Award, label: "WHO Compliant" },
    { icon: Globe, label: "50+ Countries" },
  ];

  const quickStats = [
    { icon: FileCheck, label: "COA Available", description: "Full documentation" },
    { icon: Truck, label: "Global Shipping", description: "Temperature-controlled" },
    { icon: CheckCircle, label: "Secure Payment", description: "Bank wire & escrow" },
    { icon: Shield, label: "Verified Network", description: "Licensed buyers only" },
  ];

  return (
    <section className="bg-secondary/30 py-4">
      <div className="container-pharma">
        {/* Breadcrumb style header */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <span className="text-foreground font-medium">Pharmoo World</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">Global Pharmaceutical Supplier</span>
        </div>
      </div>

      <div className="container-pharma py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Hero Image/Visual */}
          <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/og-image.png')] bg-cover bg-center opacity-20" />
            <div className="relative z-10 text-center p-8">
              <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Premium Quality Assured
              </h2>
              <p className="text-muted-foreground">
                GMP-certified facilities worldwide
              </p>
            </div>
          </div>

          {/* Right Column - Product-style Info */}
          <div className="space-y-6">
            <div>
              {/* Trust badges - like regulatory badges on product page */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trustBadges.map((badge, index) => (
                  <Badge key={index} className="gradient-medical text-white border-0">
                    <badge.icon className="h-3 w-3 mr-1" />
                    {badge.label}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-accent border-accent">
                  Verified Supplier
                </Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Global Pharmaceutical Excellence
              </h1>

              <p className="text-lg text-muted-foreground">
                Your trusted partner for premium medicines, APIs, dermal fillers, and medical supplies.
              </p>
            </div>

            {/* Specs Grid - like product specs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="font-medium text-2xl">500+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="font-medium text-2xl">50+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orders Delivered</p>
                <p className="font-medium text-2xl">10,000+</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
                <p className="font-medium text-2xl">15+</p>
              </div>
            </div>

            {/* CTA Card - like pricing card on product page */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Start exploring our catalog</p>
                    <p className="text-2xl font-bold text-foreground">
                      Wholesale Pricing Available
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <Link to="/products" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full gradient-medical hover:opacity-90 gap-2"
                    >
                      Browse Catalog
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="px-8">
                      Request Quote
                    </Button>
                  </Link>
                </div>

                <p className="text-sm text-accent">
                  Bulk discounts available for orders of 10+ units
                </p>
              </CardContent>
            </Card>

            {/* Trust Icons Row - like product page trust badges */}
            <div className="grid grid-cols-2 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <stat.icon className="h-5 w-5 text-accent" />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
