import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO, { createProductSchema, createBreadcrumbSchema } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, Minus, Plus, FileCheck, Shield, Truck, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  bulk_price: number | null;
  bulk_min_quantity: number | null;
  image_url: string | null;
  dosage: string | null;
  form: string | null;
  manufacturer: string | null;
  origin: string | null;
  regulatory_status: string | null;
  shelf_life: string | null;
  in_stock: boolean;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
        
        // Fetch category
        if (data?.category_id) {
          const { data: categoryData } = await supabase
            .from("categories")
            .select("id, name, slug")
            .eq("id", data.category_id)
            .single();
          
          setCategory(categoryData);
        }
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [slug]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 999) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
  };

  const currentPrice = product?.bulk_price && 
                       product?.bulk_min_quantity && 
                       quantity >= product.bulk_min_quantity
    ? product.bulk_price
    : product?.price || 0;

  const totalPrice = currentPrice * quantity;

  // Generate descriptive alt text for SEO
  const getImageAltText = () => {
    if (!product) return "";
    const parts = [product.name];
    if (product.manufacturer) parts.push(`by ${product.manufacturer}`);
    if (product.form) parts.push(product.form);
    if (product.dosage) parts.push(product.dosage);
    parts.push("pharmaceutical product for wholesale");
    return parts.join(" - ");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-pharma py-12">
          <div className="animate-pulse grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-pharma py-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - Buy Wholesale`}
        description={product.description || `Buy ${product.name} from Pharmoo World. ${product.regulatory_status || "GMP Certified"}. ${product.manufacturer ? `By ${product.manufacturer}.` : ""} Global shipping available.`}
        keywords={`${product.name}, ${product.manufacturer || ""}, ${category?.name || "pharmaceutical"}, wholesale, buy online`}
        canonical={`/product/${product.slug}`}
        type="product"
        image={product.image_url || undefined}
        structuredData={createProductSchema({
          name: product.name,
          description: product.description,
          price: product.price,
          manufacturer: product.manufacturer,
          inStock: product.in_stock,
          image: product.image_url,
          slug: product.slug,
        })}
      />

      <Layout>
        {/* Breadcrumb with Schema */}
        <nav className="bg-secondary/30 py-4" aria-label="Breadcrumb">
          <div className="container-pharma">
            <ol 
              className="flex items-center gap-2 text-sm"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="text-muted-foreground hover:text-foreground" itemProp="item">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <span className="text-muted-foreground" aria-hidden="true">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/products" className="text-muted-foreground hover:text-foreground" itemProp="item">
                  <span itemProp="name">Products</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              {category && (
                <>
                  <span className="text-muted-foreground" aria-hidden="true">/</span>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link to={`/products?category=${category.slug}`} className="text-muted-foreground hover:text-foreground" itemProp="item">
                      <span itemProp="name">{category.name}</span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                </>
              )}
              <span className="text-muted-foreground" aria-hidden="true">/</span>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className="text-foreground truncate" itemProp="name">{product.name}</span>
                <meta itemProp="position" content={category ? "4" : "3"} />
              </li>
            </ol>
          </div>
        </nav>

        <article 
          className="container-pharma py-8 lg:py-12"
          itemScope
          itemType="https://schema.org/Product"
        >
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image with SEO optimization */}
            <figure className="aspect-square bg-secondary/50 rounded-xl flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={getImageAltText()}
                  title={product.name}
                  width={600}
                  height={600}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  itemProp="image"
                />
              ) : (
                <Package className="h-32 w-32 text-muted-foreground/50" aria-label={`${product.name} - no image available`} />
              )}
            </figure>

            {/* Product Info */}
            <div className="space-y-6">
              <header>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.regulatory_status && (
                    <Badge className="gradient-medical text-white border-0">
                      {product.regulatory_status}
                    </Badge>
                  )}
                  {product.in_stock ? (
                    <Badge variant="outline" className="text-accent border-accent">
                      <link itemProp="availability" href="https://schema.org/InStock" />
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <link itemProp="availability" href="https://schema.org/OutOfStock" />
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <h1 
                  className="text-3xl lg:text-4xl font-bold text-foreground mb-2"
                  itemProp="name"
                >
                  {product.name}
                </h1>

                {product.manufacturer && (
                  <p className="text-lg text-muted-foreground">
                    By <span itemProp="brand" itemScope itemType="https://schema.org/Brand">
                      <span itemProp="name">{product.manufacturer}</span>
                    </span>
                  </p>
                )}
              </header>

              {/* Specs */}
              <dl className="grid grid-cols-2 gap-4">
                {product.dosage && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Dosage/Strength</dt>
                    <dd className="font-medium">{product.dosage}</dd>
                  </div>
                )}
                {product.form && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Form</dt>
                    <dd className="font-medium">{product.form}</dd>
                  </div>
                )}
                {product.origin && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Origin</dt>
                    <dd className="font-medium" itemProp="countryOfOrigin">{product.origin}</dd>
                  </div>
                )}
                {product.shelf_life && (
                  <div>
                    <dt className="text-sm text-muted-foreground">Shelf Life</dt>
                    <dd className="font-medium">{product.shelf_life}</dd>
                  </div>
                )}
              </dl>

              {/* Pricing with Schema */}
              <Card>
                <CardContent className="p-6" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <meta itemProp="priceCurrency" content="USD" />
                  <link itemProp="availability" href={product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                  
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-foreground">
                        $<span itemProp="price" content={currentPrice.toString()}>{currentPrice.toFixed(2)}</span>
                        <span className="text-lg font-normal text-muted-foreground"> / unit</span>
                      </p>
                      {product.bulk_price && product.bulk_min_quantity && (
                        <p className="text-sm text-accent">
                          Bulk price: ${product.bulk_price.toFixed(2)} for {product.bulk_min_quantity}+ units
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                        min={1}
                        max={999}
                        aria-label="Product quantity"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 999}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full gradient-medical hover:opacity-90 gap-2"
                    disabled={!product.in_stock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                    {product.in_stock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <ul className="grid grid-cols-2 gap-4" aria-label="Product guarantees">
                <li className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span>GMP Certified</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <FileCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span>COA Available</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span>Global Shipping</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span>Secure Payment</span>
                </li>
              </ul>

              {/* Hidden description for schema */}
              <meta itemProp="description" content={product.description || `${product.name} - pharmaceutical product available for wholesale purchase.`} />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description || "This pharmaceutical product is manufactured under GMP conditions and complies with international regulatory standards. Contact us for detailed product specifications and documentation."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Clinical use in hospitals and medical facilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Hospital and healthcare provider distribution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <span>Wholesale pharmaceutical distribution</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documentation" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 text-muted-foreground">
                      The following documentation is available for this product:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span>Certificate of Analysis (COA)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span>Material Safety Data Sheet (MSDS)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span>GMP Certificate</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                        <span>Batch Traceability Records</span>
                      </li>
                    </ul>
                    <aside className="mt-6 p-4 bg-warning/10 rounded-lg flex items-start gap-3" role="note">
                      <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm">
                        Prescription products require valid documentation. Contact our sales team for licensing verification.
                      </p>
                    </aside>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default ProductDetail;
