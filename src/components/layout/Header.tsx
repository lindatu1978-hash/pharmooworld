import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import ProductSearch from "@/components/search/ProductSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const mainCategories = [
    { name: "Botulinum", slug: "Botulinum-products" },
    { name: "Fillers", slug: "Dermal-Fillers" },
    { name: "Pharma", slug: "finished-pharmaceuticals" },
    { name: "APIs", slug: "apis-raw-materials" },
    { name: "Devices", slug: "medical-devices" },
  ];

  const moreCategories = [
    { name: "Hospital Supplies", slug: "hospital-supplies" },
    { name: "Hydrogel Injection", slug: "hydrogel-injection" },
    { name: "Snake Venom", slug: "snake-venom" },
    { name: "PMMA Buttock Injection", slug: "pmma-buttocks-injection" },
    { name: "Implants", slug: "implants" },
    { name: "Face Masks & PPE", slug: "face-masks-ppe" },
    { name: "OTC Products", slug: "otc-products" },
  ];

  const allCategories = [...mainCategories, ...moreCategories];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border safe-area-top">
      {/* Main Header */}
      <div className="container-pharma py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 min-h-[44px]">
            <div className="h-10 w-10 md:h-9 md:w-9 rounded-lg gradient-medical flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-foreground hidden xs:block">
              Pharmoo<span className="text-primary">World</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-lg">
            <ProductSearch className="w-full" />
          </div>

          {/* Actions - Touch-optimized */}
          <div className="flex items-center gap-0.5 md:gap-1">
            <Link to="/account">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-11 w-11 md:h-10 md:w-10 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-11 w-11 md:h-10 md:w-10 text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 md:-top-1 md:-right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-11 w-11 md:h-10 md:w-10 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile - Touch-optimized */}
        <div className="lg:hidden mt-3">
          <ProductSearch className="w-full" placeholder="Search products..." />
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container-pharma">
          <ul className="flex items-center gap-1 -mx-2">
            <li>
              <Link
                to="/products"
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                All Products
              </Link>
            </li>
            {mainCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  More <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-background border border-border shadow-lg">
                  {moreCategories.map((category) => (
                    <DropdownMenuItem key={category.slug} asChild>
                      <Link to={`/products?category=${category.slug}`} className="cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu - Touch-optimized with larger targets */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border max-h-[70vh] overflow-y-auto">
          <nav className="container-pharma py-2 safe-area-bottom">
            <ul className="divide-y divide-border">
              <li>
                <Link
                  to="/products"
                  className="flex items-center min-h-[52px] px-4 py-3 text-base font-medium text-foreground hover:bg-muted active:bg-muted/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Products
                </Link>
              </li>
              {allCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="flex items-center min-h-[52px] px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-2">
                <Link
                  to="/account"
                  className="flex items-center min-h-[52px] px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-3" />
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="flex items-center min-h-[52px] px-4 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  My Orders
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