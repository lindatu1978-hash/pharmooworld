import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  bulk_price: number | null;
  bulk_min_quantity: number | null;
  image_url: string | null;
  dosage: string | null;
  form: string | null;
  manufacturer: string | null;
  regulatory_status: string | null;
  in_stock: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .limit(8);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, 1);
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container-pharma">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-pharma">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our selection of high-quality pharmaceutical and medical products.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <div className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Package className="h-16 w-16 text-muted-foreground/50" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    {product.regulatory_status && (
                      <Badge variant="secondary" className="text-xs">
                        {product.regulatory_status}
                      </Badge>
                    )}
                    
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {(product.dosage || product.form) && (
                      <p className="text-sm text-muted-foreground">
                        {[product.dosage, product.form].filter(Boolean).join(" • ")}
                      </p>
                    )}
                    
                    {product.manufacturer && (
                      <p className="text-xs text-muted-foreground">
                        By {product.manufacturer}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="font-bold text-lg text-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.bulk_price && product.bulk_min_quantity && (
                          <p className="text-xs text-accent">
                            ${product.bulk_price.toFixed(2)} for {product.bulk_min_quantity}+ units
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="gradient-medical hover:opacity-90"
                        onClick={(e) => handleAddToCart(e, product.id)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;