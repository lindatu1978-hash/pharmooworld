import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2, Package, ArrowRight, Clock, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  manufacturer: string | null;
  category_id: string | null;
  price: number;
  image_url: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductSearchProps {
  className?: string;
  placeholder?: string;
  onClose?: () => void;
}

const RECENT_SEARCHES_KEY = "pharmoo_recent_searches";
const MAX_RECENT_SEARCHES = 5;

const POPULAR_SEARCHES = [
  "Belotero",
  "Ethicon",
  "Surgical Gowns",
  "Snake Venom",
  "Dermal Fillers",
  "Face Shield",
];

const getRecentSearches = (): string[] => {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveRecentSearch = (query: string) => {
  try {
    const recent = getRecentSearches();
    const filtered = recent.filter((s) => s.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

const removeRecentSearch = (query: string) => {
  try {
    const recent = getRecentSearches();
    const updated = recent.filter((s) => s.toLowerCase() !== query.toLowerCase());
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail
  }
};

const ProductSearch = ({ className, placeholder = "Search products, APIs, medical supplies...", onClose }: ProductSearchProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setProducts([]);
      setCategories([]);
      setIsOpen(false);
      return;
    }

    setShowSuggestions(false);

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Search products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          supabase
            .from("products")
            .select("id, name, slug, manufacturer, category_id, price, image_url")
            .or(`name.ilike.%${query}%,manufacturer.ilike.%${query}%,description.ilike.%${query}%,dosage.ilike.%${query}%,form.ilike.%${query}%,origin.ilike.%${query}%`)
            .limit(8),
          supabase
            .from("categories")
            .select("id, name, slug")
            .ilike("name", `%${query}%`)
            .limit(3),
        ]);

        if (productsRes.data) setProducts(productsRes.data);
        if (categoriesRes.data) setCategories(categoriesRes.data);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions) {
      const totalSuggestions = recentSearches.length + POPULAR_SEARCHES.length;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < totalSuggestions - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalSuggestions - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            const isRecent = selectedIndex < recentSearches.length;
            const suggestion = isRecent
              ? recentSearches[selectedIndex]
              : POPULAR_SEARCHES[selectedIndex - recentSearches.length];
            handleSuggestionClick(suggestion);
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          inputRef.current?.blur();
          break;
      }
      return;
    }

    const totalItems = categories.length + products.length + 1; // +1 for "view all" option

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex === -1 || selectedIndex === totalItems - 1) {
          // View all results
          handleViewAll();
        } else if (selectedIndex < categories.length) {
          // Category selected
          handleCategoryClick(categories[selectedIndex].slug);
        } else {
          // Product selected
          const productIndex = selectedIndex - categories.length;
          handleProductClick(products[productIndex].slug);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleProductClick = (slug: string) => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
      setRecentSearches(getRecentSearches());
    }
    navigate(`/product/${slug}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleCategoryClick = (slug: string) => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
      setRecentSearches(getRecentSearches());
    }
    navigate(`/products?category=${slug}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleViewAll = () => {
    if (query.trim()) {
      saveRecentSearch(query.trim());
      setRecentSearches(getRecentSearches());
    }
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleRemoveRecent = (e: React.MouseEvent, search: string) => {
    e.stopPropagation();
    removeRecentSearch(search);
    setRecentSearches(getRecentSearches());
  };

  const handleFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    } else if (query.length < 2 && (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0)) {
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }
  };

  const hasResults = products.length > 0 || categories.length > 0;
  const hasSuggestions = recentSearches.length > 0 || POPULAR_SEARCHES.length > 0;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length < 2) {
              setShowSuggestions(true);
            }
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10 w-full"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown (when no query) */}
      {showSuggestions && query.length < 2 && hasSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-2 border-b border-border">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Recent Searches
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={`recent-${search}`}
                  onClick={() => handleSuggestionClick(search)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors group",
                    selectedIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Clock className={cn(
                    "h-4 w-4 flex-shrink-0",
                    selectedIndex === index ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                  <span className="flex-1 font-medium">{search}</span>
                  <button
                    onClick={(e) => handleRemoveRecent(e, search)}
                    className={cn(
                      "p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20",
                      selectedIndex === index ? "text-primary-foreground" : "text-muted-foreground hover:text-destructive"
                    )}
                    aria-label="Remove from recent searches"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-2">
            <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Popular Searches
            </p>
            {POPULAR_SEARCHES.map((search, index) => {
              const itemIndex = recentSearches.length + index;
              return (
                <button
                  key={`popular-${search}`}
                  onClick={() => handleSuggestionClick(search)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
                    selectedIndex === itemIndex
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <TrendingUp className={cn(
                    "h-4 w-4 flex-shrink-0",
                    selectedIndex === itemIndex ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                  <span className="font-medium">{search}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
          {!hasResults && !isLoading && (
            <div className="p-4 text-center text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No products found for "{query}"</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="p-2 border-b border-border">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">Categories</p>
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
                    selectedIndex === index
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div className="p-2">
              <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">Products</p>
              {products.map((product, index) => {
                const itemIndex = categories.length + index;
                return (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors",
                      selectedIndex === itemIndex
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      {product.manufacturer && (
                        <p className={cn(
                          "text-xs truncate",
                          selectedIndex === itemIndex
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        )}>
                          {product.manufacturer}
                        </p>
                      )}
                    </div>
                    <span className={cn(
                      "text-sm font-semibold flex-shrink-0",
                      selectedIndex === itemIndex
                        ? "text-primary-foreground"
                        : "text-primary"
                    )}>
                      ${product.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* View All Results */}
          {hasResults && (
            <button
              onClick={handleViewAll}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 border-t border-border text-sm font-medium transition-colors",
                selectedIndex === categories.length + products.length
                  ? "bg-primary text-primary-foreground"
                  : "text-primary hover:bg-muted"
              )}
            >
              <span>View all results for "{query}"</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
