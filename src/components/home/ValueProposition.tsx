import { Link } from "react-router-dom";
import { Shield, Users, Award } from "lucide-react";

const ValueProposition = () => {
  const values = [
    {
      icon: Shield,
      title: "The first online store for fillers, cosmetics and medical supplies",
      link: "/products",
    },
    {
      icon: Users,
      title: "Over 10,000+ happy clients worldwide and counting",
      link: "/testimonials",
    },
    {
      icon: Award,
      title: "Access to a team with industry experience & knowledge",
      link: "/about",
    },
  ];

  return (
    <section className="py-8 border-y border-border">
      <div className="container-pharma">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            We Pride Ourselves On Competitive Pricing, Supply Capabilities And Service
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Link 
              key={index}
              to={value.link}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {value.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
