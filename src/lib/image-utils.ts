/**
 * Image optimization utilities for faster loading
 * Provides URL transformation and browser capability detection
 * 
 * Note: Supabase Storage image transforms require Pro plan.
 * For free tier, images are served as-is but with optimized loading behavior
 * (lazy loading, proper sizing hints, fade-in transitions).
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'avif' | 'origin';
}

/**
 * Check if browser supports WebP
 */
export const supportsWebP = (): boolean => {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').startsWith('data:image/webp');
};

/**
 * Check if browser supports AVIF
 */
export const supportsAvif = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const chromeMatch = ua.match(/Chrome\/(\d+)/);
  const firefoxMatch = ua.match(/Firefox\/(\d+)/);
  const safariMatch = ua.match(/Version\/(\d+).*Safari/);
  
  if (chromeMatch && parseInt(chromeMatch[1]) >= 85) return true;
  if (firefoxMatch && parseInt(firefoxMatch[1]) >= 93) return true;
  if (safariMatch && parseInt(safariMatch[1]) >= 16) return true;
  
  return false;
};

/**
 * Get optimized image URL
 * Currently returns original URL - Supabase transforms require Pro plan
 * The image components handle optimization via lazy loading, sizing hints, and transitions
 */
export const getOptimizedImageUrl = (
  url: string | null | undefined,
  _options: ImageOptimizationOptions = {}
): string | null => {
  if (!url) return null;
  
  // Return original URL - optimization is handled by image components
  // (lazy loading, proper width/height, decoding=async, fade-in)
  return url;
};

/**
 * Generate srcset for responsive images
 * Returns undefined since transforms aren't available
 */
export const generateSrcSet = (
  _url: string | null | undefined,
  _sizes: number[] = [320, 640, 960, 1280],
  _quality: number = 80
): string | undefined => {
  return undefined;
};

/**
 * Get sizes attribute for responsive images
 */
export const getImageSizes = (breakpoints: { [key: string]: string } = {}): string => {
  const defaultBreakpoints = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '25vw'
  };

  const merged = { ...defaultBreakpoints, ...breakpoints };
  
  return Object.entries(merged)
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`)
    .concat(merged.default || '100vw')
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (url: string, _options?: ImageOptimizationOptions): void => {
  if (typeof document === 'undefined' || !url) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
};

/**
 * Get thumbnail URL - returns original since transforms aren't available
 */
export const getThumbnailUrl = (url: string | null | undefined, _size: number = 100): string | null => {
  return url || null;
};

/**
 * Get optimized product image URL based on context
 * Returns original URL - components handle loading optimization
 */
export const getProductImageUrl = (
  url: string | null | undefined,
  _variant: 'thumbnail' | 'card' | 'detail' | 'full' = 'card'
): string | null => {
  return url || null;
};
