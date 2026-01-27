import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Check, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BOTULINUM_PRODUCTS = [
  {
    name: "Azzalure (1 x 125 IU)",
    slug: "azzalure-1x125iu",
    description: "Muscle relaxant to remove frown lines between the eyebrows. Azzalure contains botulinum toxin type A and is used for the temporary improvement of moderate to severe glabellar lines.",
    price: 300,
    bulk_price: 255,
    manufacturer: "Galderma",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "125 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/1x1251u-600x600.png",
  },
  {
    name: "Azzalure (2 x 125 IU)",
    slug: "azzalure-2x125iu",
    description: "Muscle relaxant to remove frown lines between the eyebrows. Double pack for extended treatment sessions.",
    price: 600,
    bulk_price: 510,
    manufacturer: "Galderma",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "2 x 125 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-azzalure-2x125-iu-online-600x600.jpg",
  },
  {
    name: "Bocouture (1 x 50 IU)",
    slug: "bocouture-1x50iu",
    description: "Bocouture is a popular choice by patients under the age of 65 to remove the vertical frown lines between their eyebrows. Contains highly purified botulinum toxin type A.",
    price: 250,
    bulk_price: 212.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "50 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-bocouture-50-iu-online-600x600.jpg",
  },
  {
    name: "Bocouture (2 x 50 IU)",
    slug: "bocouture-2x50iu",
    description: "Bocouture is a popular choice by patients under the age of 65 to remove the vertical frown lines between their eyebrows. Double pack for extended treatment.",
    price: 350,
    bulk_price: 297.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "2 x 50 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-bocouture-50-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (1 x 50 IU)",
    slug: "allergan-botox-1x50iu",
    description: "Botox is widely known for its cosmetic benefits to enhance or improve the individual's appearance, eliminating deep facial skin wrinkles. Also used for medical purposes to treat muscle spasms such as blepharospasm.",
    price: 250,
    bulk_price: 212.50,
    manufacturer: "Allergan",
    origin: "Ireland",
    form: "Powder for injection",
    dosage: "50 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-botox-50-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (2 x 100 IU)",
    slug: "allergan-botox-2x100iu",
    description: "Botox is widely known for its cosmetic benefits to enhance appearance and eliminate deep facial skin wrinkles. Double pack with 100 IU units for comprehensive treatment sessions.",
    price: 650,
    bulk_price: 552.50,
    manufacturer: "Allergan",
    origin: "Ireland",
    form: "Powder for injection",
    dosage: "2 x 100 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-botox-100-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (2 x 200 IU)",
    slug: "allergan-botox-2x200iu",
    description: "Premium Allergan Botox package with high dosage units. Ideal for clinics requiring larger quantities for multiple treatment areas or patient sessions.",
    price: 1300,
    bulk_price: 1105,
    manufacturer: "Allergan",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "2 x 200 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/allergn-botox-1x200iu-600x600.png",
  },
  {
    name: "NeuroBloc",
    slug: "neurobloc",
    description: "NeuroBloc contains Botulinum toxin type B and is used to treat Cervical Dystonia. It improves posture and minimizes shoulder or neck pain. Treatment typically every 12 weeks.",
    price: 300,
    bulk_price: 255,
    manufacturer: "Sloan Pharma",
    origin: "Europe",
    form: "Solution for injection",
    dosage: "5000 U/mL",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/neroblac-600x600.png",
  },
  {
    name: "Xeomin (1 x 100 IU)",
    slug: "xeomin-1x100iu",
    description: "XEOMIN is a prescription medicine that is injected into muscles. Used to treat eyelid muscle spasms (blepharospasm), and cervical dystonia symptoms including abnormal head position and neck pain.",
    price: 350,
    bulk_price: 297.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "100 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/xeomin-1x100iu-600x600.png",
  },
];

interface ProductImportProps {
  categoryId: string;
}

const ProductImport = ({ categoryId }: ProductImportProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [importedCount, setImportedCount] = useState(0);

  const importMutation = useMutation({
    mutationFn: async () => {
      const productsToInsert = BOTULINUM_PRODUCTS.map((product) => ({
        ...product,
        category_id: categoryId,
        in_stock: true,
        bulk_min_quantity: 10,
      }));

      let successCount = 0;

      for (const product of productsToInsert) {
        const { error } = await supabase
          .from("products")
          .upsert(product, { onConflict: "slug" });

        if (!error) {
          successCount++;
          setImportedCount(successCount);
        } else {
          console.error(`Error importing ${product.name}:`, error);
        }
      }

      return successCount;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Import complete",
        description: `Successfully imported ${count} Botulinum products.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Import failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Botulinum Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Import {BOTULINUM_PRODUCTS.length} Botulinum products from pharmooworld.com into the database.
        </p>

        <div className="space-y-2">
          {BOTULINUM_PRODUCTS.map((product, index) => (
            <div key={product.slug} className="flex items-center gap-2 text-sm">
              {importedCount > index ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Package className="h-4 w-4 text-muted-foreground" />
              )}
              <span className={importedCount > index ? "text-muted-foreground" : ""}>
                {product.name}
              </span>
              <Badge variant="outline" className="ml-auto">
                ${product.price}
              </Badge>
            </div>
          ))}
        </div>

        <Button
          onClick={() => importMutation.mutate()}
          disabled={importMutation.isPending || importMutation.isSuccess}
          className="w-full gradient-medical"
        >
          {importMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Importing... ({importedCount}/{BOTULINUM_PRODUCTS.length})
            </>
          ) : importMutation.isSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Imported Successfully
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Import All Products
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductImport;
