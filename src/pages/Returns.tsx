import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Phone, Mail, AlertTriangle, Clock, CreditCard, Package } from "lucide-react";

const Returns = () => {
  return (
    <>
      <SEO
        title="Returns Policy"
        description="Pharmoo World Returns Policy - 10-day return policy for pharmaceutical products. Learn how to request a refund and return conditions."
        keywords="returns policy, refund, pharmaceutical returns, return conditions"
        canonical="/returns"
      />

      <Layout>
        <div className="bg-background">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Returns Policy
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                We want you to feel 100% confident in using our services. That is why we offer a 10-day returns policy.
              </p>

              <div className="space-y-6">
                {/* How to Return */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    How to Request a Return
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you are not satisfied with your purchase for any valid reason, simply contact our customer services department as soon as you have received your goods and explain that you wish to return the product.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-4">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Call us at</p>
                        <a href="tel:+13233669402" className="font-medium text-foreground hover:text-primary">
                          +1 323-366-9402
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email us at</p>
                        <a href="mailto:sales@pharmooworld.com" className="font-medium text-foreground hover:text-primary">
                          sales@pharmooworld.com
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Return Conditions */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Return Conditions
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        No refund will be honored if the product(s) has been opened, used or damaged (including damage incurred during transit) back to us unless product is faulty.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">
                        Returns can only be honored if the product(s) is returned intact.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Important Notice */}
                <section className="bg-destructive/10 rounded-xl p-6 border border-destructive/20">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Important Notice
                      </h2>
                      <p className="text-muted-foreground">
                        You <strong>MUST</strong> contact us prior to returning a product and ask for a <strong>"Customer Returns Form"</strong>. A refund will not be issued without proper authorization from one of our customer service representatives. <strong>No returns will be accepted after 5 days.</strong>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Refund Timeline */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Refund Timeline
                      </h2>
                      <p className="text-muted-foreground">
                        Please allow 3-5 working days for the refund to settle within your bank account before contacting us.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Custom Fees */}
                <section className="bg-card rounded-xl p-6 border shadow-sm">
                  <div className="flex gap-3">
                    <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        Custom Fees & Charges
                      </h2>
                      <p className="text-muted-foreground">
                        Please note: You are liable for all custom fees and charges.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact CTA */}
                <section className="bg-primary/5 rounded-xl p-6 border border-primary/20 text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Need Help?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about our returns policy, please don't hesitate to contact us.
                  </p>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Returns;
