import SEO from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustedBy from "@/components/home/TrustedBy";
import PromoBannerCarousel from "@/components/home/PromoBannerCarousel";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
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

      <Layout>
        <HeroSection />
        <TrustedBy />
        <PromoBannerCarousel />
        <FeaturedCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;