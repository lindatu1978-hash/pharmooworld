import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 gradient-medical">
      <div className="container-pharma">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Place Your Order?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of healthcare providers and distributors who trust Pharmoo World for their pharmaceutical needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/products">
              <Button size="lg" variant="secondary" className="gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Sales Team
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm opacity-90">
            <a href="tel:+4012324508" className="flex items-center gap-2 hover:opacity-100">
              <Phone className="h-4 w-4" />
              +401 - 232 - 4508
            </a>
            <a href="mailto:sales@pharmooworld.com" className="flex items-center gap-2 hover:opacity-100">
              <Mail className="h-4 w-4" />
              sales@pharmooworld.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;