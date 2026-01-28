import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Truck, Percent, Clock, Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeIcon: React.ElementType;
  ctaText: string;
  ctaLink: string;
  gradient: string;
  accentColor: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Just Landed",
    description: "Explore our latest collection of premium dermal fillers and medical-grade cosmetics from leading manufacturers.",
    badge: "NEW",
    badgeIcon: Sparkles,
    ctaText: "Shop New Products",
    ctaLink: "/products?sort=newest",
    gradient: "from-primary/90 via-primary to-primary/80",
    accentColor: "bg-primary-foreground/20",
  },
  {
    id: "bulk-discount",
    title: "Bulk Order Savings",
    subtitle: "Save Up to 25%",
    description: "Get exclusive discounts on bulk orders. Perfect for hospitals, clinics, and distributors looking for competitive pricing.",
    badge: "SAVE 25%",
    badgeIcon: Percent,
    ctaText: "View Bulk Pricing",
    ctaLink: "/products",
    gradient: "from-orange-500 via-orange-600 to-orange-500",
    accentColor: "bg-orange-300/30",
  },
  {
    id: "free-shipping",
    title: "Free Global Shipping",
    subtitle: "Orders Over $5,000",
    description: "Enjoy complimentary worldwide shipping on qualifying orders. Fast, secure, and fully tracked delivery to your door.",
    badge: "FREE SHIPPING",
    badgeIcon: Truck,
    ctaText: "Start Shopping",
    ctaLink: "/products",
    gradient: "from-accent/90 via-accent to-accent/80",
    accentColor: "bg-accent-foreground/20",
  },
  {
    id: "limited-time",
    title: "Limited Time Offer",
    subtitle: "Botulinum & Fillers",
    description: "Special pricing on our bestselling botulinum toxins and hyaluronic acid fillers. Stock up while supplies last.",
    badge: "LIMITED",
    badgeIcon: Clock,
    ctaText: "Shop Now",
    ctaLink: "/products?category=dermal-fillers",
    gradient: "from-destructive/80 via-destructive/90 to-destructive/70",
    accentColor: "bg-destructive-foreground/20",
  },
  {
    id: "top-rated",
    title: "Top Rated Products",
    subtitle: "Customer Favorites",
    description: "Discover our most trusted products chosen by healthcare professionals worldwide. Quality you can rely on.",
    badge: "TOP RATED",
    badgeIcon: Star,
    ctaText: "See Bestsellers",
    ctaLink: "/products?sort=popular",
    gradient: "from-gray-600 via-gray-700 to-gray-600",
    accentColor: "bg-gray-400/30",
  },
];

const PromoBannerCarousel = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-8 bg-muted/30">
      <div className="container-pharma">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {promoBanners.map((banner) => (
              <CarouselItem key={banner.id} className="pl-2 md:pl-4">
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} p-6 md:p-8 lg:p-10 min-h-[200px] md:min-h-[240px]`}
                >
                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${banner.accentColor} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                  <div className={`absolute bottom-0 left-0 w-48 h-48 ${banner.accentColor} rounded-full blur-2xl translate-y-1/2 -translate-x-1/2`} />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="space-y-3 md:space-y-4 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-background/90 text-foreground font-semibold px-3 py-1"
                        >
                          <banner.badgeIcon className="h-3.5 w-3.5 mr-1.5" />
                          {banner.badge}
                        </Badge>
                        <span className="text-sm font-medium text-primary-foreground/80">
                          {banner.subtitle}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">
                        {banner.title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-primary-foreground/80 max-w-xl leading-relaxed">
                        {banner.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <Link to={banner.ctaLink}>
                        <Button 
                          size="lg" 
                          variant="secondary"
                          className="bg-background hover:bg-background/90 text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {banner.ctaText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
            <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm hover:bg-background" />
          </div>
        </Carousel>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {promoBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBannerCarousel;
