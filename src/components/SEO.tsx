import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  image?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SITE_URL = "https://www.pharmooworld.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_NAME = "Pharmoo World";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false,
  structuredData,
}: SEOProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  // Default Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: "Global pharmaceutical and medical supplies distributor offering GMP-certified products worldwide.",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+401-232-4508",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "1914 S Vermont Ave",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90006",
      addressCountry: "US",
    },
    sameAs: [],
  };

  // WebSite schema for search functionality
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_NAME} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl || SITE_URL} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl || SITE_URL} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta */}
      <meta name="theme-color" content="#0066CC" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Product structured data helper - Enhanced for better SEO
export const createProductSchema = (product: {
  name: string;
  description?: string | null;
  price: number;
  manufacturer?: string | null;
  inStock: boolean;
  image?: string | null;
  slug: string;
  sku?: string;
  category?: string | null;
  dosage?: string | null;
  form?: string | null;
  origin?: string | null;
  regulatoryStatus?: string | null;
}) => {
  const additionalProperties = [];
  
  if (product.dosage) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Dosage/Strength",
      value: product.dosage,
    });
  }
  
  if (product.form) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Form",
      value: product.form,
    });
  }
  
  if (product.origin) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Country of Origin",
      value: product.origin,
    });
  }
  
  if (product.regulatoryStatus) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Regulatory Status",
      value: product.regulatoryStatus,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} - pharmaceutical grade product from ${SITE_NAME}`,
    image: product.image || DEFAULT_IMAGE,
    url: `${SITE_URL}/product/${product.slug}`,
    sku: product.sku || product.slug,
    mpn: product.slug,
    category: product.category || "Pharmaceutical Products",
    brand: product.manufacturer ? {
      "@type": "Brand",
      name: product.manufacturer,
    } : {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: product.manufacturer ? {
      "@type": "Organization",
      name: product.manufacturer,
    } : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "Worldwide",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 14,
            unitCode: "DAY",
          },
        },
      },
    },
    ...(additionalProperties.length > 0 && { additionalProperty: additionalProperties }),
  };
};

// FAQ structured data helper
export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

// Breadcrumb structured data helper
export const createBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});
