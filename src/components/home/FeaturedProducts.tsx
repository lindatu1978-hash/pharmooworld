import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, ArrowRight, Star } from "lucide-react";
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
        .not("image_url", "is", null)
        .neq("image_url", "")
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
      <section className="py-20 lg:py-28 bg-background">
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
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-pharma">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Our Products</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our selection of high-quality pharmaceutical and medical products.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="group whitespace-nowrap">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`}>
              <Card className="group h-full border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-secondary/30 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Package className="h-20 w-20 text-muted-foreground/30" />
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.regulatory_status && (
                        <Badge className="bg-primary/90 text-primary-foreground text-xs">
                          {product.regulatory_status}
                        </Badge>
                      )}
                      {product.bulk_price && (
                        <Badge className="bg-accent/90 text-accent-foreground text-xs">
                          Bulk Deal
                        </Badge>
                      )}
                    </div>

                    {/* Quick Add Button - Always visible */}
                    <div className="absolute bottom-3 right-3">
                      <Button
                        size="icon"
                        className="h-10 w-10 rounded-full gradient-medical shadow-lg hover:scale-110 transition-transform"
                        onClick={(e) => handleAddToCart(e, product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    {product.manufacturer && (
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {product.manufacturer}
                      </p>
                    )}
                    
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    
                    {(product.dosage || product.form) && (
                      <p className="text-sm text-muted-foreground">
                        {[product.dosage, product.form].filter(Boolean).join(" • ")}
                      </p>
                    )}

                    <div className="flex items-end justify-between pt-2 border-t border-border">
                      <div>
                        <p className="text-xl font-bold text-foreground">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.bulk_price && product.bulk_min_quantity && (
                          <p className="text-xs text-accent font-medium">
                            ${product.bulk_price.toFixed(2)} for {product.bulk_min_quantity}+ units
                          </p>
                        )}
                      </div>
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