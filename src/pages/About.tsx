import { Building2, Users, Globe, Award, Target, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const stats = [
  { label: 'Countries Served', value: '150+' },
  { label: 'Healthcare Partners', value: '10,000+' },
  { label: 'Products Catalog', value: '50,000+' },
  { label: 'Years Experience', value: '15+' }
];

const values = [
  { icon: Award, title: 'Quality First', description: 'Every product meets the highest pharmaceutical standards with rigorous quality control.' },
  { icon: Target, title: 'Reliability', description: 'Consistent supply chain and dependable delivery to healthcare facilities worldwide.' },
  { icon: Heart, title: 'Patient Focus', description: 'Supporting healthcare providers in their mission to improve patient outcomes.' },
  { icon: Globe, title: 'Global Reach', description: 'Serving healthcare providers across 150+ countries with efficient logistics.' }
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Pharmoo World
            </h1>
            <p className="text-xl opacity-90">
              Your trusted global partner for pharmaceutical and medical supplies, serving healthcare providers with quality products and regulatory compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Pharmoo World is dedicated to being the premier global supplier of pharmaceutical products and medical supplies. We bridge the gap between manufacturers and healthcare providers, ensuring access to quality medicines worldwide.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our commitment to regulatory compliance, quality assurance, and customer service has made us a trusted partner for hospitals, pharmacies, and distributors across the globe.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that everyone deserves access to quality healthcare products, and we work tirelessly to make that a reality through our extensive network and efficient supply chain.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <Building2 className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4">Why Healthcare Providers Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent">✓</span>
                  <span>Verified GMP-certified manufacturers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">✓</span>
                  <span>Complete documentation and traceability</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">✓</span>
                  <span>Competitive pricing with bulk discounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">✓</span>
                  <span>Temperature-controlled global logistics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">✓</span>
                  <span>Dedicated account management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
