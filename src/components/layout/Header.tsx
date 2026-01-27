import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const categories = [
    { name: "Finished Pharmaceuticals", slug: "finished-pharmaceuticals" },
    { name: "APIs & Raw Materials", slug: "apis-raw-materials" },
    { name: "Botulinum", slug: "Botulinum-products" },
    { name: "Dermal Fillers", slug: "Dermal-Fillers" },
    { name: "Hospital Supplies", slug: "hospital-supplies" },
    { name: "Medical Devices", slug: "medical-devices" },
    { name: "OTC Products", slug: "otc-products" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-pharma py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:opacity-80">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@pharmooworld.com" className="flex items-center gap-1 hover:opacity-80">
              <Mail className="h-3 w-3" />
              <span className="hidden sm:inline">info@pharmooworld.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">GMP Certified • WHO Compliant • Global Shipping</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-pharma py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg gradient-medical flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Pharmoo</span>
              <span className="text-xl font-bold text-primary">World</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products, APIs, medical supplies..." 
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/account">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden mt-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t border-border bg-secondary/50">
        <div className="container-pharma">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/products"
                className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors rounded-md"
              >
                All Products
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary transition-colors rounded-md whitespace-nowrap"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container-pharma py-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border pt-2 mt-2">
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;