import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Truck, HeadphonesIcon, Clock, RotateCcw, Building2, Mail, MapPin } from "lucide-react";

const About = () => {
  return (
    <>
      <SEO
        title="About Us - Global Pharmaceutical Supplier"
        description="Pharmoo World is a trusted wholesale supplier of Dermal Fillers, Botulinum, Implants, Cosmetics, Orthopedics, and Surgical Equipment with global reach to 50+ countries."
        keywords="pharmaceutical supplier, wholesale distributor, dermal fillers supplier, medical supplies, global shipping"
        canonical="/about"
      />

      <Layout>
        <div className="bg-gradient-to-b from-primary/5 to-background">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About Us
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We are a wholesale supplier, exporter, trader, and distributor of Dermal Fillers, Implants, Cosmetics & Orthopedics, Botulinum, Surgical Equipment, and more.
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-card rounded-2xl p-8 shadow-sm border">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Supplying online with a global reach through our superior logistics expertise, we pride ourselves on our price, supply capabilities, and service. As a result, we have a very loyal and growing client base of satisfied customers who return to us time and again.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our leading supply brand names include <span className="font-semibold text-foreground">Juvederm, Restylane, Radiesse, Teosyal, Allergan, Surgiderm, Sculptra</span>, and many more products.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  If you cannot see a product that you are looking for, please email us and we will source it for you. We also have our own products and can represent quality-tested products on behalf of manufacturers looking for retail distribution and/or launch via our platform.
                </p>
              </div>

              <div className="bg-primary/5 rounded-2xl p-8 text-center">
                <p className="text-xl font-medium text-foreground">
                  We look forward to welcoming you as a valued customer.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-card rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Fast Worldwide Delivery</h3>
                <p className="text-sm text-muted-foreground">Global shipping to your doorstep</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Exceptional Customer Service</h3>
                <p className="text-sm text-muted-foreground">Dedicated support team</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">24/7 Order System</h3>
                <p className="text-sm text-muted-foreground">Order anytime, anywhere</p>
              </div>

              <div className="bg-card rounded-xl p-6 text-center shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">14 Days Return Policy</h3>
                <p className="text-sm text-muted-foreground">Hassle-free returns</p>
              </div>
            </div>
          </section>

          {/* Company Info */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 shadow-sm border">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Global Presence</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      PharmooWorld has been around for a while and has been a significant player in the exportation of a variety of pharmaceutical products in Europe, Asia, Australia, America, Canada, and African markets. PharmooWorld prides itself on efficiency, reliability, and customer satisfaction.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">Los Angeles, CA 90006 USA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href="mailto:info@pharmooworld.com" className="text-primary hover:underline">
                        info@pharmooworld.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default About;
