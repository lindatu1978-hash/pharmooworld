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
    <section className="py-8 border-y border-border bg-muted/30 overflow-hidden">
      <div className="container-pharma">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap shrink-0">
            Trusted by industry leaders
          </p>
          
          <div className="relative flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-16 animate-marquee-slow hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, index) => (
                <span
                  key={index}
                  className="text-lg font-semibold text-muted-foreground/60 whitespace-nowrap hover:text-muted-foreground transition-colors"
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