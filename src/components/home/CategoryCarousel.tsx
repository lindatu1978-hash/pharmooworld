import { memo, useMemo } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
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

// Icon mapping outside component to prevent recreation
const iconMap: Record<string, React.ElementType> = {
  "Botulinum-products": Syringe,
  "Dermal-Fillers": Sparkles,
  "finished-pharmaceuticals": Pill,
  "apis-raw-materials": FlaskConical,
  "medical-devices": Stethoscope,
  "hospital-supplies": Building2,
  "face-masks-ppe": Heart,
  "snake-venom": FlaskConical,
};

const imageMap: Record<string, string> = {
  "Dermal-Fillers": "/products/neauvia-intense-flux-1ml.jpg",
  "hospital-supplies": "/products/disposable-surgical-gowns-1.jpg",
  "face-masks-ppe": "/products/face-shield-1.jpg",
  "snake-venom": "/products/black-mamba-snake-venom.jpg",
};

const CategoryCarousel = memo(() => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories-homepage"],
    queryFn: async () => {
      // Single query to get categories - skip product counts for performance
      const { data } = await supabase
        .from("categories")
        .select("id, name, slug")
        .limit(12);
      
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });

  const categoryItems = useMemo(() => {
    if (!categories) return [];
    return categories.map((category) => ({
      ...category,
      Icon: iconMap[category.slug] || ShoppingBag,
      image: imageMap[category.slug] || null,
    }));
  }, [categories]);

  if (isLoading) {
    return (
      <section className="py-6 bg-background border-b border-border">
        <div className="container-pharma">
          <div className="flex gap-3 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-28 flex-shrink-0 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categoryItems.length) return null;

  return (
    <section className="py-6 bg-background border-b border-border">
      <div className="container-pharma">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {/* Sale/Featured Item - Better mobile sizing */}
            <CarouselItem className="pl-3 basis-[30%] sm:basis-1/3 md:basis-1/5 lg:basis-1/7">
              <Link to="/products?sort=popular">
                <Card className="border-2 border-primary bg-primary/5 hover:bg-primary/10 active:bg-primary/15 transition-all cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 text-center h-28 sm:h-32">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <span className="font-semibold text-primary text-xs sm:text-sm">SALE</span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>

            {/* Category Items - Better mobile sizing */}
            {categoryItems.map((category) => (
              <CarouselItem key={category.id} className="pl-3 basis-[30%] sm:basis-1/3 md:basis-1/5 lg:basis-1/7">
                <Link to={`/products?category=${category.slug}`} aria-label={`Browse ${category.name} products`}>
                  <Card className="border-border hover:border-primary/30 hover:shadow-md active:scale-[0.98] transition-all cursor-pointer h-full">
                    <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 text-center h-28 sm:h-32">
                      {category.image ? (
                        <figure className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden mb-2">
                          <img 
                            src={category.image} 
                            alt={`${category.name} category - pharmaceutical products`}
                            title={`Shop ${category.name}`}
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </figure>
                      ) : (
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-muted flex items-center justify-center mb-2" aria-hidden="true">
                          <category.Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                      )}
                      <span className="font-medium text-foreground text-[11px] sm:text-xs line-clamp-2 leading-tight">
                        {category.name}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
});

CategoryCarousel.displayName = "CategoryCarousel";

export default CategoryCarousel;
