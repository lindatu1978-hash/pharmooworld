import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const botoxPricing = [
  { product: "Botox 50 Units", price: "$299" },
  { product: "Botox 100 Units", price: "$399" },
  { product: "Botox 100 Units Non-English", price: "$379" },
  { product: "Botox 100 Units European", price: "$379" },
  { product: "Botox 100 Units Cosmetic", price: "$449" },
  { product: "Botox 100 Units Polish", price: "$379" },
  { product: "Botox 100 Units Indian – English", price: "$379" },
  { product: "Botox International English 100 Units", price: "$389" },
];

const licenseTypes = [
  { abbr: "MD", title: "Medical Doctor", desc: "A licensed physician qualified to diagnose, treat, and perform medical procedures, including Botox injections." },
  { abbr: "DO", title: "Osteopathic Doctor", desc: "A fully licensed physician with specialized training in the musculoskeletal system, authorized to administer Botox." },
  { abbr: "DDS", title: "Doctor of Dental Surgery", desc: "A dental professional trained in surgical procedures, often using Botox for therapeutic and cosmetic purposes." },
  { abbr: "DMD", title: "Doctor of Medical Dentistry", desc: "A dental practitioner with medical training, qualified to use Botox in dental and facial treatments." },
  { abbr: "DPM", title: "Doctor of Podiatric Medicine", desc: "A specialist in foot and ankle care, often using Botox for medical treatments like pain management and muscle conditions." },
  { abbr: "DVM", title: "Doctor of Veterinary Medicine", desc: "A licensed veterinarian who may use Botox for specific animal treatments and medical applications." },
  { abbr: "PA", title: "Physician Assistant", desc: "A licensed medical professional who works under a physician's supervision and is trained to administer treatments like Botox." },
  { abbr: "NP", title: "Nurse Practitioner", desc: "An advanced practice nurse with the authority to diagnose, prescribe, and administer treatments, including Botox." },
  { abbr: "ARNP", title: "Advanced Registered Nurse Practitioner", desc: "A highly trained nurse practitioner with advanced clinical skills and the ability to provide medical treatments." },
  { abbr: "APRN", title: "Advanced Practice Registered Nurse", desc: "A nurse with advanced training, qualified to administer medications and perform medical procedures." },
  { abbr: "APN", title: "Advanced Practice Nurse", desc: "A certified nurse with specialized training, authorized to provide advanced medical care, including Botox administration." },
  { abbr: "FNP", title: "Family Nurse Practitioner", desc: "A nurse practitioner specializing in family medicine, qualified to prescribe and administer a wide range of treatments, including Botox." },
];

const medicalConditions = [
  "Blepharospasm",
  "Cerebral palsy",
  "Limb spasticity",
  "Overactive bladder",
  "Urinary retention",
  "Severe primary axillary hyperhidrosis",
  "Chronic migraine",
  "Episodic migraine",
  "Cervical dystonia",
  "Neck pain",
];

const contraindications = [
  "Resistance (or, in other words, insensitivity) to Botox",
  "Pregnancy and breast-feeding",
  "Violation of the skin integrity at the injection area",
  "Oncological diseases",
  "Chronic diseases in the phase of exacerbation (at the moment of injection)",
];

const sideEffects = [
  "Pain at the injection site",
  "Redness",
  "Swelling",
  "Itching",
  "Bruising",
  "Skin sensitivity",
  "Tissue discoloration",
  "Headache",
  "Nausea",
];

const cosmeticInjectionSites = [
  "Forehead",
  "Glabellar region",
  "Periorbital area",
  "Perioral area",
];

