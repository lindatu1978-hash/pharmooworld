/**
 * Image optimization utilities for faster loading
 * Supports WebP conversion, compression, and responsive sizing
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'avif' | 'origin';
}

const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Check if a URL is from Supabase Storage
 */
const isSupabaseStorageUrl = (url: string): boolean => {
  if (!SUPABASE_STORAGE_URL) return false;
  return url.includes(SUPABASE_STORAGE_URL) && url.includes('/storage/');
};

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
  // AVIF support detection is async, so we use a conservative approach
  // Most modern browsers (Chrome 85+, Firefox 93+) support it
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  // Chrome 85+, Firefox 93+, Safari 16+
  const chromeMatch = ua.match(/Chrome\/(\d+)/);
  const firefoxMatch = ua.match(/Firefox\/(\d+)/);
  const safariMatch = ua.match(/Version\/(\d+).*Safari/);
  
  if (chromeMatch && parseInt(chromeMatch[1]) >= 85) return true;
  if (firefoxMatch && parseInt(firefoxMatch[1]) >= 93) return true;
  if (safariMatch && parseInt(safariMatch[1]) >= 16) return true;
  
  return false;
};

/**
 * Get optimized image URL with compression and format conversion
 * Works with Supabase Storage URLs using render transformations
 */
export const getOptimizedImageUrl = (
  url: string | null | undefined,
  options: ImageOptimizationOptions = {}
): string | null => {
  if (!url) return null;

  const {
    width,
    height,
    quality = 80,
    format = 'webp'
  } = options;

  // For Supabase Storage URLs, use the render endpoint
  if (isSupabaseStorageUrl(url)) {
    try {
      const urlObj = new URL(url);
      
      // Convert /storage/v1/object/public/ to /storage/v1/render/image/public/
      const renderPath = urlObj.pathname.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/'
      );
      
      const params = new URLSearchParams();
      if (width) params.set('width', width.toString());
      if (height) params.set('height', height.toString());
      params.set('quality', quality.toString());
      if (format !== 'origin') params.set('format', format);
      
      return `${urlObj.origin}${renderPath}?${params.toString()}`;
    } catch {
      return url;
    }
  }

  // For local assets or other URLs, return as-is
  return url;
};

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (
  url: string | null | undefined,
  sizes: number[] = [320, 640, 960, 1280],
  quality: number = 80
): string | undefined => {
  if (!url || !isSupabaseStorageUrl(url)) return undefined;

  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(url, { width: size, quality, format: 'webp' });
      return optimizedUrl ? `${optimizedUrl} ${size}w` : null;
    })
    .filter(Boolean)
    .join(', ');
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
export const preloadImage = (url: string, options?: ImageOptimizationOptions): void => {
  if (typeof document === 'undefined') return;
  
  const optimizedUrl = getOptimizedImageUrl(url, options);
  if (!optimizedUrl) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizedUrl;
  if (options?.format === 'webp') {
    link.type = 'image/webp';
  }
  document.head.appendChild(link);
};

/**
 * Get thumbnail URL (small, compressed version)
 */
export const getThumbnailUrl = (url: string | null | undefined, size: number = 100): string | null => {
  return getOptimizedImageUrl(url, {
    width: size,
    height: size,
    quality: 60,
    format: 'webp'
  });
};

/**
 * Get optimized product image URL based on context
 */
export const getProductImageUrl = (
  url: string | null | undefined,
  variant: 'thumbnail' | 'card' | 'detail' | 'full' = 'card'
): string | null => {
  if (!url) return null;

  const configs: Record<string, ImageOptimizationOptions> = {
    thumbnail: { width: 100, height: 100, quality: 60, format: 'webp' },
    card: { width: 400, height: 400, quality: 75, format: 'webp' },
    detail: { width: 800, height: 800, quality: 85, format: 'webp' },
    full: { width: 1200, height: 1200, quality: 90, format: 'webp' }
  };

  return getOptimizedImageUrl(url, configs[variant] || configs.card);
};
