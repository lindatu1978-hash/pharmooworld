import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Truck, Package, Clock, Globe, Mail, HeadphonesIcon } from "lucide-react";

const Shipping = () => {
  return (
    <>
      <SEO
        title="Shipping & Delivery"
        description="Pharmoo World global shipping - Fast worldwide delivery within 3-7 working days. Temperature-controlled shipping for pharmaceutical products."
        keywords="pharmaceutical shipping, worldwide delivery, cold chain shipping, fast delivery"
        canonical="/shipping"
      />

      <Layout>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shipping & Delivery
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                We deliver goods worldwide with fast and reliable shipping services.
              </p>

              <div className="space-y-6">
                {/* Dispatch Times */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Dispatch Times
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Items in Stock</h3>
                        <p className="text-muted-foreground">
                          All orders for items that are in stock are dispatched within <strong>2 working days</strong>.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">Items Not in Stock</h3>
                        <p className="text-muted-foreground">
                          All orders for items that are not currently held in our stock are dispatched within approximately <strong>3-5 days</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Worldwide Delivery */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Worldwide Delivery
                  </h2>
                  <p className="text-muted-foreground">
                    We deliver goods worldwide which can take <strong>3 to 7 working days</strong>. The approximate time of shipment is checked individually on request.
                  </p>
                </section>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-6 border shadow-sm text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Fast Worldwide Delivery</h3>
                    <p className="text-sm text-muted-foreground">Quick shipping to your location</p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border shadow-sm text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeadphonesIcon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Exceptional Customer Service</h3>
                    <p className="text-sm text-muted-foreground">Dedicated support team</p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border shadow-sm text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">24/7 Order System</h3>
                    <p className="text-sm text-muted-foreground">Order anytime, anywhere</p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border shadow-sm text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">14 Days Return Policy</h3>
                    <p className="text-sm text-muted-foreground">Hassle-free returns</p>
                  </div>
                </div>

                {/* Contact */}
                <section className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex gap-3">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Questions About Your Order?
                      </h2>
                      <p className="text-muted-foreground mb-2">
                        If you have any questions or concerns about shipping, you can contact us via email. We strive to answer your questions and requests as quickly as possible.
                      </p>
                      <a 
                        href="mailto:sales@pharmooworld.com" 
                        className="text-primary font-medium hover:underline"
                      >
                        sales@pharmooworld.com
                      </a>
                    </div>
                  </div>
                </section>

                {/* Thank You */}
                <div className="text-center py-4">
                  <p className="text-lg text-muted-foreground">
                    Thanks for stopping by! 🌍
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shipping;
