import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, Shield, FileCheck, Truck, CheckCircle } from "lucide-react";

const CTASection = () => {
  const trustBadges = [
    { icon: Shield, label: "GMP Certified" },
    { icon: FileCheck, label: "COA Available" },
    { icon: Truck, label: "Global Shipping" },
    { icon: CheckCircle, label: "Secure Payment" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container-pharma">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - CTA Card */}
          <Card className="border-border">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Ready to Partner with Us?
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of healthcare providers who trust Pharmoo World for their pharmaceutical and medical supply needs.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="flex-1 min-w-[150px]">
                  <Button size="lg" className="w-full h-12 gradient-medical text-white border-0 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all">
                    Start Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact" className="flex-1 min-w-[150px]">
                  <Button size="lg" variant="outline" className="w-full h-12 border-2">
                    Contact Sales
                  </Button>
                </Link>
              </div>

              {/* Trust badges row */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <badge.icon className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">{badge.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right - Contact Card */}
          <Card className="border-border">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Contact Our Sales Team
                </h3>
                <p className="text-sm text-muted-foreground">
                  Have questions about bulk orders, pricing, or regulatory requirements? Our team is here to help.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="tel:+4012324508" 
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">+401 - 232 - 4508</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </a>

                <a 
                  href="mailto:sales@pharmooworld.com" 
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">sales@pharmooworld.com</p>
                    <p className="text-sm text-muted-foreground">24-48 hour response time</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
