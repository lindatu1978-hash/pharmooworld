import { Link } from "react-router-dom";
import { 
  Package, 
  FlaskConical, 
  Stethoscope, 
  Building2, 
  Pill, 
  Sparkles, 
  Syringe, 
  Droplets, 
  Bug, 
  Shield, 
  Heart,
  CircleDot
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
  // Categories organized by type - matching database slugs exactly
  const categories = [
    // Aesthetics & Cosmetic (most popular first)
    {
      name: "Botulinum",
      description: "Premium Botox and botulinum toxin products",
      slug: "Botulinum-products",
      icon: Syringe,
      group: "Aesthetics"
    },
    {
      name: "Dermal Fillers",
      description: "High-quality dermal filler products wholesale",
      slug: "Dermal-Fillers",
      icon: Sparkles,
      group: "Aesthetics"
    },
    {
      name: "Hydrogel Injection",
      description: "Polyacrylamide hydrogel for body enhancement",
      slug: "hydrogel-injection",
      icon: Droplets,
      group: "Aesthetics"
    },
    {
      name: "PMMA Buttocks Injection",
      description: "PMMA injections for body contouring",
      slug: "pmma-buttocks-injection",
      icon: CircleDot,
      group: "Aesthetics"
    },
    {
      name: "Implants",
      description: "Medical grade implants for procedures",
      slug: "implants",
      icon: Heart,
      group: "Aesthetics"
    },
    // Pharmaceuticals
    {
      name: "Finished Pharmaceuticals",
      description: "Complete dosage forms ready for distribution",
      slug: "finished-pharmaceuticals",
      icon: Pill,
      group: "Pharmaceuticals"
    },
    {
      name: "APIs & Raw Materials",
      description: "Active pharmaceutical ingredients and intermediates",
      slug: "apis-raw-materials",
      icon: FlaskConical,
      group: "Pharmaceuticals"
    },
    // Medical Supplies
    {
      name: "Medical Devices",
      description: "Diagnostic and therapeutic equipment",
      slug: "medical-devices",
      icon: Stethoscope,
      group: "Medical Supplies"
    },
    {
      name: "Hospital Supplies",
      description: "Clinical consumables and surgical supplies",
      slug: "hospital-supplies",
      icon: Building2,
      group: "Medical Supplies"
    },
    {
      name: "Face Masks & PPE",
      description: "N95 respirators and protective equipment",
      slug: "face-masks-ppe",
      icon: Shield,
      group: "Medical Supplies"
    },
    // Consumer & Research
    {
      name: "OTC Products",
      description: "Over-the-counter medicines and consumer health",
      slug: "otc-products",
      icon: Package,
      group: "Consumer Health"
    },
    {
      name: "Snake Venom",
      description: "Research-grade snake, toad & scorpion venom",
      slug: "snake-venom",
      icon: Bug,
      group: "Research"
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-pharma">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Product Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of pharmaceutical and medical products from certified manufacturers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link key={category.slug} to={`/products?category=${category.slug}`}>
              <Card className="group h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 lg:p-6 text-center flex flex-col items-center justify-center min-h-[180px]">
                  <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl gradient-medical flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <category.icon className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  {productCounts && productCounts[category.slug] !== undefined && (
                    <span className="text-xs font-medium text-primary mb-1">
                      {productCounts[category.slug]} {productCounts[category.slug] === 1 ? 'product' : 'products'}
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                    {category.description}
                  </p>
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