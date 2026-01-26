import { useState } from 'react';
import { Send, Package, FileText, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';

export default function RequestQuote() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Quote Request Submitted",
      description: "Our team will prepare your quote within 24-48 hours."
    });
    
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Get customized pricing for bulk orders, special requirements, or ongoing supply agreements
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <Package className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Bulk Pricing</h3>
                  <p className="text-muted-foreground">
                    Get significant discounts on large volume orders with customized pricing based on your requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Custom Sourcing</h3>
                  <p className="text-muted-foreground">
                    Need a specific product not in our catalog? We can source it from our verified supplier network.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Truck className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Supply Agreements</h3>
                  <p className="text-muted-foreground">
                    Long-term supply contracts with guaranteed pricing and priority fulfillment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Request Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input id="company" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input id="country" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-type">Company Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="clinic">Clinic</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="products">Products Required *</Label>
                      <Textarea 
                        id="products" 
                        placeholder="List the products you need with quantities, dosages, and any specific requirements"
                        rows={4}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional">Additional Requirements</Label>
                      <Textarea 
                        id="additional" 
                        placeholder="Any special packaging, documentation, or delivery requirements"
                        rows={3}
                      />
                    </div>
                    <Button type="submit" disabled={loading}>
                      <Send className="h-4 w-4 mr-2" />
                      {loading ? 'Submitting...' : 'Submit Quote Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
