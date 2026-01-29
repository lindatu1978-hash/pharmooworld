import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroBanner = () => {
  const banners = [
    {
      id: 1,
      badge: "NEW ARRIVALS",
      title: "Premium Dermal Fillers",
      subtitle: "NOW AVAILABLE",
      description: "Explore our latest collection of hyaluronic acid fillers from leading manufacturers worldwide.",
      ctaText: "Shop Now",
      ctaLink: "/products?category=Dermal-Fillers",
      gradient: "from-primary via-primary/90 to-primary/80",
      image: "/products/neauvia-intense-flux-1ml.jpg",
    },
    {
      id: 2,
      badge: "BULK SAVINGS",
      title: "Up to 25% Off",
      subtitle: "WHOLESALE PRICING",
      description: "Get exclusive discounts on bulk orders. Perfect for hospitals, clinics, and distributors.",
      ctaText: "View Bulk Pricing",
      ctaLink: "/products",
      gradient: "from-orange-500 via-orange-600 to-orange-500",
      image: null,
    },
    {
      id: 3,
      badge: "MEDICAL SUPPLIES",
      title: "Hospital Grade Equipment",
      subtitle: "GMP CERTIFIED",
      description: "Surgical gowns, face shields, and PPE from certified manufacturers.",
      ctaText: "Shop Supplies",
      ctaLink: "/products?category=hospital-supplies",
      gradient: "from-accent via-accent/90 to-accent/80",
      image: "/products/disposable-surgical-gowns-1.jpg",
    },
  ];

  return (
    <section className="py-6">
      <div className="container-pharma">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${banner.gradient} min-h-[300px] md:min-h-[400px]`}>
                  {/* Background image if available */}
                  {banner.image && (
                    <div className="absolute inset-0 opacity-20">
                      <img 
                        src={banner.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Decorative blur elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full p-8 md:p-12 lg:p-16 gap-8">
                    {/* Content */}
                    <div className="space-y-4 text-center lg:text-left max-w-2xl">
                      <Badge className="bg-white/90 text-foreground font-semibold">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {banner.badge}
                      </Badge>
                      
                      <div>
                        <p className="text-lg md:text-xl font-medium text-white/80 mb-2">
                          {banner.subtitle}
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                          {banner.title}
                        </h2>
                      </div>
                      
                      <p className="text-white/80 text-base md:text-lg max-w-xl">
                        {banner.description}
                      </p>
                      
                      <Link to={banner.ctaLink}>
                        <Button 
                          size="lg" 
                          className="bg-white text-foreground hover:bg-white/90 shadow-lg mt-4"
                        >
                          {banner.ctaText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>

                    {/* Product image on right for larger screens */}
                    {banner.image && (
                      <div className="hidden lg:block w-72 h-72 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
                        <img 
                          src={banner.image} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm hover:bg-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroBanner;
