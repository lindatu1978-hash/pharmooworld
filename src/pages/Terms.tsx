import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <Layout>
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>1. Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  By accessing and using Pharmoo World's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>2. Buyer Eligibility & Verification</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Pharmoo World sells pharmaceutical products exclusively to verified buyers. By purchasing from us, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are a licensed healthcare provider, pharmacy, hospital, distributor, or authorized entity</li>
                  <li>You possess all necessary licenses and permits required to purchase pharmaceutical products</li>
                  <li>You will use products only for lawful purposes in accordance with applicable regulations</li>
                  <li>All information provided during registration and ordering is accurate and complete</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>3. Products & Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  All products are supplied in compliance with applicable pharmaceutical regulations. The buyer is solely responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ensuring products are approved for use in their jurisdiction</li>
                  <li>Obtaining necessary import permits and licenses</li>
                  <li>Compliance with local storage, handling, and distribution requirements</li>
                  <li>Prescription verification for controlled or prescription-only medications</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>4. Pricing & Payment</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Prices are quoted in USD and are subject to change. Payment terms include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bank Transfer (T/T): Payment due before shipment</li>
                  <li>Escrow: Through approved escrow services</li>
                  <li>Corporate Invoice: Net 30 terms for verified accounts (subject to approval)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>5. Shipping & Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Shipping costs and delivery times vary by destination. All shipments include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Temperature-controlled packaging when required</li>
                  <li>Full documentation including COA and shipping manifests</li>
                  <li>Tracking information for all shipments</li>
                  <li>Insurance coverage for product value</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>6. Returns & Disputes</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Due to the nature of pharmaceutical products, returns are limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Products damaged during shipping (must report within 48 hours)</li>
                  <li>Products that do not match order specifications</li>
                  <li>Products failing quality testing (third-party verification required)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Pharmoo World's liability is limited to the purchase price of products. We are not liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>8. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  These terms shall be governed by and construed in accordance with applicable international commercial law. Any disputes shall be resolved through binding arbitration.
                </p>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
