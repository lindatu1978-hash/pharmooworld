import { memo } from "react";
import productPlaceholder from "@/assets/product-placeholder.jpg";

interface ProductPlaceholderProps {
  productName?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable product placeholder image component
 * Used when a product image is missing or fails to load
 */
const ProductPlaceholder = memo(({ 
  productName = "Product", 
  className = "",
  size = "md"
}: ProductPlaceholderProps) => {
  const sizeClasses = {
    sm: "w-full h-full",
    md: "w-full h-full",
    lg: "w-full h-full"
  };

  return (
    <img
      src={productPlaceholder}
      alt={`${productName} - Image coming soon`}
      className={`${sizeClasses[size]} object-cover ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
});

ProductPlaceholder.displayName = "ProductPlaceholder";

export default ProductPlaceholder;
