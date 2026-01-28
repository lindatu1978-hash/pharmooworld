import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";

const CTASection = () => {
  const benefits = [
    "Dedicated account manager",
    "Priority order processing",
    "Custom pricing available",
    "24/7 support access",
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-medical" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="relative container-pharma">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Ready to Partner with Pharmoo World?
              </h2>
              <p className="text-xl text-white/90 max-w-xl">
                Join thousands of healthcare providers and distributors who trust us for their pharmaceutical needs.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="h-5 w-5 text-white/70 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold shadow-lg">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Contact Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-4">
              <a 
                href="tel:+4012324508" 
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Call Us</p>
                  <p className="text-lg font-semibold text-white">+401 - 232 - 4508</p>
                </div>
              </a>

              <a 
                href="mailto:sales@pharmooworld.com" 
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email Us</p>
                  <p className="text-lg font-semibold text-white">sales@pharmooworld.com</p>
                </div>
              </a>

              <Link 
                to="/contact"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Request Quote</p>
                  <p className="text-lg font-semibold text-white">Get Custom Pricing</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;