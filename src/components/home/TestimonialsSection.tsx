import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    {
      name: "Dr. James Park",
      role: "Dermatologist",
      company: "Seoul Skin Clinic",
      location: "South Korea",
      content: "Fast shipping and authentic products every time. The wholesale pricing makes it easy to maintain competitive rates for our patients.",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container-pharma">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-primary mb-2">Testimonials</p>
          <h2 className="text-2xl font-bold text-foreground">
            Trusted by Healthcare Professionals Worldwide
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <CardContent className="p-6 space-y-4 h-full flex flex-col">
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
                    <p className="text-muted-foreground leading-relaxed text-sm flex-grow">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="pt-4 border-t border-border">
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}, {testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-0 -translate-x-1/2" />
            <CarouselNext className="right-0 translate-x-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
