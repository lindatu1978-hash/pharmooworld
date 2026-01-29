import { useState, memo } from "react";
import { cn } from "@/lib/utils";

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none";
  fallback?: React.ReactNode;
  itemProp?: string;
}

/**
 * SEO-optimized image component with:
 * - Proper alt text handling
 * - Width/height to prevent CLS (Cumulative Layout Shift)
 * - Lazy loading for below-the-fold images
 * - Eager loading for critical images
 * - Fallback for broken images
 * - Schema.org itemProp support
 */
const SEOImage = memo(({
  src,
  alt,
  title,
  width,
  height,
  className,
  loading = "lazy",
  priority = false,
  objectFit = "cover",
  fallback,
  itemProp,
}: SEOImageProps) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
  }[objectFit];

  return (
    <img
      src={src}
      alt={alt}
      title={title || alt}
      width={width}
      height={height}
      loading={priority ? "eager" : loading}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      itemProp={itemProp}
      className={cn(
        objectFitClass,
        "transition-opacity duration-300",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
});

SEOImage.displayName = "SEOImage";

export { SEOImage };
export type { SEOImageProps };
