import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  bulk_price: number | null;
  image_url: string | null;
  manufacturer: string | null;
  in_stock: boolean | null;
}

export function FeaturedProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or('manufacturer.ilike.%ethicon%,manufacturer.ilike.%covidien%')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Product[];
    },
  });

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Surgical Equipment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium surgical staplers and sutures from leading manufacturers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-full animate-pulse">
                <div className="aspect-video bg-muted" />
                <CardContent className="p-4">
                  <div className="h-5 bg-muted rounded mb-2 w-3/4" />
                  <div className="h-4 bg-muted rounded mb-4 w-1/2" />
                  <div className="h-6 bg-muted rounded w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="secondary" className="mb-3">New Arrivals</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Surgical Equipment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Premium surgical staplers and sutures from Ethicon & Covidien
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products?category=hospital-supplies">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                  )}
                  {product.in_stock && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      In Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.manufacturer}</p>
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.bulk_price && (
                      <span className="text-sm text-muted-foreground">
                        Bulk: ${product.bulk_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
