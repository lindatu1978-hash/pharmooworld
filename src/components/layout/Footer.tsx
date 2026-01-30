import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
const Footer = () => {
  const productLinks = [{
    name: "Botulinums",
    href: "/products?category=Botulinum-products"
  }, {
    name: "Dermal Fillers",
    href: "/products?category=Dermal-Fillers"
  }, {
    name: "Surgical Equipment",
    href: "/products?category=hospital-supplies"
  }, {
    name: "Medical Devices",
    href: "/products?category=medical-devices"
  }];
  const infoLinks = [{
    name: "About Us",
    href: "/about"
  }, {
    name: "Shipping & Delivery",
    href: "/shipping"
  }, {
    name: "Returns Policy",
    href: "/returns"
  }, {
    name: "FAQ",
    href: "/faq"
  }, {
    name: "Contact",
    href: "/contact"
  }];
  const legalLinks = [{
    name: "Terms & Conditions",
    href: "/terms"
  }, {
    name: "Privacy Policy",
    href: "/privacy"
  }, {
    name: "Disclaimer",
    href: "/disclaimer"
  }];
  return <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container-pharma py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-medical flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-lg font-bold">Pharmoo World</span>
            </div>
            <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed">PharmooWorld has been around for a while and it's has also been a significant players in the exportation of a variety of Pharmaceutical products in Europe/Asia/Australia/American/Canada and African markets.  PharmoWorld pride itself with efficiency, reliability and customer satisfaction.  </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <a href="mailto:info@pharmooworld.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
                info@pharmooworld.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>1914 S Vermont Ave, Los Angeles, CA 90006</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              {productLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-3 text-sm">
              {infoLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
            <div className="mt-8 p-4 bg-primary-foreground/5 rounded-lg">
              <p className="text-xs font-medium mb-1">Certifications</p>
              <p className="text-xs text-primary-foreground/60">GMP • WHO • FDA Registered</p>
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
    </footer>;
};
export default Footer;