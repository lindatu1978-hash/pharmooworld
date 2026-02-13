import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  const productLinks = [
    { name: "Botulinums", href: "/products?category=Botulinum-products" },
    { name: "Dermal Fillers", href: "/products?category=Dermal-Fillers" },
    { name: "Surgical Equipment", href: "/products?category=hospital-supplies" },
    { name: "Medical Devices", href: "/products?category=medical-devices" },
  ];
  
  const infoLinks = [
    { name: "About Us", href: "/about" },
    { name: "Shipping & Delivery", href: "/shipping" },
    { name: "Returns Policy", href: "/returns" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];
  
  const legalLinks = [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];
  

  return (
    <footer className="bg-foreground text-primary-foreground safe-area-bottom">
      {/* Main Footer */}
      <div className="container-pharma py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 md:h-8 md:w-8 rounded-lg gradient-medical flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-lg font-bold">Pharmoo World</span>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed">
              PharmooWorld has been around for a while and it's has also been a significant players in the exportation of a variety of Pharmaceutical products in Europe/Asia/Australia/American/Canada and African markets. PharmoWorld pride itself with efficiency, reliability and customer satisfaction.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <a 
                href="mailto:info@pharmooworld.com" 
                className="flex items-center gap-3 min-h-[44px] hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                info@pharmooworld.com
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
              <p className="text-xs text-primary-foreground/60">GMP • WHO • FDA Registered</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-base">Partner Sites</h3>
              <ul className="space-y-1">
                <li>
                  <a 
                    href="https://www.rcchemicallab.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors min-h-[44px] flex items-center"
                  >
                    RC Chemical Lab
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-pharma py-6">
          <p className="text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} Pharmoo World LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;