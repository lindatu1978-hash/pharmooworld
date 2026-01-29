import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TrustedBy = () => {
  const partners = [
    "Allergan",
    "Galderma", 
    "Merz",
    "Ipsen",
    "Hugel",
    "Medytox",
    "Ethicon",
    "Covidien",
    "Teoxane",
    "Revance",
  ];

  return (
    <section className="py-6 border-b border-border bg-background">
      <div className="container-pharma">
        {/* Back link - like product detail page */}
        <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Browse All Products
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap shrink-0">
            Trusted by industry leaders
          </p>
          
          <div className="relative flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-12 animate-marquee-slow hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, index) => (
                <span
                  key={index}
                  className="text-base font-medium text-muted-foreground/50 whitespace-nowrap hover:text-muted-foreground transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
