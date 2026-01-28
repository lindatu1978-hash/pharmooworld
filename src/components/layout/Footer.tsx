import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Award, Truck, CheckCircle, Globe } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/pharmooworld" },
    { name: "Facebook", url: "https://www.facebook.com/pharmooworld" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCt_tncVAetpK5JeM8L-8jyw" },
    { name: "Instagram", url: "https://www.instagram.com/pharmooworld/" },
    { name: "Pinterest", url: "https://www.pinterest.co.uk/pharmooworld" },
  ];

  const operationLocations = [
    "Nairobi, Kenya",
    "Bangkok, Thailand",
    "Hamburg, Germany",
    "Durban, South Africa",
    "London, United Kingdom",
  ];

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
                <p className="font-semibold">14 Days Return</p>
                <p className="text-sm opacity-80">Return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-pharma py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg gradient-medical flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-lg font-bold">Pharmoo World</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              PharmooWorld has been a significant player in the exportation of pharmaceutical products across Europe, Asia, Australia, Americas, Canada and African markets. We pride ourselves with efficiency, reliability and customer satisfaction.
            </p>
            <div className="space-y-2 text-sm mb-4">
              <a href="mailto:info@pharmooworld.com" className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" />
                info@pharmooworld.com
              </a>
              <a href="mailto:sales@pharmooworld.com" className="flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" />
                sales@pharmooworld.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>1914 S Vermont Ave,<br />Los Angeles, CA 90006, USA</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/products?category=Botulinum-products" className="hover:text-accent">Botulinums</Link></li>
              <li><Link to="/products?category=Dermal-Fillers" className="hover:text-accent">Dermal Fillers</Link></li>
              <li><Link to="/products?category=hospital-supplies" className="hover:text-accent">Surgical Equipment</Link></li>
              <li><Link to="/products?category=hydrogel-injection" className="hover:text-accent">Hydrogel Injections</Link></li>
              <li><Link to="/products?category=implants" className="hover:text-accent">Implants</Link></li>
              <li><Link to="/products?category=snake-venom" className="hover:text-accent">Venom</Link></li>
              <li><Link to="/products?category=face-masks-ppe" className="hover:text-accent">Face Masks & PPE</Link></li>
              <li><Link to="/products?category=medical-devices" className="hover:text-accent">Needles & Cannulas</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/testimonials" className="hover:text-accent">Customer Reviews</Link></li>
              <li><Link to="/client-assurance" className="hover:text-accent">Client Assurance</Link></li>
              <li><Link to="/shipping" className="hover:text-accent">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-accent">Returns Policy</Link></li>
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
            </ul>
            <h3 className="font-semibold mb-3 mt-6">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-accent">Legal Disclaimer</Link></li>
            </ul>
          </div>

          {/* Operation Locations */}
          <div>
            <h3 className="font-semibold mb-4">Operation Locations</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {operationLocations.map((location) => (
                <li key={location} className="flex items-center gap-2">
                  <Globe className="h-3 w-3" />
                  {location}
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-primary-foreground/10 rounded-lg">
              <p className="text-xs font-semibold mb-1">Head Office</p>
              <p className="text-xs opacity-80">
                Pharmoo World<br />
                1914 S Vermont Ave,<br />
                Los Angeles, CA 90006, USA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container-pharma py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>© {new Date().getFullYear()} Pharmoo World LLC. All rights reserved.</p>
            <p>All pharmaceutical products are supplied in compliance with international regulatory standards.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;