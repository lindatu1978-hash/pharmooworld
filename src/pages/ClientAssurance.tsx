import { Shield, Lock, Users, FileCheck, Truck, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const assurances = [
  {
    icon: Shield,
    title: 'GMP & Regulatory Verified Suppliers',
    description: 'All our suppliers undergo rigorous verification to ensure they meet international pharmaceutical manufacturing standards. We only work with GMP-certified facilities.'
  },
  {
    icon: FileCheck,
    title: 'Transparent Sourcing',
    description: 'Complete supply chain visibility with full documentation including Certificate of Analysis (COA), MSDS, and batch traceability for every product.'
  },
  {
    icon: Lock,
    title: 'Secure Transactions',
    description: 'Multiple secure payment options including escrow services, bank transfers, and corporate invoicing with full transaction protection.'
  },
  {
    icon: Users,
    title: 'Confidentiality Guaranteed',
    description: 'Your business information and order details are kept strictly confidential. We maintain the highest standards of data protection.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Guarantee',
    description: 'Every product is inspected and verified before shipment. If any product fails to meet specifications, we provide full replacement or refund.'
  },
  {
    icon: Truck,
    title: 'Reliable Logistics',
    description: 'Temperature-controlled shipping with real-time tracking. We ensure your products arrive in perfect condition, every time.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Dedicated account managers and technical support available around the clock to assist with orders, documentation, and any concerns.'
  }
];

export default function ClientAssurance() {
  return (
    <Layout>
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Client Assurance</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Your trust is our priority. We provide comprehensive guarantees and support to ensure your complete satisfaction.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assurances.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">Our Commitment to You</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              At Pharmoo World, we understand the critical importance of quality and reliability in pharmaceutical supply. Healthcare providers and their patients depend on the products we deliver, and we take this responsibility seriously.
            </p>
            <p className="mb-6">
              Every supplier in our network is carefully vetted, and every product undergoes quality verification before it reaches you. Our compliance team stays updated on international regulations to ensure all transactions meet the highest standards.
            </p>
            <p>
              We're not just a supplier – we're your partner in healthcare delivery. Our success is measured by your satisfaction and the trust you place in us. That's why we offer industry-leading guarantees and support to give you complete peace of mind with every order.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
