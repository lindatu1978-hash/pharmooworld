import { memo } from "react";
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
    imageAlt: "Neauvia Intense Flux 1ml dermal filler product - premium hyaluronic acid filler for cosmetic procedures",
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
    imageAlt: "",
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
    imageAlt: "Disposable surgical gowns for medical professionals - GMP certified hospital grade PPE",
  },
];

const HeroBanner = memo(() => {
  return (
    <section className="py-6" aria-label="Featured promotions">
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
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id}>
                <article 
                  className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r ${banner.gradient} min-h-[280px] sm:min-h-[320px] md:min-h-[400px]`}
                  aria-label={`Promotion: ${banner.title}`}
                >
                  {/* Background image with SEO attributes */}
                  {banner.image && (
                    <div className="absolute inset-0 opacity-20" aria-hidden="true">
                      <img 
                        src={banner.image} 
                        alt=""
                        role="presentation"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding={index === 0 ? "sync" : "async"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Decorative blur elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

                  <div className="relative z-10 flex flex-row lg:flex-row items-center justify-between h-full p-4 sm:p-6 md:p-12 lg:p-16 gap-4 md:gap-6 lg:gap-8">
                    {/* Content */}
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 text-left lg:text-left max-w-2xl flex-1">
                      <Badge className="bg-white/90 text-foreground font-semibold text-xs">
                        <Sparkles className="h-3 w-3 mr-1" aria-hidden="true" />
                        {banner.badge}
                      </Badge>
                      
                      <div>
                        <p className="text-sm sm:text-lg md:text-xl font-medium text-white/80 mb-1 md:mb-2">
                          {banner.subtitle}
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                          {banner.title}
                        </h2>
                      </div>
                      
                      <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl line-clamp-2 sm:line-clamp-none">
                        {banner.description}
                      </p>
                      
                      <Link to={banner.ctaLink}>
                        <Button 
                          size="lg" 
                          className="bg-white text-foreground hover:bg-white/90 shadow-lg mt-2 md:mt-4 h-12 px-6 text-base"
                        >
                          {banner.ctaText}
                          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </div>

                    {/* Product image with proper SEO attributes - Show on mobile too */}
                    {banner.image && (
                      <figure className="w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl bg-white/10 backdrop-blur-sm flex-shrink-0">
                        <img 
                          src={banner.image} 
                          alt={banner.imageAlt}
                          title={banner.title}
                          width={288}
                          height={288}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding={index === 0 ? "sync" : "async"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          className="w-full h-full object-cover"
                          itemProp="image"
                        />
                      </figure>
                    )}
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm hover:bg-white" aria-label="Previous slide" />
            <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm hover:bg-white" aria-label="Next slide" />
          </div>
        </Carousel>
      </div>
    </section>
  );
});

HeroBanner.displayName = "HeroBanner";

export default HeroBanner;
