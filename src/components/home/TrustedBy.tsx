const TrustedBy = () => {
  const partners = [
    { name: "Allergan", color: "text-[#00263E]" },
    { name: "Galderma", color: "text-[#E4002B]" },
    { name: "Merz", color: "text-[#003366]" },
    { name: "Ipsen", color: "text-[#00529B]" },
    { name: "Hugel", color: "text-[#E31837]" },
    { name: "Medytox", color: "text-[#0066B3]" },
    { name: "Ethicon", color: "text-[#CC0000]" },
    { name: "Covidien", color: "text-[#003D79]" },
    { name: "Teoxane", color: "text-[#C8102E]" },
    { name: "Revance", color: "text-[#6B2D5B]" },
  ];

  return (
    <section className="py-10 border-y border-border bg-muted/30 overflow-hidden">
      <div className="container-pharma">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <p className="text-base font-semibold text-muted-foreground whitespace-nowrap shrink-0">
            Trusted by industry leaders
          </p>
          
          <div className="relative flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex items-center gap-20 animate-marquee-slow hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 whitespace-nowrap group cursor-default"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-card to-muted flex items-center justify-center border border-border shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all">
                    <span className={`text-xl font-bold ${partner.color}`}>
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <span
                    className={`text-xl font-bold ${partner.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;