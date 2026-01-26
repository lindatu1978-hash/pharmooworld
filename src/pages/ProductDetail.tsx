import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, FileText, Shield, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  bulk_price: number | null;
  bulk_min_quantity: number | null;
  dosage: string | null;
  form: string | null;
  manufacturer: string | null;
  origin: string | null;
  regulatory_status: string | null;
  shelf_life: string | null;
  in_stock: boolean;
  image_url: string | null;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      setProduct(data);
      setLoading(false);
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const currentPrice = quantity >= (product.bulk_min_quantity || 10) && product.bulk_price
    ? product.bulk_price
    : product.price;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="object-cover w-full h-full rounded-lg" />
            ) : (
              <div className="text-8xl">💊</div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.regulatory_status && (
                <Badge className="mb-2">{product.regulatory_status}</Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.manufacturer && (
                <p className="text-lg text-muted-foreground">by {product.manufacturer}</p>
              )}
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.dosage && (
                <div>
                  <span className="text-sm text-muted-foreground">Dosage</span>
                  <p className="font-medium">{product.dosage}</p>
                </div>
              )}
              {product.form && (
                <div>
                  <span className="text-sm text-muted-foreground">Form</span>
                  <p className="font-medium">{product.form}</p>
                </div>
              )}
              {product.origin && (
                <div>
                  <span className="text-sm text-muted-foreground">Origin</span>
                  <p className="font-medium">{product.origin}</p>
                </div>
              )}
              {product.shelf_life && (
                <div>
                  <span className="text-sm text-muted-foreground">Shelf Life</span>
                  <p className="font-medium">{product.shelf_life}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
                  {product.bulk_price && quantity < (product.bulk_min_quantity || 10) && (
                    <span className="text-muted-foreground">
                      ${product.bulk_price.toFixed(2)}/unit for {product.bulk_min_quantity}+ units
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total: ${(currentPrice * quantity).toFixed(2)}
                  </span>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  disabled={!product.in_stock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-1 text-accent" />
                <span className="text-xs">GMP Certified</span>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <FileText className="h-6 w-6 mx-auto mb-1 text-accent" />
                <span className="text-xs">COA Included</span>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Truck className="h-6 w-6 mx-auto mb-1 text-accent" />
                <span className="text-xs">Global Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground">
                  {product.description || 'This pharmaceutical product is manufactured under GMP conditions and complies with international regulatory standards. All products undergo rigorous quality control testing to ensure purity, potency, and safety.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Applications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Clinical use in hospitals and healthcare facilities</li>
                  <li>• Wholesale distribution to pharmacies</li>
                  <li>• Research and development applications</li>
                  <li>• Licensed pharmaceutical distribution</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Available Documentation</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span>Certificate of Analysis (COA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span>Material Safety Data Sheet (MSDS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span>GMP Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-accent" />
                    <span>Batch Traceability Records</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  ⚠️ Prescription products require valid documentation. Contact us for verification.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
