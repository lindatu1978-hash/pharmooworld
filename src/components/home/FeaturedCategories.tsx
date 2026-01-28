import { Link } from "react-router-dom";
import { 
  Pill, 
  Sparkles, 
  Syringe, 
  Stethoscope, 
  Building2,
  FlaskConical
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeaturedCategories = () => {
  // Fetch product counts by category
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

  // Top 6 categories only
  const categories = [
    {
      name: "Botulinum",
      slug: "Botulinum-products",
      icon: Syringe,
    },
    {
      name: "Dermal Fillers",
      slug: "Dermal-Fillers",
      icon: Sparkles,
    },
    {
      name: "Pharmaceuticals",
      slug: "finished-pharmaceuticals",
      icon: Pill,
    },
    {
      name: "APIs & Raw Materials",
      slug: "apis-raw-materials",
      icon: FlaskConical,
    },
    {
      name: "Medical Devices",
      slug: "medical-devices",
      icon: Stethoscope,
    },
    {
      name: "Hospital Supplies",
      slug: "hospital-supplies",
      icon: Building2,
    },
  ];

  return (
    <section className="py-6 bg-muted/30">
      <div className="container-pharma">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              to={`/products?category=${category.slug}`}
              className="group flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full hover:border-primary hover:bg-primary/5 transition-all duration-200"
            >
              <category.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </span>
              {productCounts && productCounts[category.slug] !== undefined && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {productCounts[category.slug]}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;