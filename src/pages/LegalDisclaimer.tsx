import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LegalDisclaimer() {
  return (
    <Layout>
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold">Legal Disclaimer</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl">
          <Alert className="mb-8 border-warning bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertTitle className="text-warning">Important Notice</AlertTitle>
            <AlertDescription>
              Please read this legal disclaimer carefully before using our services or purchasing products.
            </AlertDescription>
          </Alert>

          <div className="prose prose-lg max-w-none">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  All pharmaceutical products supplied by Pharmoo World are manufactured and distributed in compliance with international pharmaceutical regulations, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Good Manufacturing Practice (GMP) standards</li>
                  <li>World Health Organization (WHO) guidelines</li>
                  <li>Applicable national and international drug regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Products are Supplied For
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Licensed healthcare providers (hospitals, clinics, pharmacies)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Authorized pharmaceutical distributors and wholesalers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Approved research and development institutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Government health agencies and procurement bodies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Pharmoo World Does NOT Authorize
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span>Sales to unlicensed individuals or entities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span>Off-label distribution or unauthorized use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span>Resale without proper licensing and authorization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span>Import into jurisdictions where products are not approved</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Buyer Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  The buyer assumes full responsibility for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining valid pharmaceutical licenses and permits</li>
                  <li>Obtaining required import permits and customs clearances</li>
                  <li>Ensuring prescription compliance for controlled medications</li>
                  <li>Compliance with all local laws and regulations</li>
                  <li>Proper storage, handling, and distribution of products</li>
                  <li>Verification of product registration in their jurisdiction</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Pharmoo World shall not be held liable for any damages, losses, or claims arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Misuse or off-label use of products</li>
                  <li>Failure to comply with regulatory requirements</li>
                  <li>Improper storage or handling after delivery</li>
                  <li>Use by unauthorized or unlicensed parties</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6 border-primary">
              <CardContent className="p-6">
                <p className="text-center font-semibold">
                  By purchasing products from Pharmoo World, you acknowledge that you have read, understood, and agree to comply with all terms outlined in this Legal Disclaimer, our Terms & Conditions, and applicable pharmaceutical regulations.
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
