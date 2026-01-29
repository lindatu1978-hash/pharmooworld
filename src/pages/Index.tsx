import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import HeroBanner from "@/components/home/HeroBanner";
import BrandsSection from "@/components/home/BrandsSection";
import ValueProposition from "@/components/home/ValueProposition";
import TabbedProducts from "@/components/home/TabbedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <SEO
        title="Pharmoo World - Global Pharmaceutical & Medical Supplies"
        description="Trusted pharmaceutical supplier offering GMP-certified medicines, APIs, medical devices, and hospital supplies. WHO compliant with global shipping to 50+ countries."
        keywords="pharmaceutical supplier, buy medicines online wholesale, API supplier, medical supplies distributor, pharmaceutical exporter, GMP certified, Botox wholesale, dermal fillers supplier, hospital supplies"
        canonical="/"
      />

      {/* Announcement Bar - outside Layout for full-width */}
      <AnnouncementBar />

      <Layout>
        <CategoryCarousel />
        <HeroBanner />
        <ValueProposition />
        <TabbedProducts />
        <BrandsSection />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
