import { useEffect, useState, memo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, Filter, Search, X } from "lucide-react";
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
  origin: string | null;
  regulatory_status: string | null;
  in_stock: boolean;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// SEO-optimized product image
const ProductImage = memo(({ product }: { product: Product }) => {
  if (!product.image_url) {
    return <Package className="h-16 w-16 text-muted-foreground/50" aria-hidden="true" />;
  }

  const altText = [
    product.name,
    product.manufacturer ? `by ${product.manufacturer}` : null,
    product.form,
    product.dosage,
    "pharmaceutical product"
  ].filter(Boolean).join(" - ");

  return (
    <img
      src={product.image_url}
      alt={altText}
      title={product.name}
      width={300}
      height={300}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      itemProp="image"
    />
  );
});
ProductImage.displayName = "ProductImage";

// Product card with schema markup
const ProductCard = memo(({ product, onAddToCart }: { 
  product: Product; 
  onAddToCart: (e: React.MouseEvent, id: string) => void;
}) => (
  <Link to={`/product/${product.slug}`}>
    <article 
      itemScope 
      itemType="https://schema.org/Product"
      className="h-full"
    >
      <Card className="group h-full hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <figure className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <ProductImage product={product} />
          </figure>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {product.regulatory_status && (
                <Badge variant="secondary" className="text-xs">
                  {product.regulatory_status}
                </Badge>
              )}
              {!product.in_stock && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <h3 
              className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
              itemProp="name"
            >
              {product.name}
            </h3>
            
            {(product.dosage || product.form) && (
              <p className="text-sm text-muted-foreground">
                {[product.dosage, product.form].filter(Boolean).join(" • ")}
              </p>
            )}
            
            {product.manufacturer && (
              <p className="text-xs text-muted-foreground">
                By <span itemProp="brand">{product.manufacturer}</span>
              </p>
            )}

            <div 
              className="flex items-center justify-between pt-2"
              itemProp="offers" 
              itemScope 
              itemType="https://schema.org/Offer"
            >
              <div>
                <p className="font-bold text-lg text-foreground">
                  <span itemProp="priceCurrency" content="USD">$</span>
                  <span itemProp="price" content={product.price.toString()}>
                    {product.price.toFixed(2)}
                  </span>
                </p>
                {product.bulk_price && product.bulk_min_quantity && (
                  <p className="text-xs text-accent">
                    ${product.bulk_price.toFixed(2)} for {product.bulk_min_quantity}+ units
                  </p>
                )}
                <link 
                  itemProp="availability" 
                  href={product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} 
                />
              </div>
              {product.in_stock && (
                <Button
                  size="sm"
                  className="gradient-medical hover:opacity-90"
                  onClick={(e) => onAddToCart(e, product.id)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  </Link>
));
ProductCard.displayName = "ProductCard";

// Loading skeleton
const ProductsSkeleton = memo(() => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <Skeleton className="aspect-square w-full rounded-lg mb-4" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
));
ProductsSkeleton.displayName = "ProductsSkeleton";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const selectedCategory = searchParams.get("category") || "";
  const selectedManufacturer = searchParams.get("manufacturer") || "";
  const selectedOrigin = searchParams.get("origin") || "";
  const urlSearchQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");
      
      setCategories(categoriesData || []);

      // Build products query
      let query = supabase.from("products").select("*");

      if (selectedCategory) {
        const category = categoriesData?.find(c => c.slug === selectedCategory);
        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      if (selectedManufacturer) {
        query = query.eq("manufacturer", selectedManufacturer);
      }

      if (selectedOrigin) {
        query = query.eq("origin", selectedOrigin);
      }

      const { data: productsData, error } = await query.order("name");

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(productsData || []);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [selectedCategory, selectedManufacturer, selectedOrigin]);

  // Sync URL search param to local state
  useEffect(() => {
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const manufacturers = [...new Set(products.map(p => p.manufacturer).filter(Boolean))];
  const origins = [...new Set(products.map(p => p.origin).filter(Boolean))];

  const handleAddToCart = useCallback(async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, 1);
  }, [addToCart]);

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory);

  return (
    <>
      <SEO
        title={currentCategory ? `${currentCategory.name} - Pharmaceutical Products` : "Products - Pharmaceutical & Medical Supplies"}
        description={`Browse our selection of ${currentCategory?.name || "pharmaceutical products, APIs, medical devices, and hospital supplies"} from GMP-certified manufacturers worldwide. Wholesale pricing available.`}
        keywords={`${currentCategory?.name || "pharmaceutical products"}, wholesale, GMP certified, medical supplies, buy online`}
        canonical={`/products${selectedCategory ? `?category=${selectedCategory}` : ""}`}
      />

      <Layout>
        <header className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {currentCategory ? currentCategory.name : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              Browse our comprehensive range of pharmaceutical and medical products
            </p>
          </div>
        </header>

        <div className="container-pharma py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1" aria-label="Product filters">
              <div className="sticky top-32 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" aria-hidden="true" />
                    Filters
                  </h2>
                  {(selectedCategory || selectedManufacturer || selectedOrigin || searchQuery) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" aria-hidden="true" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    aria-label="Search products"
                  />
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label htmlFor="category-filter" className="text-sm font-medium">Category</label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      if (value === "all") {
                        searchParams.delete("category");
                      } else {
                        searchParams.set("category", value);
                      }
                      setSearchParams(searchParams);
                    }}
                  >
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Manufacturer Filter */}
                <div className="space-y-2">
                  <label htmlFor="manufacturer-filter" className="text-sm font-medium">Manufacturer</label>
                  <Select
                    value={selectedManufacturer}
                    onValueChange={(value) => {
                      if (value === "all") {
                        searchParams.delete("manufacturer");
                      } else {
                        searchParams.set("manufacturer", value);
                      }
                      setSearchParams(searchParams);
                    }}
                  >
                    <SelectTrigger id="manufacturer-filter">
                      <SelectValue placeholder="All Manufacturers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Manufacturers</SelectItem>
                      {manufacturers.map((manufacturer) => (
                        <SelectItem key={manufacturer} value={manufacturer!}>
                          {manufacturer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Origin Filter */}
                <div className="space-y-2">
                  <label htmlFor="origin-filter" className="text-sm font-medium">Country of Origin</label>
                  <Select
                    value={selectedOrigin}
                    onValueChange={(value) => {
                      if (value === "all") {
                        searchParams.delete("origin");
                      } else {
                        searchParams.set("origin", value);
                      }
                      setSearchParams(searchParams);
                    }}
                  >
                    <SelectTrigger id="origin-filter">
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {origins.map((origin) => (
                        <SelectItem key={origin} value={origin!}>
                          {origin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:col-span-3">
              <p className="mb-4 text-sm text-muted-foreground" role="status">
                Showing {filteredProducts.length} products
              </p>

              {isLoading ? (
                <ProductsSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12" role="status">
                  <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" aria-hidden="true" />
                  <h2 className="text-lg font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  role="list"
                  aria-label="Products list"
                >
                  {filteredProducts.map((product) => (
                    <div key={product.id} role="listitem">
                      <ProductCard product={product} onAddToCart={handleAddToCart} />
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;
