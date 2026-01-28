import { Link } from "react-router-dom";
import { 
  Pill, 
  Sparkles, 
  Syringe, 
  Stethoscope, 
  Building2,
  FlaskConical,
  ChevronDown
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FeaturedCategories = () => {
  const { data: productCounts } = useQuery({
    queryKey: ["product-counts-by-category"],
    queryFn: async () => {
      const { data: categories } = await supabase
        .from("categories")
        .select("id, slug");
      
      if (!categories) return {};
      
      const counts: Record<string, number> = {};
      
      for (const category of categories) {
        const { count } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true })
          .eq("category_id", category.id);
        
        counts[category.slug] = count || 0;
      }
      
      return counts;
    },
  });

  const categories = [
    { name: "Botulinum", slug: "Botulinum-products", icon: Syringe },
    { name: "Dermal Fillers", slug: "Dermal-Fillers", icon: Sparkles },
    { name: "Pharmaceuticals", slug: "finished-pharmaceuticals", icon: Pill },
    { name: "APIs & Raw Materials", slug: "apis-raw-materials", icon: FlaskConical },
    { name: "Medical Devices", slug: "medical-devices", icon: Stethoscope },
    { name: "Hospital Supplies", slug: "hospital-supplies", icon: Building2 },
  ];

  return (
    <section className="py-4 bg-muted/30">
      <div className="container-pharma flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Pill className="h-4 w-4 text-primary" />
              Browse Categories
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56 bg-background">
            {categories.map((category) => (
              <DropdownMenuItem key={category.slug} asChild>
                <Link 
                  to={`/products?category=${category.slug}`}
                  className="flex items-center justify-between w-full cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="h-4 w-4 text-primary" />
                    {category.name}
                  </span>
                  {productCounts && productCounts[category.slug] !== undefined && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {productCounts[category.slug]}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default FeaturedCategories;