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
    <section className="py-8 lg:py-10 bg-background">
      <div className="container-pharma">
        <div className="text-center mb-5">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
            Product Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} to={`/products?category=${category.slug}`}>
              <Card className="group h-full hover:shadow-md hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4 text-center flex flex-col items-center justify-center min-h-[120px]">
                  <div className="h-12 w-12 rounded-xl gradient-medical flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {productCounts && productCounts[category.slug] !== undefined && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {productCounts[category.slug]} products
                    </span>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;