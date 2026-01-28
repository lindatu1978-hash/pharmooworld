import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for purchasing pharmaceutical and medical products from Pharmoo World. Sales conditions, regulatory compliance, and buyer responsibilities."
        canonical="/terms"
        noindex={false}
      />

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground mt-2">
              Last updated: January 2026
            </p>
          </div>
        </div>

        <div className="container-pharma py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>1. Sales Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  All sales through Pharmoo World are subject to these terms and conditions. By placing an order, you agree to be bound by these terms.
                </p>
                <p>
                  Products are sold exclusively for legitimate pharmaceutical, medical, and healthcare purposes. Buyers must be licensed and authorized entities.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>2. Prescription & Licensing Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Buyers are responsible for ensuring they possess all necessary licenses, permits, and authorizations required to purchase, import, and distribute pharmaceutical products in their jurisdiction.
                </p>
                <p>
                  Prescription products require valid documentation and verification of buyer credentials before shipment.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>3. Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  All products supplied by Pharmoo World are manufactured in compliance with GMP, WHO, and applicable regulatory standards.
                </p>
                <p>
                  Buyers must comply with all applicable local, national, and international regulations regarding the import, storage, and distribution of pharmaceutical products.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>4. Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  These terms are governed by applicable international trade laws. Any disputes shall be resolved through arbitration in accordance with international commercial arbitration rules.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>5. Export Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Certain products may be subject to export controls and restrictions. Buyers are responsible for ensuring compliance with all export regulations in both the origin and destination countries.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>6. Payment & Delivery Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Payment methods accepted include bank transfer (T/T), cryptocurrency, and corporate invoicing for verified accounts.
                </p>
                <p>
                  Delivery times vary based on destination and product availability. All shipments are handled with appropriate temperature control and packaging requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>7. Returns & Disputes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Returns are accepted for defective products or shipping errors within 14 days of receipt. Products must be unopened and in original packaging.
                </p>
                <p>
                  Disputes regarding product quality will be resolved through independent laboratory analysis when necessary.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Liability Limitation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Pharmoo World's liability is limited to the value of products sold. We are not liable for consequential, indirect, or special damages arising from the use or inability to use our products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Terms;