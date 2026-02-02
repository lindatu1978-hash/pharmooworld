import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, MessageSquare } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container-pharma">
        <Card className="gradient-medical border-0 overflow-hidden">
          <CardContent className="p-5 sm:p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Left - CTA Content */}
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Ready to Partner with Us?
                  </h2>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg">
                    Join thousands of healthcare providers who trust Pharmoo World for their pharmaceutical and medical supply needs.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                  <Link to="/products" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-foreground hover:bg-white/90 shadow-lg h-12">
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 h-12">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right - Contact Info */}
              <div className="space-y-3 md:space-y-4">
                <a 
                  href="tel:+4012324508" 
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all min-h-[60px]"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm md:text-base">+401 - 232 - 4508</p>
                    <p className="text-xs md:text-sm text-white/70">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </a>

                <a 
                  href="mailto:sales@pharmooworld.com" 
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all min-h-[60px]"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm md:text-base truncate">sales@pharmooworld.com</p>
                    <p className="text-xs md:text-sm text-white/70">24-48 hour response time</p>
                  </div>
                </a>

                <Link 
                  to="/contact"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 transition-all min-h-[60px]"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white text-sm md:text-base">Live Chat Support</p>
                    <p className="text-xs md:text-sm text-white/70">Get instant assistance</p>
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