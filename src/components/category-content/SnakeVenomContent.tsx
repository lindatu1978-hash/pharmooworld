import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const venomProducts = [
  { product: "Black Mamba Snake Venom (Lyophilized)", price: "$500" },
  { product: "King Cobra Venom (1g)", price: "$500" },
  { product: "Deathstalker Scorpion Venom (1g)", price: "$4,000" },
  { product: "Blue Scorpion Venom (1g)", price: "$4,000" },
  { product: "Horseshoe Crab Blood (100ml)", price: "$1,500" },
  { product: "Saw-Scaled Viper Venom (1g)", price: "$1,326" },
  { product: "Jararaca Pit Viper Venom (1g)", price: "$500" },
];

const researchApplications = [
  "Pain management and analgesic drug development",
  "Anticoagulant and antithrombotic research",
  "Cancer treatment and tumor growth inhibition studies",
  "Cardiovascular drug discovery (ACE inhibitors)",
  "Neuromuscular disorder research",
  "Antimicrobial peptide development",
  "Diagnostic reagent production (coagulation testing)",
  "Autoimmune disease research",
];

const venomTypes = [
  { name: "Neurotoxic Venoms", desc: "Target the nervous system by blocking neurotransmitter release. Used in analgesic research and neuromuscular studies. Examples include Black Mamba and King Cobra venoms." },
  { name: "Hemotoxic Venoms", desc: "Affect the blood and cardiovascular system by disrupting clotting mechanisms. Essential in anticoagulant drug development. Common in viper species." },
  { name: "Cytotoxic Venoms", desc: "Cause cell and tissue damage. Studied for potential anticancer properties and understanding cell death pathways." },
  { name: "Myotoxic Venoms", desc: "Target muscle tissue and are researched for insights into muscular dystrophy and muscle regeneration therapies." },
];

const safetyProtocols = [
  "All venom products must be handled in certified biosafety laboratories (BSL-2 or higher)",
  "Proper personal protective equipment (PPE) including gloves, goggles, and lab coats required",
  "Store lyophilized venoms at -20°C or below; reconstituted venoms at -80°C",
  "Antivenom must be available on-site when handling live venom samples",
  "MSDS documentation provided with every shipment",
  "Only qualified researchers with institutional approval may purchase",
];

const faqItems = [
  { q: "What types of snake venom does PharmooWorld supply?", a: "PharmooWorld supplies a wide range of research-grade snake venoms including neurotoxic (Black Mamba, King Cobra), hemotoxic (Saw-Scaled Viper, Gaboon Viper), and cytotoxic varieties. All venoms are lyophilized for maximum stability and shelf life." },
  { q: "Who can purchase snake venom from PharmooWorld?", a: "Snake venom products are strictly available to licensed research institutions, pharmaceutical companies, and accredited laboratories. Buyers must provide valid institutional credentials and proof of authorized research programs." },
  { q: "How is snake venom shipped safely?", a: "All venom products are shipped in UN-certified containers with appropriate cold chain packaging. Lyophilized venoms are shipped with desiccant packs and temperature indicators. Detailed handling instructions and MSDS documents accompany every shipment." },
  { q: "What documentation comes with snake venom orders?", a: "Each venom order includes a Certificate of Analysis (CoA), Material Safety Data Sheet (MSDS), species identification verification, protein concentration data, and LD50 values where available." },
  { q: "Can snake venom be used in cosmetic products?", a: "While synthetic peptides inspired by snake venom (such as Syn-Ake) are used in anti-aging cosmetics, raw snake venom itself is not suitable for direct cosmetic application. PharmooWorld supplies research-grade venom for scientific and pharmaceutical purposes only." },
  { q: "Does PharmooWorld offer bulk pricing on snake venom?", a: "Yes, PharmooWorld provides competitive wholesale pricing for bulk venom orders. Research institutions and pharmaceutical companies ordering larger quantities receive significant volume discounts. Contact our team for custom quotes." },
  { q: "How should snake venom be stored?", a: "Lyophilized snake venom should be stored at -20°C or below in airtight containers away from moisture and light. Once reconstituted, venom should be aliquoted and stored at -80°C. Avoid repeated freeze-thaw cycles to maintain bioactivity." },
  { q: "What quality controls does PharmooWorld apply to venom products?", a: "All venom products undergo rigorous quality testing including protein electrophoresis (SDS-PAGE), HPLC analysis, enzymatic activity assays, and sterility testing. Each batch is verified for purity, potency, and species authenticity before release." },
  { q: "Are there legal restrictions on purchasing snake venom?", a: "Yes, snake venom is a controlled biological substance in many jurisdictions. PharmooWorld complies with all international regulations including CITES where applicable. Buyers are responsible for ensuring compliance with their local laws and institutional policies." },
  { q: "What is the shelf life of lyophilized snake venom?", a: "When stored properly at -20°C or below, lyophilized snake venom maintains its bioactivity for 3-5 years. PharmooWorld provides expiration dates and storage recommendations with every product to ensure optimal research results." },
];

