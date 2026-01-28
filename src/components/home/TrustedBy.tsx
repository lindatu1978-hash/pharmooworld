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
  ];

  return (
    <section className="py-10 border-y border-border bg-muted/30">
      <div className="container-pharma">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            Trusted by industry leaders
          </p>
          
          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-12 animate-marquee">
              {[...partners, ...partners].map((partner, index) => (
                <span
                  key={index}
                  className="text-lg font-semibold text-muted-foreground/60 whitespace-nowrap hover:text-foreground transition-colors"
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