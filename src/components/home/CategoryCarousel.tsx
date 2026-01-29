import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pill, 
  Sparkles, 
  Syringe, 
  Stethoscope, 
  Building2,
  FlaskConical,
  ShoppingBag,
  Heart
} from "lucide-react";

const CategoryCarousel = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories-with-counts"],
    queryFn: async () => {
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*");
      
      if (!categoriesData) return [];

      // Get counts for each category
      const categoriesWithCounts = await Promise.all(
        categoriesData.map(async (category) => {
          const { count } = await supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("category_id", category.id);
          
          return {
            ...category,
            productCount: count || 0,
          };
        })
      );

      return categoriesWithCounts;
    },
  });

  // Icon mapping based on category slug
  const getIcon = (slug: string) => {
    const iconMap: Record<string, React.ElementType> = {
      "Botulinum-products": Syringe,
      "Dermal-Fillers": Sparkles,
      "finished-pharmaceuticals": Pill,
      "apis-raw-materials": FlaskConical,
      "medical-devices": Stethoscope,
      "hospital-supplies": Building2,
      "face-masks-ppe": Heart,
    };
    return iconMap[slug] || ShoppingBag;
  };

  // Get a representative image for the category
  const getCategoryImage = (slug: string): string | null => {
    const imageMap: Record<string, string> = {
      "Dermal-Fillers": "/products/neauvia-intense-flux-1ml.jpg",
      "hospital-supplies": "/products/disposable-surgical-gowns-1.jpg",
      "face-masks-ppe": "/products/face-shield-1.jpg",
    };
    return imageMap[slug] || null;
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-6 bg-background border-b border-border">
      <div className="container-pharma">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {/* Sale/Featured Item */}
            <CarouselItem className="pl-3 basis-1/3 md:basis-1/5 lg:basis-1/7">
              <Link to="/products?sort=popular">
                <Card className="border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center h-32">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-semibold text-primary text-sm">SALE</span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>

            {/* Category Items */}
            {categories.map((category) => {
              const Icon = getIcon(category.slug);
              const image = getCategoryImage(category.slug);
              
              return (
                <CarouselItem key={category.id} className="pl-3 basis-1/3 md:basis-1/5 lg:basis-1/7">
                  <Link to={`/products?category=${category.slug}`}>
                    <Card className="border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full">
                      <CardContent className="flex flex-col items-center justify-center p-4 text-center h-32">
                        {image ? (
                          <div className="h-12 w-12 rounded-lg overflow-hidden mb-2">
                            <img 
                              src={image} 
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <span className="font-medium text-foreground text-xs line-clamp-2">
                          {category.name}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
