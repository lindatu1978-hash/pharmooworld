import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import PromoBannerCarousel from "@/components/home/PromoBannerCarousel";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Pharmoo World - Global Pharmaceutical & Medical Supplies</title>
        <meta 
          name="description" 
          content="Trusted pharmaceutical supplier offering GMP-certified medicines, APIs, medical devices, and hospital supplies. WHO compliant with global shipping." 
        />
        <meta name="keywords" content="pharmaceutical supplier, buy medicines online wholesale, API supplier, medical supplies distributor, pharmaceutical exporter, GMP certified, Botox wholesale, dermal fillers supplier" />
        <link rel="canonical" href="https://www.pharmooworld.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pharmoo World - Global Pharmaceutical & Medical Supplies" />
        <meta property="og:description" content="Trusted pharmaceutical supplier offering GMP-certified medicines, APIs, and medical supplies worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pharmooworld.com" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pharmoo World",
            "description": "Global pharmaceutical and medical supplies distributor",
            "url": "https://www.pharmooworld.com",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-234-567-890",
              "contactType": "sales",
              "availableLanguage": ["English"]
            },
            "sameAs": []
          })}
        </script>
      </Helmet>

      <Layout>
        <HeroSection />
        <PromoBannerCarousel />
        <FeaturedCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;