const faqItems = [
  { q: "Why should I choose PharmooWorld for my purchases?", a: "PharmooWorld offers a wide range of benefits to its customers, including an extensive selection of brand-name products, competitive wholesale discounts, reliable shipping options, and more—ensuring the best possible shopping experience." },
  { q: "Who is eligible to order from PharmooWorld?", a: "Since PharmooWorld sells aesthetic products intended for professional use, only certified healthcare providers with a valid medical license are eligible to place orders." },
  { q: "How much can I save when shopping with PharmooWorld?", a: "Thanks to wholesale discounts and special offers, PharmooWorld allows you to save up to 40% on authentic dermal fillers, botulinum toxins, and other cosmetic injectables." },
  { q: "What happens if I find a lower price elsewhere?", a: "If you find a lower price for a specific dermal filler, botulinum toxin, or other cosmetic injectable offered by PharmooWorld, contact one of our sales managers to discuss the possibility of a price match." },
  { q: "How does PharmooWorld's discount system work?", a: "PharmooWorld offers generous wholesale discounts—the more products you order in bulk, the greater the discount you will receive." },
  { q: "Are the products available at PharmooWorld authentic?", a: "Yes, all products available at PharmooWorld are 100% authentic. We offer only original dermal fillers, botulinum toxins, and other cosmetic injectables." },
  { q: "What types of medical licenses does PharmooWorld accept?", a: "PharmooWorld accepts officially issued licenses from accredited healthcare providers. Our sales managers manually verify the license you provide during the order approval process." },
  { q: "Where is the best place to purchase Botox online?", a: "When buying Botox, it's important to choose a trustworthy supplier like PharmooWorld. This ensures you'll receive a high-quality, original product at an affordable price." },
  { q: "How can I order Botox as a provider through PharmooWorld?", a: "To order Botox from PharmooWorld, simply follow these three easy steps: create an account, add Botox to your shopping cart, and fill in your delivery and billing details. You can also contact our sales managers by phone or text for assistance during the order process." },
  { q: "Does PharmooWorld offer wholesale pricing?", a: "Yes, PharmooWorld provides attractive wholesale pricing for bulk purchases." },
  { q: "Can I purchase Botox injection supplies on PharmooWorld?", a: "Yes, PharmooWorld offers a wide range of authentic botulinum toxins, including Botox." },
  { q: "What are the licensing requirements for buying Botox from PharmooWorld?", a: "To order Botox from PharmooWorld, you must possess an officially issued license from an accredited healthcare provider. This license will be manually verified by our sales managers." },
  { q: "Does PharmooWorld guarantee the authenticity of all products sold?", a: "Yes, PharmooWorld guarantees the authenticity of all products sold. We only offer original brand-name dermal fillers, botulinum toxins, and other cosmetic injectables from world-renowned brands." },
];

