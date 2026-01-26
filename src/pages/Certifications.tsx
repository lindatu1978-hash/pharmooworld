import { Shield, Award, FileCheck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const certifications = [
  {
    icon: Shield,
    title: 'GMP Certification',
    description: 'Good Manufacturing Practice certification ensures all products are consistently produced and controlled according to quality standards.',
    details: ['Manufacturing Quality', 'Process Control', 'Documentation Standards', 'Facility Requirements']
  },
  {
    icon: Award,
    title: 'WHO Prequalification',
    description: 'World Health Organization prequalification for pharmaceutical products ensures they meet unified standards of quality, safety, and efficacy.',
    details: ['Quality Assurance', 'Clinical Standards', 'Manufacturing Review', 'Ongoing Monitoring']
  },
  {
    icon: FileCheck,
    title: 'FDA Registration',
    description: 'Products from FDA-registered facilities meet US pharmaceutical standards for quality and safety.',
    details: ['Facility Registration', 'Drug Listing', 'Quality Systems', 'Regulatory Compliance']
  },
  {
    icon: CheckCircle,
    title: 'ISO Certification',
    description: 'ISO 9001:2015 certification demonstrates our commitment to quality management systems and continuous improvement.',
    details: ['Quality Management', 'Customer Focus', 'Process Approach', 'Continual Improvement']
  }
];

export default function Certifications() {
  return (
    <Layout>
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Certifications & Compliance</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Our commitment to quality is backed by internationally recognized certifications and regulatory compliance
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <Card key={cert.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <cert.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                      <p className="text-muted-foreground mb-4">{cert.description}</p>
                      <ul className="grid grid-cols-2 gap-2">
                        {cert.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Verification Process</h2>
          <p className="text-lg text-muted-foreground mb-8">
            All our supplier certifications are verified and updated regularly. We maintain strict quality control processes to ensure every product meets international pharmaceutical standards.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">01</div>
              <h3 className="font-semibold mb-2">Supplier Audit</h3>
              <p className="text-sm text-muted-foreground">Comprehensive facility and documentation review</p>
            </div>
            <div className="p-6 bg-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">02</div>
              <h3 className="font-semibold mb-2">Certificate Validation</h3>
              <p className="text-sm text-muted-foreground">Third-party verification of all certifications</p>
            </div>
            <div className="p-6 bg-card rounded-lg">
              <div className="text-4xl font-bold text-primary mb-2">03</div>
              <h3 className="font-semibold mb-2">Ongoing Monitoring</h3>
              <p className="text-sm text-muted-foreground">Regular quality assessments and updates</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