const blogPosts = [
  {
    id: 1,
    category: "Venom-Derived Drugs",
    title: "Lethal Poisons Transformed Into Life-Saving Medicines",
    excerpt: "How deadly snake and scorpion venoms are being repurposed by pharmaceutical researchers to create breakthrough treatments for cardiovascular disease, chronic pain, and neurological disorders.",
    date: "Feb 13, 2026",
    image: "https://images.unsplash.com/photo-1585095595205-e68428a9e205?w=600&h=400&fit=crop",
    readTime: "8 min read",
  },
  {
    id: 2,
    category: "Cancer Treatment",
    title: "Venom and Cancer: A Revolutionary Approach to Healthcare",
    excerpt: "Scorpion venom peptides like chlorotoxin are showing remarkable selectivity for cancer cells. Discover how Deathstalker scorpion venom is being used in tumor imaging and targeted therapy research.",
    date: "Jan 28, 2026",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
    readTime: "6 min read",
  },
  {
    id: 3,
    category: "Toad Venom Research",
    title: "Bufo Alvarius & 5-MeO-DMT: The Psychedelic Medicine Revolution",
    excerpt: "Colorado River Toad venom contains 5-MeO-DMT, one of the most potent naturally occurring psychoactive compounds. Researchers are exploring its potential for treatment-resistant depression and PTSD.",
    date: "Jan 15, 2026",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    readTime: "7 min read",
  },
  {
    id: 4,
    category: "Medical Applications",
    title: "Harnessing the Power of Venoms: From Snake Bites to Pain Relief",
    excerpt: "Natural pain relief alternatives derived from animal venoms are advancing rapidly. Black Mamba dendrotoxins and cone snail conotoxins offer non-opioid analgesic pathways with fewer side effects.",
    date: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
    readTime: "5 min read",
  },
];

