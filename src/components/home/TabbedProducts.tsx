import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, ArrowRight, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  bulk_price: number | null;
  bulk_min_quantity: number | null;
  image_url: string | null;
  manufacturer: string | null;
  in_stock: boolean;
}

const TabbedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { addToCart } = useCart();

  const manufacturers = ["All", "Allergan", "Galderma", "Merz", "Ethicon", "Covidien"];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      
      let query = supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .not("image_url", "is", null)
        .neq("image_url", "");

      if (activeTab !== "all") {
        query = query.ilike("manufacturer", `%${activeTab}%`);
      }

      const { data, error } = await query.limit(8);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [activeTab]);

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, 1);
  };

  return (
    <section className="py-12">
      <div className="container-pharma">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-6 h-auto p-1">
            {manufacturers.map((manufacturer) => (
              <TabsTrigger 
                key={manufacturer} 
                value={manufacturer.toLowerCase()}
                className="whitespace-nowrap"
              >
                {manufacturer}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted" />
                      <div className="p-4 space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No products found for this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link key={product.id} to={`/product/${product.slug}`}>
                    <Card className="group h-full border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden">
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-muted/50 overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-12 w-12 text-muted-foreground/30" />
                            </div>
                          )}
                          
                          {/* Badges */}
                          {product.bulk_price && (
                            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">
                              Bulk Deal
                            </Badge>
                          )}

                          {/* Wishlist & Add to Cart */}
                          <div className="absolute top-2 right-2 flex flex-col gap-2">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Heart className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>

                          {/* Quick Add */}
                          <div className="absolute bottom-2 right-2">
                            <Button
                              size="icon"
                              className="h-9 w-9 rounded-full gradient-medical shadow-md hover:shadow-lg"
                              onClick={(e) => handleAddToCart(e, product.id)}
                            >
                              <ShoppingCart className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3 space-y-1">
                          <h3 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-foreground">
                              ${product.price.toFixed(2)}
                            </p>
                            {product.bulk_price && (
                              <p className="text-xs text-muted-foreground line-through">
                                ${(product.price * 1.2).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabbedProducts;
