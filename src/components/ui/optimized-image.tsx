import { useState, useCallback, memo, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";
import { getOptimizedImageUrl, generateSrcSet, getImageSizes } from "@/lib/image-utils";

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
  quality?: number;
  variant?: 'thumbnail' | 'card' | 'detail' | 'full';
  responsive?: boolean;
}

const VARIANT_SIZES = {
  thumbnail: { width: 100, height: 100, quality: 60 },
  card: { width: 400, height: 400, quality: 75 },
  detail: { width: 800, height: 800, quality: 85 },
  full: { width: 1200, height: 1200, quality: 90 }
};

/**
 * Optimized image component with:
 * - WebP format conversion (when supported)
 * - Lazy loading (unless priority is set)
 * - Loading state with skeleton animation
 * - Error handling with fallback
 * - Smooth fade-in transition
 * - Responsive srcset generation
 * - Native browser decoding optimization
 */
const OptimizedImage = memo(({
  src,
  alt,
  title,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  fallback,
  onLoad,
  onError,
  quality,
  variant = 'card',
  responsive = false,
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

  // Get optimized URLs
  const { optimizedSrc, srcSet, sizes } = useMemo(() => {
    const variantConfig = VARIANT_SIZES[variant];
    const finalWidth = width || variantConfig.width;
    const finalHeight = height || variantConfig.height;
    const finalQuality = quality || variantConfig.quality;

    const optimizedSrc = getOptimizedImageUrl(src, {
      width: finalWidth,
      height: finalHeight,
      quality: finalQuality,
      format: 'webp'
    });

    // Generate srcset for responsive images
    const srcSet = responsive ? generateSrcSet(src, undefined, finalQuality) : undefined;
    const sizes = responsive ? getImageSizes() : undefined;

    return { optimizedSrc, srcSet, sizes };
  }, [src, width, height, quality, variant, responsive]);

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
      
      <picture>
        {/* WebP source for browsers that support it */}
        {optimizedSrc && optimizedSrc !== src && (
          <source 
            srcSet={srcSet || optimizedSrc} 
            sizes={sizes}
            type="image/webp" 
          />
        )}
        
        {/* Fallback to original format */}
        <img
          src={optimizedSrc || src}
          alt={alt}
          title={title}
          width={width || VARIANT_SIZES[variant].width}
          height={height || VARIANT_SIZES[variant].height}
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
      </picture>
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
