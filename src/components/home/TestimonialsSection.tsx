import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Medical Director",
      company: "Pacific Aesthetics Clinic",
      location: "Singapore",
      content: "Pharmoo World has been our trusted supplier for dermal fillers and botulinum products. Their quality assurance and documentation are impeccable.",
      rating: 5,
    },
    {
      name: "Ahmed Hassan",
      role: "Procurement Manager",
      company: "Cairo Medical Supplies",
      location: "Egypt",
      content: "Excellent bulk pricing and reliable global shipping. We've been partners for 3 years and they've never let us down on delivery timelines.",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      role: "Hospital Administrator",
      company: "Centro Médico Nacional",
      location: "Mexico",
      content: "The GMP certifications and full traceability documentation gave us confidence in their products. Outstanding customer service as well.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container-pharma">
        {/* Section Header - compact like product page sections */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-medium text-primary mb-2">Testimonials</p>
          <h2 className="text-foreground mb-3">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-muted-foreground text-sm">
            Hear from our partners about their experience working with Pharmoo World.
          </p>
        </div>

        {/* Testimonials Grid - Card style like product page */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:border-primary/30 hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>

                {/* Author - like product manufacturer info */}
                <div className="pt-4 border-t border-border">
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}, {testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
