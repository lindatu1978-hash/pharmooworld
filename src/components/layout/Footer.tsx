import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  const productLinks = [
    { name: "Botulinums", href: "/products?category=Botulinum-products" },
    { name: "Dermal Fillers", href: "/products?category=Dermal-Fillers" },
    { name: "Surgical Equipment", href: "/products?category=hospital-supplies" },
    { name: "Medical Devices", href: "/products?category=medical-devices" },
    { name: "Snake Venom", href: "/products?category=snake-venom" },
  ];
  
  const infoLinks = [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Shipping & Delivery", href: "/shipping" },
    { name: "Cold Chain Shipping", href: "/shipping-cold-chain" },
    { name: "Returns Policy", href: "/returns" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];
  
  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Compliance", href: "/compliance" },
    { name: "Certifications", href: "/certifications" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground safe-area-bottom">
      {/* Main Footer */}
      <div className="container-pharma py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 md:h-8 md:w-8 rounded-lg gradient-medical flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-lg font-bold">Pharmoo World</span>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              Licensed international pharmaceutical distributor serving medical professionals worldwide with GMP-certified products, competitive wholesale pricing, and reliable cold chain logistics.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <a 
                href="mailto:sales@pharmooworld.com" 
                className="flex items-center gap-3 min-h-[44px] hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5 shrink-0" />
                sales@pharmooworld.com
              </a>
              <a 
                href="tel:+14012324508" 
                className="flex items-center gap-3 min-h-[44px] hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-5 w-5 shrink-0" />
                +401-232-4508
              </a>
              <a 
                href="https://wa.me/14012324508" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 min-h-[44px] hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                WhatsApp
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <span>1914 S Vermont Ave, Los Angeles, CA 90006</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Products</h3>
            <ul className="space-y-1">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Information</h3>
            <ul className="space-y-1">
              {infoLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Legal</h3>
            <ul className="space-y-1">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="block py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-primary-foreground/5 rounded-lg">
              <p className="text-sm font-medium mb-1">Certifications</p>
              <p className="text-xs text-primary-foreground/60">GMP • GDP • WHO • FDA Registered • CE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Disclaimer */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-pharma py-4">
          <p className="text-xs text-primary-foreground/50 leading-relaxed text-center max-w-4xl mx-auto">
            <strong>Professional Disclaimer:</strong> Products sold by PharmooWorld are intended for use by licensed healthcare professionals only. Botulinum toxins, dermal fillers, and other prescription-grade injectables require valid medical credentials for purchase. All professional licenses are verified before order fulfillment. PharmooWorld does not provide medical advice — consult product prescribing information and relevant clinical guidelines before use.
          </p>
        </div>
      </div>

      {/* Business Registration & Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-pharma py-6">
          <div className="text-center space-y-2">
            <p className="text-xs text-primary-foreground/50">
              Pharmoo World LLC • Registered in the United States • 1914 S Vermont Ave, Los Angeles, CA 90006
            </p>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Pharmoo World LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
