import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Legal Disclaimer"
        description="Legal disclaimer for pharmaceutical and medical products sold by Pharmoo World. Buyer responsibilities and regulatory compliance information."
        canonical="/disclaimer"
      />

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Legal Disclaimer
            </h1>
            <p className="text-muted-foreground mt-2">
              Important information about product usage and buyer responsibility
            </p>
          </div>
        </div>

        <div className="container-pharma py-12 max-w-4xl">
          <Card className="mb-8 border-warning/50 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-warning shrink-0" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Important Notice</h2>
                  <p className="text-muted-foreground">
                    All pharmaceutical products are supplied in strict compliance with international pharmaceutical regulations and are intended for legitimate medical, pharmaceutical, and healthcare purposes only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Buyer Responsibilities</h2>
              <Card>
                <CardContent className="p-6 space-y-4 text-muted-foreground">
                  <p>The buyer is fully responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Licensing:</strong> Maintaining all necessary licenses and permits required to purchase, import, and distribute pharmaceutical products
                    </li>
                    <li>
                      <strong>Import Permits:</strong> Obtaining all required import permits and customs documentation for their jurisdiction
                    </li>
                    <li>
                      <strong>Prescription Compliance:</strong> Ensuring proper prescription verification and dispensing procedures are followed
                    </li>
                    <li>
                      <strong>Local Legal Adherence:</strong> Complying with all local, national, and international laws and regulations
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Product Usage</h2>
              <Card>
                <CardContent className="p-6 space-y-4 text-muted-foreground">
                  <p>
                    Products sold through Pharmoo World are intended for use by licensed healthcare professionals, pharmacies, hospitals, clinics, and authorized distributors.
                  </p>
                  <p>
                    <strong>Pharmoo World does not authorize:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Misuse or off-label distribution of pharmaceutical products</li>
                    <li>Sale to unauthorized or unlicensed entities</li>
                    <li>Use contrary to approved medical indications</li>
                    <li>Distribution in violation of local laws or regulations</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Regulatory Standards</h2>
              <Card>
                <CardContent className="p-6 space-y-4 text-muted-foreground">
                  <p>
                    All products are sourced from manufacturers that comply with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Good Manufacturing Practice (GMP) standards</li>
                    <li>World Health Organization (WHO) guidelines</li>
                    <li>FDA regulations (where applicable)</li>
                    <li>European Medicines Agency (EMA) standards (where applicable)</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <Card>
                <CardContent className="p-6 space-y-4 text-muted-foreground">
                  <p>
                    Pharmoo World provides products in good faith based on manufacturer specifications and certifications. We are not liable for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Improper use, storage, or handling of products after delivery</li>
                    <li>Failure of buyer to comply with applicable regulations</li>
                    <li>Consequences arising from unauthorized distribution</li>
                    <li>Any use contrary to approved medical indications</li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Disclaimer;