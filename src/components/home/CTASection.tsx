import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-24 bg-muted/50">
      <div className="container-pharma">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-foreground">
              Ready to Partner with Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of healthcare providers who trust Pharmoo World for their pharmaceutical needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="h-12 px-8 text-base gradient-medical text-white border-0 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-2">
                Contact Sales
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border">
            <a 
              href="tel:+4012324508" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+401 - 232 - 4508</span>
            </a>
            <a 
              href="mailto:sales@pharmooworld.com" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>sales@pharmooworld.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;