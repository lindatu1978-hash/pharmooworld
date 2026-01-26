import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Award, Truck, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 opacity-80" />
              <div>
                <div className="font-semibold">GMP Certified</div>
                <div className="text-sm opacity-80">Quality Assured</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 opacity-80" />
              <div>
                <div className="font-semibold">WHO Compliant</div>
                <div className="text-sm opacity-80">Global Standards</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 opacity-80" />
              <div>
                <div className="font-semibold">Global Shipping</div>
                <div className="text-sm opacity-80">Worldwide Delivery</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 opacity-80" />
              <div>
                <div className="font-semibold">24/7 Support</div>
                <div className="text-sm opacity-80">Always Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-lg">P</span>
              </div>
              <div>
                <span className="font-bold text-xl">Pharmoo</span>
                <span className="font-light text-xl">World</span>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Global pharmaceutical and medical supplies distributor serving healthcare providers worldwide with high-quality products and regulatory compliance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@pharmooworld.com" className="hover:underline">info@pharmooworld.com</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Global Headquarters</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/products?category=finished-pharmaceuticals" className="hover:underline">Finished Pharmaceuticals</Link></li>
              <li><Link to="/products?category=apis-raw-materials" className="hover:underline">APIs & Raw Materials</Link></li>
              <li><Link to="/products?category=otc-products" className="hover:underline">OTC Products</Link></li>
              <li><Link to="/products?category=medical-devices" className="hover:underline">Medical Devices</Link></li>
              <li><Link to="/products?category=hospital-supplies" className="hover:underline">Hospital Supplies</Link></li>
              <li><Link to="/products?category=wellness-products" className="hover:underline">Wellness Products</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/certifications" className="hover:underline">Certifications</Link></li>
              <li><Link to="/client-assurance" className="hover:underline">Client Assurance</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/request-quote" className="hover:underline">Request Quote</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/legal-disclaimer" className="hover:underline">Legal Disclaimer</Link></li>
              <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
            <p>© {new Date().getFullYear()} Pharmoo World. All rights reserved.</p>
            <p>Products are supplied in compliance with international pharmaceutical regulations.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
