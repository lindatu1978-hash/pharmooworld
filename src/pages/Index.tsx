import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Truck, Clock, CheckCircle, Package, FileCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const trustBadges = [
  { icon: Shield, label: 'GMP Certified' },
  { icon: Award, label: 'WHO Compliant' },
  { icon: FileCheck, label: 'FDA Registered' },
  { icon: Truck, label: 'Global Shipping' },
];

const categories = [
  { name: 'Finished Pharmaceuticals', slug: 'finished-pharmaceuticals', icon: Package, description: 'Complete dosage forms ready for distribution' },
  { name: 'APIs & Raw Materials', slug: 'apis-raw-materials', icon: FileCheck, description: 'Active pharmaceutical ingredients and intermediates' },
  { name: 'OTC Products', slug: 'otc-products', icon: Users, description: 'Over-the-counter medicines and consumer health' },
  { name: 'Medical Devices', slug: 'medical-devices', icon: Shield, description: 'Diagnostic and therapeutic equipment' },
  { name: 'Hospital Supplies', slug: 'hospital-supplies', icon: Clock, description: 'Clinical consumables and supplies' },
  { name: 'Wellness Products', slug: 'wellness-products', icon: Award, description: 'Supplements and health products' },
];

const features = [
  { icon: Shield, title: 'Certified Manufacturers', description: 'All products sourced from GMP-certified and WHO-approved facilities' },
  { icon: FileCheck, title: 'Regulatory Compliance', description: 'Full documentation including COA, MSDS, and batch traceability' },
  { icon: Truck, title: 'Fast Global Delivery', description: 'Temperature-controlled logistics to 150+ countries' },
  { icon: Users, title: 'Buyer Verification', description: 'Secure verification process for licensed healthcare providers' },
  { icon: Award, title: 'Quality Guarantee', description: 'Every product tested and verified before shipment' },
  { icon: Clock, title: '24/7 Support', description: 'Dedicated account managers and technical assistance' },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative gradient-hero text-primary-foreground py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Global Pharmaceutical & Medical Supplies
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 text-balance">
              Trusted by Healthcare Providers Worldwide. High-quality medicines, APIs, and medical products with regulatory compliance and global logistics support.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">
                  Shop Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/request-quote">Request Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/certifications">Verify Certifications</Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-2">
                  <badge.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <div className="absolute inset-0 bg-gradient-to-l from-primary-foreground/20 to-transparent" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of pharmaceutical and medical supplies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} to={`/products?category=${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pharmoo World</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for pharmaceutical and medical supply needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who trust Pharmoo World for their pharmaceutical and medical supply needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-8 bg-muted border-t">
        <div className="container">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Regulatory Compliance:</strong> All pharmaceutical products are supplied in compliance with international regulatory standards. Buyers are responsible for ensuring proper licensing, import permits, and compliance with local laws. Prescription products require valid documentation. 
              <Link to="/legal-disclaimer" className="text-primary hover:underline ml-1">Read our Legal Disclaimer</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
