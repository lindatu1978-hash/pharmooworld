import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Star, Quote, MapPin } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Abanoub S.",
    role: "Doctor",
    location: "New York, NYC",
    quote: "Hiya Pharmooworld, it was an amazing service with fast delivery as promised. I just received my order today and it was a pleasure doing business with you guys.",
    rating: 5,
  },
  {
    id: 2,
    name: "Suffian A.",
    role: "User",
    location: "London, United Kingdom",
    quote: "Dear Dr. Tessy, I want to thank you for making me feel and look beautiful. As you know, you gave me BOTOX injections in my frown lines and crow's feet. I decided to get the procedure done because I was turning 40 and my husband was throwing me an amazing birthday party. The results you gave me are just as amazing. Within a few weeks people I work with were complementing me on how great I looked. They told me that I looked refreshed and that my skin looked amazing. No one knew I just had BOTOX done by you.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jhollman C.",
    role: "User",
    location: "Santa Maria, CA",
    quote: "I could not have wished for a better experience than I had with you. Not only are you extremely professional but you have a very reassuring manner and you clearly cared about talking to me about what I wanted and discussing possible approaches. I was very skeptical with my first order but now I know there are genuine people still out there. A friend of mine said that I looked 'very rested and really good' but not as though I had anything done. PERFECT! You are a genius!",
    rating: 5,
  },
  {
    id: 4,
    name: "Jessica",
    role: "User",
    location: "DeFuniak Springs, FL",
    quote: "Pharmooworld.com customer service is excellent, and shipping is super fast. I am now hooked on Pharmooworld! The quality is authentic. Pharmooworld is money well spent. Again, excellent quality! A company you can trust!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <>
      <SEO
        title="Customer Reviews & Testimonials"
        description="Read authentic reviews from doctors and healthcare professionals worldwide. See what our customers say about Pharmoo World pharmaceutical services."
        keywords="customer reviews, testimonials, pharmaceutical supplier reviews, doctor reviews"
        canonical="/testimonials"
      />

      <Layout>
        <div className="bg-gradient-to-b from-primary/5 to-background">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Fantastic Customers Say
              </h1>
              <p className="text-lg text-muted-foreground">
                Real reviews from real customers around the world
              </p>
            </div>
          </section>

          {/* Testimonials Grid */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-card rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-primary/30" />
                  </div>

                  {/* Quote Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Share Your Experience
                </h2>
                <p className="text-muted-foreground mb-6">
                  Have you ordered from Pharmoo World? We'd love to hear about your experience!
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Drop Your Review
                </a>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Testimonials;
