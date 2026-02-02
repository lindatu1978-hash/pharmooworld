import { useState, useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Optimized image component with:
 * - Lazy loading (unless priority is set)
 * - Loading state with skeleton animation
 * - Error handling with fallback
 * - Smooth fade-in transition
 * - Native browser decoding optimization
 */
const OptimizedImage = memo(({
  src,
  alt,
  title,
  width = 300,
  height = 300,
  className,
  containerClassName,
  priority = false,
  fallback,
  onLoad,
  onError,
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setError(true);
    onError?.();
  }, [onError]);

  // Show fallback if no src or error occurred
  if (!src || error) {
    return (
      <div className={cn("flex items-center justify-center bg-muted", containerClassName)}>
        {fallback || (
          <Package className="h-8 w-8 text-muted-foreground/50" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
