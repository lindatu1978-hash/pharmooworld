import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const selectedCategory = searchParams.get("category") || "";
  const selectedManufacturer = searchParams.get("manufacturer") || "";
  const selectedOrigin = searchParams.get("origin") || "";

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const manufacturers = [...new Set(products.map(p => p.manufacturer).filter(Boolean))];
  const origins = [...new Set(products.map(p => p.origin).filter(Boolean))];

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(productId, 1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} | Pharmoo World` : "Products | Pharmoo World"}</title>
        <meta 
          name="description" 
          content={`Browse our selection of ${currentCategory?.name || "pharmaceutical products"} from certified manufacturers worldwide.`} 
        />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {currentCategory ? currentCategory.name : "All Products"}
            </h1>
            <p className="text-muted-foreground">
              Browse our comprehensive range of pharmaceutical and medical products
            </p>
          </div>
        </div>

        <div className="container-pharma py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </h2>
                  {(selectedCategory || selectedManufacturer || selectedOrigin || searchQuery) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
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
                    <SelectTrigger>
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
                  <label className="text-sm font-medium">Manufacturer</label>
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
                    <SelectTrigger>
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
                  <label className="text-sm font-medium">Country of Origin</label>
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
                    <SelectTrigger>
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
            <div className="lg:col-span-3">
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-muted rounded-lg mb-4" />
                        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.slug}`}>
                      <Card className="group h-full hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
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
                              {product.in_stock && (
                                <Button
                                  size="sm"
                                  className="gradient-medical hover:opacity-90"
                                  onClick={(e) => handleAddToCart(e, product.id)}
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Products;