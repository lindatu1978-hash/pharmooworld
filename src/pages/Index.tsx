import { Suspense, lazy, memo } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";

// Critical path - load immediately (above the fold)
import AnnouncementBar from "@/components/home/AnnouncementBar";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroBanner from "@/components/home/HeroBanner";

// Lazy load below-the-fold components
const ValueProposition = lazy(() => import("@/components/home/ValueProposition"));
const TabbedProducts = lazy(() => import("@/components/home/TabbedProducts"));
const BrandsSection = lazy(() => import("@/components/home/BrandsSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Lightweight skeleton loaders
const ProductsSkeleton = memo(() => (
  <section className="py-12">
    <div className="container-pharma">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-36" />
      </div>
      <Skeleton className="h-10 w-full max-w-md mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </section>
));
ProductsSkeleton.displayName = "ProductsSkeleton";

const SectionSkeleton = memo(() => (
  <section className="py-12">
    <div className="container-pharma">
      <Skeleton className="h-8 w-48 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  </section>
));
SectionSkeleton.displayName = "SectionSkeleton";

const Index = () => {
  return (
    <>
      <SEO
        title="Pharmoo World - Global Pharmaceutical & Medical Supplies"
        description="Trusted pharmaceutical supplier offering GMP-certified medicines, APIs, medical devices, and hospital supplies. WHO compliant with global shipping to 50+ countries."
        keywords="pharmaceutical supplier, buy medicines online wholesale, API supplier, medical supplies distributor, pharmaceutical exporter, GMP certified, Botox wholesale, dermal fillers supplier, hospital supplies"
        canonical="/"
      />

      {/* Critical path - renders immediately */}
      <AnnouncementBar />

      <Layout>
        <CategoryCarousel />
        <HeroBanner />
        
        {/* Below the fold - lazy loaded with suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <ValueProposition />
        </Suspense>
        
        <Suspense fallback={<ProductsSkeleton />}>
          <TabbedProducts />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <BrandsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </Layout>
    </>
  );
};

export default Index;
