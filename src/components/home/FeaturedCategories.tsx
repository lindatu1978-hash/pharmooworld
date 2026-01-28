import { Link } from "react-router-dom";
import { Package, FlaskConical, Heart, Stethoscope, Building2, Pill, Sparkles, Syringe, Droplets } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedCategories = () => {
  const categories = [
    {
      name: "Finished Pharmaceuticals",
      description: "Complete dosage forms ready for distribution",
      slug: "finished-pharmaceuticals",
      icon: Pill,
    },
    {
      name: "APIs & Raw Materials",
      description: "Active pharmaceutical ingredients and intermediates",
      slug: "apis-raw-materials",
      icon: FlaskConical,
    },
    {
      name: "Botulinum Products",
      description: "Premium Botox and botulinum toxin products",
      slug: "Botulinum-products",
      icon: Syringe,
    },
    {
      name: "Dermal Fillers",
      description: "High-quality dermal filler products wholesale",
      slug: "Dermal-Fillers",
      icon: Sparkles,
    },
    {
      name: "Hydrogel Injection",
      description: "Polyacrylamide hydrogel for body enhancement",
      slug: "hydrogel-injection",
      icon: Droplets,
    },
    {
      name: "Hospital Supplies",
      description: "Clinical consumables and supplies",
      slug: "hospital-supplies",
      icon: Building2,
    },
    {
      name: "Medical Devices",
      description: "Diagnostic and therapeutic equipment",
      slug: "medical-devices",
      icon: Stethoscope,
    },
    {
      name: "OTC Products",
      description: "Over-the-counter medicines and consumer health",
      slug: "otc-products",
      icon: Heart,
    },
    {
      name: "Wellness Products",
      description: "Supplements and health products",
      slug: "wellness",
      icon: Package,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-pharma">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of pharmaceutical and medical products from certified manufacturers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} to={`/products?category=${category.slug}`}>
              <Card className="group h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-2xl gradient-medical flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;