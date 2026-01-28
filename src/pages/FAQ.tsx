import SEO, { createFAQSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Truck, Package, CreditCard, Shield, HelpCircle } from "lucide-react";

const faqCategories = [
  {
    id: "ordering",
    title: "Ordering",
    icon: ShoppingCart,
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order by browsing our product catalog, adding items to your cart, and proceeding to checkout. You'll need to create an account or sign in to complete your purchase. For bulk orders or special requests, please contact our sales team directly at sales@pharmooworld.com.",
      },
      {
        question: "What is the minimum order quantity?",
        answer: "Minimum order quantities vary by product. Most products have a minimum order of 1 unit for standard pricing, with bulk pricing available for orders of 10 units or more. Specific MOQs are listed on each product page.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer: "Orders can be modified or cancelled within 24 hours of placement, provided they haven't been dispatched. Please contact our customer service team immediately at sales@pharmooworld.com to request any changes.",
      },
      {
        question: "Do you offer bulk pricing?",
        answer: "Yes, we offer competitive bulk pricing for larger orders. Bulk prices are automatically applied when you meet the minimum bulk quantity (typically 10+ units). For very large orders, please contact us for custom quotes.",
      },
      {
        question: "How do I get a quote for my order?",
        answer: "You can request a quote by contacting our sales team at sales@pharmooworld.com or through our Contact page. Please include the products you're interested in, quantities, and delivery location for accurate pricing.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        question: "Where do you ship to?",
        answer: "We deliver goods worldwide including Europe, Asia, Australia, Americas, Canada, and African markets. Shipping times and costs vary by destination.",
      },
      {
        question: "How long does shipping take?",
        answer: "Orders for in-stock items are dispatched within 2 working days. Items not in stock are dispatched within 3-5 days. Worldwide delivery typically takes 3-7 working days. Exact shipping times are confirmed individually upon request.",
      },
      {
        question: "How much does shipping cost?",
        answer: "Shipping costs are calculated based on your location, order weight, and delivery speed. You'll see the exact shipping cost at checkout before completing your order.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is dispatched, you'll receive a confirmation email with tracking information. You can use this to monitor your shipment's progress.",
      },
      {
        question: "Do you offer cold chain shipping for temperature-sensitive products?",
        answer: "Yes, temperature-sensitive products are shipped with appropriate cold chain packaging to maintain product integrity. This may include insulated containers and gel packs where required.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    icon: Package,
    questions: [
      {
        question: "Are your products authentic and certified?",
        answer: "Yes, all our products are 100% authentic and sourced from authorized manufacturers and distributors. We are GMP certified and WHO compliant. All products come with proper documentation including Certificates of Analysis (CoA) where applicable.",
      },
      {
        question: "What certifications do your products have?",
        answer: "Our products carry various certifications including FDA approval, CE marking, GMP certification, and WHO compliance depending on the product type and region of origin. Specific certifications are listed on each product page.",
      },
      {
        question: "What is the shelf life of your products?",
        answer: "Shelf life varies by product type. All products are shipped with adequate remaining shelf life. Specific expiration dates are provided with each shipment, and shelf life information is available on product pages where applicable.",
      },
      {
        question: "Can you source products not listed on your website?",
        answer: "Yes, if you cannot find a product you're looking for, please email us at sales@pharmooworld.com and we will source it for you. We also represent quality-tested products on behalf of manufacturers.",
      },
      {
        question: "Do you provide product documentation (CoA, MSDS)?",
        answer: "Yes, we provide all necessary documentation including Certificates of Analysis (CoA), Material Safety Data Sheets (MSDS), and other regulatory documents upon request. These can be included with your shipment.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept Bank Wire Transfer (T/T), Escrow services, and Corporate invoicing for established accounts. For specific payment arrangements, please contact our sales team.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store sensitive payment details on our servers.",
      },
      {
        question: "Do you offer payment terms for regular customers?",
        answer: "Yes, we offer flexible payment terms for established business accounts. Please contact our sales team to discuss credit terms and corporate invoicing options.",
      },
      {
        question: "Can I get an invoice for my order?",
        answer: "Yes, all orders receive a detailed invoice via email. We can also provide custom invoicing formats for corporate clients upon request.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Refunds",
    icon: Shield,
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 10-day return policy. If you're not satisfied with your purchase, contact our customer service at +1 323-366-9402 or sales@pharmooworld.com within 5 days of receiving your order to request a return.",
      },
      {
        question: "What conditions apply to returns?",
        answer: "Products must be unopened, unused, and undamaged to qualify for a return. Returns for opened or used products are only accepted if the product is faulty. You must contact us and obtain a 'Customer Returns Form' before returning any product.",
      },
      {
        question: "How long does a refund take?",
        answer: "Once we receive and process your return, refunds are issued within 3-5 working days. Please allow time for the refund to settle in your bank account.",
      },
      {
        question: "Who pays for return shipping?",
        answer: "Return shipping costs are the responsibility of the customer unless the product is faulty or was sent in error. Custom fees and charges are also the customer's responsibility.",
      },
    ],
  },
  {
    id: "general",
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        question: "Do I need a license to purchase from you?",
        answer: "Requirements vary by product type and your location. Many products require proof of professional licensing or business registration. Our team will verify your eligibility during the ordering process.",
      },
      {
        question: "How do I contact customer support?",
        answer: "You can reach our customer support team by email at sales@pharmooworld.com or info@pharmooworld.com, or by phone at +1 323-366-9402. We strive to respond to all inquiries as quickly as possible.",
      },
      {
        question: "Do you have a physical location?",
        answer: "Our head office is located at 1914 S Vermont Ave, Los Angeles, CA 90006, USA. We also have operational locations in Nairobi (Kenya), Bangkok (Thailand), Hamburg (Germany), Durban (South Africa), and London (United Kingdom).",
      },
      {
        question: "Can I become a distributor or reseller?",
        answer: "Yes, we welcome partnership inquiries from qualified distributors and resellers. Please contact us at sales@pharmooworld.com with details about your business to discuss partnership opportunities.",
      },
    ],
  },
];

const FAQ = () => {
  // Flatten all FAQs for structured data
  const allFaqs = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ question: q.question, answer: q.answer }))
  );

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about ordering, shipping, products, payments, and returns at Pharmoo World pharmaceutical supplier."
        keywords="pharmaceutical FAQ, shipping questions, payment methods, returns policy, product certification"
        canonical="/faq"
        structuredData={createFAQSchema(allFaqs)}
      />

      <Layout>
        <div className="bg-gradient-to-b from-primary/5 to-background">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our products, ordering, shipping, and more.
              </p>
            </div>
          </section>

          {/* FAQ Categories */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqCategories.map((category) => (
                <div key={category.id} className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-primary/5 px-6 py-4 border-b flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions Accordion */}
                  <Accordion type="single" collapsible className="px-6">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="font-medium text-foreground">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </section>

          {/* Still Have Questions CTA */}
          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-2xl mx-auto">
              <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="mailto:sales@pharmooworld.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default FAQ;
