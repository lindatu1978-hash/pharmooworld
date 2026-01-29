import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileCheck, DollarSign, Truck, Users, CheckCircle, AlertTriangle } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Quality",
      description: "All products from GMP-certified facilities meeting international standards.",
    },
    {
      icon: FileCheck,
      title: "Full Documentation",
      description: "Certificate of Analysis, MSDS, GMP certificates, and batch traceability.",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Bulk discounts and wholesale rates for all orders.",
    },
    {
      icon: Truck,
      title: "Global Logistics",
      description: "Temperature-controlled shipping to 50+ countries worldwide.",
    },
    {
      icon: Users,
      title: "Verified Network",
      description: "Secure buyer verification for legitimate transactions only.",
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description: "Bank wire (T/T), escrow, and corporate invoicing options.",
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <div className="container-pharma">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-sm font-medium text-primary mb-2">Why Pharmoo World</p>
          <h2 className="text-foreground mb-3">
            Your Trusted Partner
          </h2>
          <p className="text-muted-foreground">
            Industry expertise combined with cutting-edge logistics.
          </p>
        </div>

        {/* Tabs - like product detail page */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="logistics">Logistics</TabsTrigger>
          </TabsList>

          <TabsContent value="features">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-border hover:border-primary/30 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardContent className="p-6">
                <p className="mb-4 text-muted-foreground">
                  All our products come with complete regulatory documentation:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <span>Certificate of Analysis (COA) for every batch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <span>Material Safety Data Sheet (MSDS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <span>GMP Certificate from manufacturing facility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <span>WHO Prequalification (where applicable)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-accent" />
                    <span>Full batch traceability records</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-warning/10 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Prescription products require valid import licenses. Contact our sales team for licensing verification requirements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logistics">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Temperature-controlled cold chain for sensitive products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Global shipping to 50+ countries via DHL, FedEx, and specialized pharma couriers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Real-time tracking and delivery notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Customs clearance support and documentation assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Insurance coverage for all shipments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stats Bar - like product page card */}
        <Card className="mt-8 gradient-medical border-0">
          <CardContent className="p-8">
            <div className="grid grid-cols-3 gap-8 text-center text-white">
              <div>
                <p className="text-3xl lg:text-4xl font-bold">15+</p>
                <p className="text-sm text-white/80 mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-bold">50+</p>
                <p className="text-sm text-white/80 mt-1">Countries Served</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-bold">99%</p>
                <p className="text-sm text-white/80 mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhyChooseUs;
