import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Award, Truck, CheckCircle, Globe, ArrowRight, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const stats = [
    { value: "500+", label: "Products" },
    { value: "50+", label: "Countries" },
    { value: "10K+", label: "Orders" },
    { value: "99.8%", label: "Satisfaction" },
  ];

  const trustBadges = [
    { icon: Shield, label: "GMP Certified" },
    { icon: Award, label: "WHO Compliant" },
    { icon: Shield, label: "FDA Registered" },
    { icon: Globe, label: "Global Shipping" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container-pharma py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-4 py-1.5">
                <CheckCircle className="h-3.5 w-3.5 mr-2" />
                Trusted by 10,000+ Healthcare Providers
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Your Global Partner for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Pharmaceutical Excellence
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Premium medicines, APIs, dermal fillers, and medical supplies. 
                GMP-certified quality with worldwide regulatory compliance and logistics support.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="h-12 px-8 text-base gradient-medical hover:opacity-90 text-white border-0 shadow-lg shadow-primary/25">
                  Browse Catalog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2">
                  Request Quote
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-muted-foreground shadow-sm"
                >
                  <badge.icon className="h-4 w-4 text-accent" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-card border border-border rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl gradient-medical flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Pharmoo World</p>
                      <p className="text-sm text-muted-foreground">Global Distributor</p>
                    </div>
                  </div>
                  <Badge className="bg-accent/10 text-accent border-0">Verified</Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-secondary/50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini Product Preview */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Popular Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {["Dermal Fillers", "Botulinum", "APIs", "Medical Devices"].map((cat) => (
                      <span key={cat} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-4 py-3 shadow-lg animate-bounce-slow">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  <span className="font-semibold">Free Shipping $5K+</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-medium">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">500+ Buyers</p>
                    <p className="text-xs text-muted-foreground">Joined this month</p>
                  </div>
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