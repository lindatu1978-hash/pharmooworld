import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, Truck, CheckCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Trust Bar */}
      <div className="border-b border-primary-foreground/20">
        <div className="container-pharma py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">GMP Certified</p>
                <p className="text-sm opacity-80">Quality assured</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">WHO Compliant</p>
                <p className="text-sm opacity-80">Global standards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">Global Shipping</p>
                <p className="text-sm opacity-80">Worldwide delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-accent" />
              <div>
                <p className="font-semibold">Secure Payments</p>
                <p className="text-sm opacity-80">Safe transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-pharma py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-medical flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-lg font-bold">Pharmoo World</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Global pharmaceutical and medical supplies distributor. Trusted by healthcare providers worldwide with GMP-certified products and regulatory compliance.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+4012324508" className="flex items-center gap-2 hover:text-accent">
                <Phone className="h-4 w-4" />
                +401 - 232 - 4508
              </a>
              <a href="mailto:info@pharmooworld.com" className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" />
                info@pharmooworld.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Medical Drive, Suite 100<br />New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/products?category=finished-pharmaceuticals" className="hover:text-accent">Finished Pharmaceuticals</Link></li>
              <li><Link to="/products?category=apis-raw-materials" className="hover:text-accent">APIs & Raw Materials</Link></li>
              <li><Link to="/products?category=Botulinum-products" className="hover:text-accent">Botulinum</Link></li>
              <li><Link to="/products?category=Dermal-Fillers" className="hover:text-accent">Dermal Fillers</Link></li>
              <li><Link to="/products?category=hospital-supplies" className="hover:text-accent">Hospital Supplies</Link></li>
              <li><Link to="/products?category=medical-devices" className="hover:text-accent">Medical Devices</Link></li>
              <li><Link to="/products?category=otc-products" className="hover:text-accent">OTC Products</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/testimonials" className="hover:text-accent">Customer Reviews</Link></li>
              <li><Link to="/client-assurance" className="hover:text-accent">Client Assurance</Link></li>
              <li><Link to="/certifications" className="hover:text-accent">Certifications</Link></li>
              <li><Link to="/shipping" className="hover:text-accent">Shipping & Delivery</Link></li>
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-accent">Legal Disclaimer</Link></li>
              <li><Link to="/returns" className="hover:text-accent">Returns Policy</Link></li>
              <li><Link to="/compliance" className="hover:text-accent">Regulatory Compliance</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-pharma py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© {new Date().getFullYear()} Pharmoo World. All rights reserved.</p>
            <p>All pharmaceutical products are supplied in compliance with international regulatory standards.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;