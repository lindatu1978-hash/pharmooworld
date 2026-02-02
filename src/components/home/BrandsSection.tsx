import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandsSection = () => {
  const brands = [
    { name: "Allergan", slug: "allergan" },
    { name: "Galderma", slug: "galderma" },
    { name: "Merz", slug: "merz" },
    { name: "Ipsen", slug: "ipsen" },
    { name: "Hugel", slug: "hugel" },
    { name: "Teoxane", slug: "teoxane" },
    { name: "Ethicon", slug: "ethicon" },
    { name: "Covidien", slug: "covidien" },
  ];

  return (
    <section className="py-8 md:py-10 bg-muted/30">
      <div className="container-pharma">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-foreground">Shop By Brands</h2>
          <Link to="/products">
            <Button variant="link" className="text-primary p-0 h-auto text-sm">
              Shop All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Brands Grid - 3 columns on mobile, 4 on tablet, 8 on desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-2 md:gap-4">
          {brands.map((brand) => (
            <Link 
              key={brand.slug}
              to={`/products?search=${brand.name}`}
              className="group"
            >
              <div className="aspect-square bg-background rounded-lg md:rounded-xl border border-border hover:border-primary/30 hover:shadow-md active:scale-[0.97] transition-all flex items-center justify-center p-2 md:p-4">
                <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors text-center leading-tight">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;