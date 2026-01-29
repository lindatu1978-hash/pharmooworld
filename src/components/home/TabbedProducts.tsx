import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, ArrowRight, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";

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

const manufacturers = ["All", "Allergan", "Galderma", "Merz", "Ethicon", "Covidien"];

// Memoized product card for performance
const ProductCard = memo(({ product, onAddToCart }: { 
  product: Product; 
  onAddToCart: (e: React.MouseEvent, id: string) => void;
}) => (
  <Link to={`/product/${product.slug}`}>
    <Card className="group h-full border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted/50 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              decoding="async"
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

          {/* Wishlist */}
          <div className="absolute top-2 right-2">
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
              onClick={(e) => onAddToCart(e, product.id)}
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
));
ProductCard.displayName = "ProductCard";

// Loading skeleton
const ProductsSkeleton = memo(() => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-0">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
));
ProductsSkeleton.displayName = "ProductsSkeleton";

const TabbedProducts = memo(() => {
  const [activeTab, setActiveTab] = useState("all");
  const { addToCart } = useCart();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featured-products", activeTab],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("id, name, slug, price, bulk_price, bulk_min_quantity, image_url, manufacturer, in_stock")
        .eq("in_stock", true)
        .not("image_url", "is", null)
        .neq("image_url", "");

      if (activeTab !== "all") {
        query = query.ilike("manufacturer", `%${activeTab}%`);
      }

      const { data } = await query.limit(8);
      return (data || []) as Product[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleAddToCart = useCallback(async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, 1);
  }, [addToCart]);

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
              <ProductsSkeleton />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No products found for this filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
});

TabbedProducts.displayName = "TabbedProducts";

export default TabbedProducts;
