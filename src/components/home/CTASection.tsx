import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-12">
      <div className="container-pharma">
        <Card className="gradient-medical border-0 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - CTA Content */}
              <div className="space-y-6 text-center lg:text-left">
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Ready to Partner with Us?
                  </h2>
                  <p className="text-white/80 text-base md:text-lg">
                    Join thousands of healthcare providers who trust Pharmoo World for their pharmaceutical and medical supply needs.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Link to="/products">
                    <Button size="lg" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Contact Info */}
              <div className="space-y-4">
                <a 
                  href="tel:+4012324508" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">+401 - 232 - 4508</p>
                    <p className="text-sm text-white/70">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </a>

                <a 
                  href="mailto:sales@pharmooworld.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">sales@pharmooworld.com</p>
                    <p className="text-sm text-white/70">24-48 hour response time</p>
                  </div>
                </a>

                <Link 
                  to="/contact"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Live Chat Support</p>
                    <p className="text-sm text-white/70">Get instant assistance</p>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