const BotulinumContent = () => {
  return (
    <section className="mt-12 md:mt-16 space-y-10 md:space-y-14 text-foreground">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">PharmooWorld – The Best Place to Buy Botox Online</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          PharmooWorld is an international retail &amp; wholesale supplier of Botox, botulinum toxins, and other solutions of aesthetic medicine and skincare products (hyaluronidase, anesthetics, creams, threads, or ophthalmology drugs).
        </p>
      </div>

      {/* How to buy */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">How to buy Allergan Botox in a bottle at PharmooWorld?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">You can safely purchase a Botox kit in one of the following ways:</p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          <li>By adding Botox to your cart and submitting the order</li>
          <li>By contacting us via email at <a href="mailto:info@PharmooWorld.com" className="text-primary hover:underline">info@PharmooWorld.com</a></li>
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          At PharmooWorld online store, every registered customer can order high-quality Botox online both retail and wholesale. Our store offers discounts to those who buy in large quantities and Free 1–5 day fast shipping over $750. Feel free to check PharmooWorld wholesale prices by visiting the product pages, such as Botox 100 Units, 50 Units, and many others.
        </p>
      </div>

      {/* Is it legal */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Is it Legal to Buy Botox Online?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botox is a botulinum toxin product elaborated and patented by the French-American manufacturer Allergan and FDA approved. It is both a cosmetic and therapeutic drug. Apart from being used for aesthetic purposes, it is applied to treat such serious medical conditions as:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {medicalConditions.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botox injections should be performed only by experienced licensed professionals who have received proper training and certification in administering Botox.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Please note that the application of the product by non-professionals might be health and life-threatening. However, you can legally buy Allergan Botox online in the USA if you hold a license that proves that you are a certified medical professional. By means of providing it to us, you will obtain a right to buy and use Botox and other botulinum toxin products in your medical practice.
        </p>
      </div>

      {/* License types */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Types of Licenses We Accept for Buying Botox Online</h2>
        <div className="space-y-3">
          {licenseTypes.map((l) => (
            <div key={l.abbr} className="border-l-2 border-primary/30 pl-4">
              <p className="text-sm md:text-base font-semibold">{l.title} ({l.abbr})</p>
              <p className="text-sm text-muted-foreground">{l.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-secondary/40 rounded-lg p-4 md:p-6 space-y-2 mt-4">
          <p className="text-sm md:text-base font-semibold">In case of having a license, you can safely place an Allergan Botox order online on PharmooWorld:</p>
          <ol className="list-decimal list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
            <li>Register your personal account</li>
            <li>Fill in all the required information</li>
            <li>Select the needed products and add them to your cart</li>
            <li>Provide your medical license or prescription</li>
            <li>Proceed with the payment</li>
            <li>Wait for your license to be verified by our managers</li>
          </ol>
        </div>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          In case you need any assistance with the registration, payment, or any other aspect of the purchasing process, <Link to="/contact" className="text-primary hover:underline">contact the PharmooWorld team</Link>. Remember, the PharmooWorld customer support service is always ready to help you out. When deciding to order Botox online or dermal fillers online on PharmooWorld.com, you might be sure that you buy 100% authentic top-quality products with lot numbers and, therefore, guarantee your patient the best possible result after the procedure.
        </p>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">How Much Does Botox Vials Cost?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The average Botox price depends on several factors. Namely, it is determined by the product's type, volume, package, and supplier.
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li>There exist two main types of Botox, namely medical and cosmetic. While the first is used to treat muscle-related health issues, the latter is applied in aesthetic medicine. In most cases, medical Botox tends to be more expensive than the cosmetic one.</li>
          <li>Botox is usually sold in a variety of different volumes. Among the most popular ones are Botox 50IU and Botox 100IU. Naturally, the bigger the product's volume is, the more it will cost.</li>
          <li>Depending on the market Botox is targeted to, it is advertised in different packages, such as European, Polish, Indian, and so on.</li>
          <li>Each supplier of cosmetic injectables sets its own Botox price. As well, it might or might not provide its customers with wholesale discounts, special deals, and other price benefits.</li>
        </ul>
        <div className="rounded-lg border overflow-hidden mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold text-right">Price (2026)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {botoxPricing.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="text-sm">{item.product}</TableCell>
                  <TableCell className="text-sm font-medium text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Basic info */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">What Basic Information Should You Know About Botox?</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Apart from their therapeutic purposes, injections of Botox (Botulin toxin A) are famous to be the powerful means to fight the signs of natural aging. Namely, they are used to efficiently eliminate dynamic wrinkles on the forehead, under the eyes, and around the mouth. Due to the fact that recent implications of Botox have gone even further, there are lots of studies and cases of adult patients being treated with Botox to lift breasts, take care of erectile dysfunction, manage premature ejaculation, eliminate the effect of a gummy smile, or fight excessive sweating.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Moreover, scientists are not going to stop exploring new and new applications of botulinum toxin to improve people's health and quality of life.
        </p>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">A Few Words on the History of Botox</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botulin toxin type A is synthesized by anaerobic bacteria (microorganisms) that belong to the Clostridium family. The first medical application of Botox occurred in 1960.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Before this time, it was considered to be a dreadful poison that caused a health condition called botulism, which might be characterized as poisoning (mainly a result of eating poisoned meat products) that is accompanied by full or partial paralysis of the organism with the possibility of fatal consequences.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          However, a group of Canadian scientists managed to "tame" the dangerous poison, providing a great number of patients with an opportunity to cure a variety of diseases (not only cosmetic issues) and, therefore, radically change their lives. In 1960, doctors used Botox to treat partial and complete paralysis of the facial nerve, lower and upper limb spasticity, urge urinary incontinence, overactive bladder, hyperhidrosis, migraine, etc.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          These days, doctors apply Botox to treat heavy headaches, cerebral palsy, strabismus, and other diseases of the nervous system. In addition, botulin therapy might be used by orthodontists to cure bruxism (or, as it is also called, teeth grinding).
        </p>
      </div>

      {/* Working principle */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Botox Working Principle</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The working principle of botulinum toxin is pretty straightforward. Under normal circumstances, it acts locally. Namely, the substance has the power to disrupt the transmission of the nerve impulse from the nerve end to the muscle, thereby relaxing this particular muscle.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The method botulinum toxin helps to eliminate mimic wrinkles depends directly on the way they form. Facial expressions such as laughing, smiling, crying, frowning, etc., involve an active movement and contraction of facial muscles.
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2 pl-2">
          <li><strong>At a young age</strong>, the skin has lots of collagen and elastin. These substances quickly fill in the creases that occurred as a result of smiling. Therefore, there is not even a trace of them on the skin surface.</li>
          <li><strong>At a more senior age</strong>, active facial expressions lead to the formation of creases. The main reason for it is that the skin deposits of hyaluronic acid and collagen decrease as a person gets older. Therefore, there occur pronounced wrinkles around the eyes, as well as furrow lines on the forehead or between the eyebrows.</li>
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Luckily, the Botox working principle comes in handy to treat the above-mentioned wrinkles. Here is how it works: when botulinum toxin penetrates the dermal tissues, its molecules bind to the proteins on the edges of the nerve fibers, preventing them from receiving brain signals. As a result, the tension in the tissues gradually decreases, muscles relax, and wrinkles vanish.
        </p>
      </div>

      {/* Expected result */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Expected Botox Result</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          When speaking about the expected result of the cosmetic application of Botox, it is essential to mention that it will be observed on the second day after the procedure. It will gradually show up and become clearly visible in two weeks after the treatment. The final result will persist for 3–5 months and gradually weaken afterward.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          So the injection of Botox should be repeated from time to time if the patient wants to remain smooth and wrinkle-free skin.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botox acts in several stages. It is the main reason why the first effect of it might become visible in 2–7 days after the injection. While the peak of Botox action, in its turn, will occur near the end of the second month after the procedure. After that, it gradually weakens as the organism starts to grow new nerve fibers.
        </p>
      </div>

      {/* Contraindications */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Contraindications</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Botulinum toxin that is used in modern products (including Botox), is highly purified and refined. Therefore, it is safe to be used for the treatment of both adults and children. Moreover, it is one of the best well-studied medications with hundreds of clinical trials and experiments.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Thus, it rarely leads to serious complications. Nevertheless, Botox treatment is not for everybody. Patients with the following health conditions are not regarded to be suitable candidates for both therapeutic and cosmetic Botox injections:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {contraindications.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Only patients with none of the above-mentioned diagnoses are allowed to undergo the procedure of Botox injection.
        </p>
      </div>

      {/* Side effects */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Possible Side Effects</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Those who do not have any contraindications to the administration of Botox should be informed about its possible side effects. Botulinum toxin is a foreign substance, so the body might react to it in certain ways, such as:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {sideEffects.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          These are temporary reactions of the organism that should disappear in a few hours or days after the treatment. In case of worsening of the patient's well-being, it is recommended to contact the doctor immediately. To minimize the pain, the patient can use painkillers or apply a pack of ice to the area of the treatment.
        </p>
      </div>

      {/* Cosmetic treatment */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Cosmetic Treatment with Botox</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Initially, Botox has been used only for therapeutic purposes. However, while treating blepharospasm by means of administering botulinum toxin in the eye muscle, the scientists noticed that the substance smoothed out the under-eye wrinkles so that the patients acquired a younger appearance.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          It has set a start to a cosmetic era of Botox for the elimination of mimic wrinkles with the aim of facial rejuvenation. These days, it is extensively used for wrinkle reduction on the forehead, nose bridge, and near the eye. Moreover, it is applied to correct the skin imperfections in the lower third of the face. The most common Botox injection sites:
        </p>
        <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-1 pl-2">
          {cosmeticInjectionSites.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          The usage of Botox for cosmetic purposes requires a doctor to be specially trained, skilled, and experienced. Otherwise, there is a possibility to relax the wrong muscle, which might harm a patient's appearance, create facial asymmetry, make mouth corners drop, and so on. Thus, injections of botulin toxin require excellent knowledge of human anatomy.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          It is also important to understand that botulin toxin is not able to smooth out static wrinkles completely. However, botulinotherapy is very effective in treating dynamic wrinkles and preventing the formation of new ones. If a patient needs to eliminate static wrinkles rather than dynamic ones, injections of dermal fillers might be considered.
        </p>
      </div>

      {/* Hyperhidrosis */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Botox for the Treatment of Hyperhidrosis</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Wrinkle smoothing is not the only application of Botox therapy. In addition, botulin toxin is also used to temporarily weaken the activity of sweat glands, and, therefore, solve the unpleasant problem of excessive sweating.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          For the treatment of the so-called hyperhidrosis, Botox might be injected into the armpits, palms, feet, and groins. When being more precise, it should be administered superficially and in large quantities in order to stop sweat secretion. The halt of excessive sweating is achieved due to the violation of the transmission of the nerve impulse to the sweat gland. As a result, a patient notices a considerable decrease in sweat secretion for the time period that equals 4–6 months.
        </p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          While injecting botulin toxin into one area (for instance, underarms), the cosmetologist should warn the patient that sweat may start to exude from another area (for example, back). However, it will happen only in extreme conditions, such as high temperatures, active sports, etc. Please keep in mind that botulin toxin cannot be injected in all places at the same time, while sweating is a necessary process for controlling the body temperature.
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm md:text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default BotulinumContent;