const SnakeVenomContent = () => {
  return (
    <section className="mt-12 md:mt-16 space-y-10 md:space-y-14 text-foreground">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Buy Research-Grade Snake Venom Online at PharmooWorld</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld is a trusted international supplier of high-purity, research-grade snake venom for pharmaceutical research, drug discovery, and diagnostic applications. Our carefully sourced and processed venom products serve leading research institutions, biotech companies, and pharmaceutical manufacturers worldwide. Every product undergoes rigorous quality control to ensure consistency, purity, and bioactivity.
        </p>
      </div>

      {/* What is snake venom */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">What Is Snake Venom and Why Is It Important in Research?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Snake venom is a complex mixture of proteins, peptides, enzymes, and other bioactive molecules produced by venomous snakes. Far from being merely dangerous, these compounds have proven invaluable in modern medicine and pharmaceutical research. Several life-saving drugs have been developed directly from snake venom components, including ACE inhibitors for hypertension (derived from Brazilian pit viper venom) and anticoagulants used in cardiovascular medicine.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Today, snake venom research continues to drive breakthroughs in pain management, cancer therapy, and neurological disorders. The unique molecular structures found in venom offer templates for designing novel therapeutics with high specificity and potency.
        </p>
      </div>

      {/* Types of venom */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Types of Snake Venom</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Snake venoms are classified based on their primary mode of action. Understanding these categories is essential for selecting the appropriate venom for your research application:
        </p>
        <div className="space-y-3">
          {venomTypes.map((type) => (
            <div key={type.name} className="border-l-2 border-primary/30 pl-4">
              <p className="text-sm md:text-base font-semibold">{type.name}</p>
              <p className="text-sm text-muted-foreground">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Applications */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Research Applications of Snake Venom</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Snake venom components are actively studied across numerous fields of biomedical research. Key applications include:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {researchApplications.map((app) => <li key={app}>{app}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld supplies venoms specifically selected and processed to support these research applications, with detailed analytical data provided for each batch.
        </p>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Snake Venom Product Pricing</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Pricing varies based on species, purity grade, and quantity ordered. Below are representative prices for our most popular venom products:
        </p>
        <div className="rounded-lg border overflow-hidden mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold text-right">Price (2026)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {venomProducts.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="text-sm">{item.product}</TableCell>
                  <TableCell className="text-sm font-medium text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Volume discounts available for institutional and bulk orders. <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for custom quotes.
        </p>
      </div>

      {/* Safety */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Safety & Handling Protocols</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Snake venom is a potent biological material requiring strict handling procedures. PharmooWorld is committed to ensuring the safe delivery and use of all venom products:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {safetyProtocols.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>

      {/* How to order */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">How to Order Snake Venom from PharmooWorld</h2>
        <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2">
          <p className="text-sm md:text-base font-semibold">Follow these steps to place your order:</p>
          <ol className="list-decimal list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
            <li>Register an institutional account with your organization details</li>
            <li>Provide your research credentials and institutional approval documents</li>
            <li>Browse our venom catalog and add products to your cart</li>
            <li>Complete shipping details (cold chain requirements noted automatically)</li>
            <li>Submit your order for credential verification</li>
            <li>Once verified, your order ships in certified cold-chain packaging</li>
          </ol>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Need assistance? <Link to="/contact" className="text-primary hover:underline">Contact our team</Link> for guidance on product selection, regulatory compliance, or bulk ordering. PharmooWorld's dedicated support staff ensures a smooth purchasing experience from inquiry to delivery.
        </p>
      </div>

      {/* Why PharmooWorld */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Why Choose PharmooWorld for Snake Venom Supply?</h2>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li><strong>Research-grade purity</strong> — every batch tested via SDS-PAGE, HPLC, and enzymatic assays</li>
          <li><strong>Complete documentation</strong> — CoA, MSDS, and species verification included</li>
          <li><strong>Cold chain shipping</strong> — UN-certified packaging with temperature monitoring</li>
          <li><strong>Competitive wholesale pricing</strong> — significant discounts for bulk and institutional orders</li>
          <li><strong>Global compliance</strong> — adherence to CITES and international biological material regulations</li>
          <li><strong>Expert support</strong> — dedicated team to assist with product selection and regulatory questions</li>
        </ul>
      </div>

      {/* Blog Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Latest from Our Venom Research Blog</h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Stay informed with the latest developments in venom-based pharmaceutical research, new product discoveries, and industry insights from our team of experts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground text-xs font-medium">
                    {post.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1">
                  <span className="text-xs font-medium text-foreground">{post.readTime}</span>
                </div>
              </div>
              <CardContent className="p-4 md:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <time>{post.date}</time>
                </div>
                <h3 className="font-bold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-primary text-xs md:text-sm font-medium pt-1">
                  <span>Read more</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Frequently Asked Questions — Snake Venom</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-sm md:text-base font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default SnakeVenomContent;