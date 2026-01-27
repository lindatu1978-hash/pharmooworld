import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Check, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const BOTULINUM_PRODUCTS = [
  {
    name: "Azzalure (1 x 125 IU)",
    slug: "azzalure-1x125iu",
    description: "Muscle relaxant to remove frown lines between the eyebrows. Azzalure contains botulinum toxin type A and is used for the temporary improvement of moderate to severe glabellar lines.",
    price: 300,
    bulk_price: 255,
    manufacturer: "Galderma",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "125 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/1x1251u-600x600.png",
  },
  {
    name: "Azzalure (2 x 125 IU)",
    slug: "azzalure-2x125iu",
    description: "Muscle relaxant to remove frown lines between the eyebrows. Double pack for extended treatment sessions.",
    price: 600,
    bulk_price: 510,
    manufacturer: "Galderma",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "2 x 125 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-azzalure-2x125-iu-online-600x600.jpg",
  },
  {
    name: "Bocouture (1 x 50 IU)",
    slug: "bocouture-1x50iu",
    description: "Bocouture is a popular choice by patients under the age of 65 to remove the vertical frown lines between their eyebrows. Contains highly purified botulinum toxin type A.",
    price: 250,
    bulk_price: 212.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "50 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-bocouture-50-iu-online-600x600.jpg",
  },
  {
    name: "Bocouture (2 x 50 IU)",
    slug: "bocouture-2x50iu",
    description: "Bocouture is a popular choice by patients under the age of 65 to remove the vertical frown lines between their eyebrows. Double pack for extended treatment.",
    price: 350,
    bulk_price: 297.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "2 x 50 IU",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-bocouture-50-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (1 x 50 IU)",
    slug: "allergan-botox-1x50iu",
    description: "Botox is widely known for its cosmetic benefits to enhance or improve the individual's appearance, eliminating deep facial skin wrinkles. Also used for medical purposes to treat muscle spasms such as blepharospasm.",
    price: 250,
    bulk_price: 212.50,
    manufacturer: "Allergan",
    origin: "Ireland",
    form: "Powder for injection",
    dosage: "50 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-botox-50-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (2 x 100 IU)",
    slug: "allergan-botox-2x100iu",
    description: "Botox is widely known for its cosmetic benefits to enhance appearance and eliminate deep facial skin wrinkles. Double pack with 100 IU units for comprehensive treatment sessions.",
    price: 650,
    bulk_price: 552.50,
    manufacturer: "Allergan",
    origin: "Ireland",
    form: "Powder for injection",
    dosage: "2 x 100 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-botox-100-iu-online-600x600.jpg",
  },
  {
    name: "Allergan Botox (2 x 200 IU)",
    slug: "allergan-botox-2x200iu",
    description: "Premium Allergan Botox package with high dosage units. Ideal for clinics requiring larger quantities for multiple treatment areas or patient sessions.",
    price: 1300,
    bulk_price: 1105,
    manufacturer: "Allergan",
    origin: "Europe",
    form: "Powder for injection",
    dosage: "2 x 200 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/allergn-botox-1x200iu-600x600.png",
  },
  {
    name: "NeuroBloc",
    slug: "neurobloc",
    description: "NeuroBloc contains Botulinum toxin type B and is used to treat Cervical Dystonia. It improves posture and minimizes shoulder or neck pain. Treatment typically every 12 weeks.",
    price: 300,
    bulk_price: 255,
    manufacturer: "Sloan Pharma",
    origin: "Europe",
    form: "Solution for injection",
    dosage: "5000 U/mL",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/neroblac-600x600.png",
  },
  {
    name: "Xeomin (1 x 100 IU)",
    slug: "xeomin-1x100iu",
    description: "XEOMIN is a prescription medicine that is injected into muscles. Used to treat eyelid muscle spasms (blepharospasm), and cervical dystonia symptoms including abnormal head position and neck pain.",
    price: 350,
    bulk_price: 297.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Powder for injection",
    dosage: "100 IU",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/xeomin-1x100iu-600x600.png",
  },
];

const DERMAL_FILLER_PRODUCTS = [
  {
    name: "Juvederm Volift with Lidocaine (2x1ml)",
    slug: "juvederm-volift-lidocaine-2x1ml",
    description: "The latest addition to the Juvederm range - Juvéderm® VOLIFT® with lidocaine, delivers natural looks at their best.",
    price: 180,
    bulk_price: 153,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/juvederm-volift-with-lidocaine-2x1ml-600x600.png",
  },
  {
    name: "Juvederm Volbella with Lidocaine (2x1ml)",
    slug: "juvederm-volbella-lidocaine-2x1ml",
    description: "A treatment designed to plump up lips with increased volume as well as smoothing lines around the mouth.",
    price: 175,
    bulk_price: 148.75,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-volbella-with-lidocaine-1x1ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Ultra 2 (2x0.55ml)",
    slug: "juvederm-ultra-2-2x055ml",
    description: "A highly cross-linked formulation for the subtle correction of medium facial lines and skin depressions. Also enhances lip contour.",
    price: 70,
    bulk_price: 59.50,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 0.55ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-ultra-2-2x055ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Ultra 3 (2x1ml)",
    slug: "juvederm-ultra-3-2x1ml",
    description: "Also enhances lip contour and volume. A thicker gel that allows more versatility in contouring and volumising, facial lines and naso-labial folds, filling deeper wrinkles and enhancing lip volume.",
    price: 140,
    bulk_price: 119,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-ultra-3-2x1ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Ultra 4 (2x1ml)",
    slug: "juvederm-ultra-4-2x1ml",
    description: "A highly cross-linked robust formulation for volumising and correction of deeper folds and wrinkles, including enhancing volume in the cheeks and chin.",
    price: 150,
    bulk_price: 127.50,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-ultra-4-2x1ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Ultra Smile (2x0.55ml)",
    slug: "juvederm-ultra-smile-2x055ml",
    description: "Juvéderm ULTRA SMILE is specifically for your lips to create natural, smooth, beautiful results.",
    price: 100,
    bulk_price: 85,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 0.55ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-ultra-smile-2x055ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Volbella with Lidocaine (1x1ml)",
    slug: "juvederm-volbella-lidocaine-1x1ml",
    description: "A treatment designed to plump up lips with increased volume as well as smoothing lines around the mouth.",
    price: 90,
    bulk_price: 76.50,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-juvederm-volbella-with-lidocaine-1x1ml-online-600x600.jpg",
  },
  {
    name: "Juvederm Voluma with Lidocaine (2x1ml)",
    slug: "juvederm-voluma-lidocaine-2x1ml",
    description: "Juvéderm™ VOLUMA™ with Lidocaine is injectable hyaluronic volumiser that recontours the face to restore volume to chin, cheeks, and cheekbones that have become hollow or thin due to weight loss or age-related facial fat loss.",
    price: 175,
    bulk_price: 148.75,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/voluma-xc-e1416503834931-600x341.jpg",
  },
  {
    name: "Juvederm Volift Retouch (2x0.55ml)",
    slug: "juvederm-volift-retouch-2x055ml",
    description: "A new addition to the Juvederm range in 0.55ml, designed to create less wastage in the first session.",
    price: 100,
    bulk_price: 85,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "2 x 0.55ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/juvederm-volift-retouch-600x600.png",
  },
  {
    name: "Juvederm Hydrate (1x1ml)",
    slug: "juvederm-hydrate-1x1ml",
    description: "Juvéderm HYDRATE offers deep hydration to give you smoother, firmer skin in areas that are often susceptible to sun damage and the signs of aging - the face, neck, décolletage, and hands.",
    price: 35,
    bulk_price: 29.75,
    manufacturer: "Allergan",
    origin: "France",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/juvederm-hydrate-600x336.jpg",
  },
  {
    name: "Filorga NCTF 135HA (5x3ml)",
    slug: "filorga-nctf-135ha-5x3ml",
    description: "This ionic balancing formula has 55 ingredients to repair the skin layers. Filorga NCTF 135HA® actively repairs the skin to replace minerals that are deficient such as Magnesium, Sodium, Potassium and Calcium.",
    price: 150,
    bulk_price: 127.50,
    manufacturer: "Filorga",
    origin: "France",
    form: "Injectable solution",
    dosage: "5 x 3ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/filorga-nctf-135-ha-mesotherapie-anti-age-rajeunissement-cutane-global-kit-pour-5-traitements-de-comblement-600x600.jpg",
  },
  {
    name: "Belotero Intense (1x1ml)",
    slug: "belotero-intense-1x1ml",
    description: "Belotero Intense is an ideal product for deeper lines and wrinkles. It is injected into the deep dermis with a 27G needle.",
    price: 50,
    bulk_price: 42.50,
    manufacturer: "Merz Pharmaceuticals",
    origin: "Germany",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/belotero-intense-1x1ml-600x600.jpg",
  },
  {
    name: "Aliaxin EV Essential Volume",
    slug: "aliaxin-ev-essential-volume",
    description: "Aliaxin EV Essential Volume is used for nasolabial folds and acne scars. Used for the areas of the face which require enrichment of the facial tissue through growth of the soft tissues (cheeks, chin, cheekbones).",
    price: 90,
    bulk_price: 76.50,
    manufacturer: "IBSA",
    origin: "Italy",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/aliaxin-ev-essential-volume-600x600.jpg",
  },
  {
    name: "Aliaxin GP Global Performance",
    slug: "aliaxin-gp-global-performance",
    description: "Aliaxin GP Global Performance is ideal for treating common aesthetic defects such as glabellar wrinkles, nasolabial folds, marionette lines, and improved volume in the cheek and chin zones.",
    price: 93,
    bulk_price: 79.05,
    manufacturer: "IBSA",
    origin: "Italy",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/aliaxin-gp-global-performance-600x450.png",
  },
  {
    name: "Aliaxin FL Lips",
    slug: "aliaxin-fl-lips",
    description: "Defines contours and increases lip volume. Ideal viscosity to guarantee a homogeneous diffusion in the mucosa.",
    price: 90.99,
    bulk_price: 77.34,
    manufacturer: "IBSA",
    origin: "Italy",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/buy-aliaxin-fl-lips-online-600x415.jpg",
  },
  {
    name: "Sculptra (2 vials)",
    slug: "sculptra-2-vials",
    description: "Sculptra Aesthetic is a revolutionary injection offering progressive results that are noticeable immediately. Collagen levels are increased within the body to restore their natural function.",
    price: 150,
    bulk_price: 127.50,
    manufacturer: "Galderma",
    origin: "USA",
    form: "Injectable suspension",
    dosage: "2 vials",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/sculptra-aesthetic-600x341.jpg",
  },
  {
    name: "Restylane (1x1ml)",
    slug: "restylane-1x1ml",
    description: "The Restylane family of products can be used to add volume and fullness to the skin to correct moderate to severe facial wrinkles and folds.",
    price: 56,
    bulk_price: 47.60,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-1x1ml-3-600x536.png",
  },
  {
    name: "Restylane (1x0.5ml)",
    slug: "restylane-1x05ml",
    description: "The Restylane family of products can be used to add volume and fullness to the skin to correct moderate to severe facial wrinkles and folds.",
    price: 70,
    bulk_price: 59.50,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 0.5ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-1x0.5ml-600x536.png",
  },
  {
    name: "Restylane Lidocaine (1x0.5ml)",
    slug: "restylane-lidocaine-1x05ml",
    description: "The Restylane family of products with added Lidocaine for a more comfortable treatment experience.",
    price: 35,
    bulk_price: 29.75,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 0.5ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-lidocaine-1x0.5ml-600x600.png",
  },
  {
    name: "Restylane Lidocaine (1x1ml)",
    slug: "restylane-lidocaine-1x1ml",
    description: "The Restylane family of products with added Lidocaine for a more comfortable treatment experience.",
    price: 50,
    bulk_price: 42.50,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-lidocaine-1x1ml-600x600.png",
  },
  {
    name: "Restylane Perlane (1x0.5ml)",
    slug: "restylane-perlane-1x05ml",
    description: "Restylane Perlane can be used to add volume and fullness to the skin to correct moderate to severe facial wrinkles and folds.",
    price: 60,
    bulk_price: 51,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 0.5ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-perlane-1x0.5-ml-600x600.png",
  },
  {
    name: "Restylane Perlane (1x1ml)",
    slug: "restylane-perlane-1x1ml",
    description: "Restylane Perlane can be used to add volume and fullness to the skin to correct moderate to severe facial wrinkles and folds.",
    price: 85,
    bulk_price: 72.25,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-perlane-1x1ml-600x600.png",
  },
  {
    name: "Restylane Vital Injector with Lidocaine (2ml)",
    slug: "restylane-vital-injector-lidocaine-2ml",
    description: "Restylane Vital Injector with Lidocaine offers pain free treatment through an injector pen which allows for application over a large area of skin surface.",
    price: 100,
    bulk_price: 85,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 2ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-vital-injector-with-lidocaine-2ml-600x600.png",
  },
  {
    name: "Restylane Kysse with Lidocaine (1x1ml)",
    slug: "restylane-kysse-lidocaine-1x1ml",
    description: "Creates fuller plumper lips with a beautifully defined contour. Restylane Kysse can create the perfect shaped lips that are full of volume and plumpness.",
    price: 60,
    bulk_price: 51,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-kysse-with-lidocaine-1x1ml-600x600.jpg",
  },
  {
    name: "Restylane Defyne with Lidocaine (1x1ml)",
    slug: "restylane-defyne-lidocaine-1x1ml",
    description: "Defyne can treat deep nasolabial folds to ensure appearance is smoothed out.",
    price: 70,
    bulk_price: 59.50,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-defyne-with-lidocaine-1x1ml-600x600.png",
  },
  {
    name: "Restylane Refyne with Lidocaine (1x1ml)",
    slug: "restylane-refyne-lidocaine-1x1ml",
    description: "To treat moderate wrinkles in between fine and deep.",
    price: 60,
    bulk_price: 51,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-refyne-with-lidocaine-1x1ml-254x203.png",
  },
  {
    name: "Restylane Volyme with Lidocaine (1x1ml)",
    slug: "restylane-volyme-lidocaine-1x1ml",
    description: "A volumising filler that creates a lifting effect in cheekbones.",
    price: 60,
    bulk_price: 51,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-volyme-with-lidocaine-1x1ml-254x203.png",
  },
  {
    name: "Restylane Fynesse (1x1ml)",
    slug: "restylane-fynesse-1x1ml",
    description: "A dermal filler specially formulated to treat superficial lines and wrinkles.",
    price: 48,
    bulk_price: 40.80,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-fynesse-1x1ml-254x203.png",
  },
  {
    name: "Restylane Lyft (1x1ml)",
    slug: "restylane-lyft-1x1ml",
    description: "From the Perlane Collection. A robust filler for deep tissue volumization.",
    price: 60,
    bulk_price: 51,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-lyft-1x1ml-600x600.png",
  },
  {
    name: "Restylane Lyft with Lidocaine (1x1ml)",
    slug: "restylane-lyft-lidocaine-1x1ml",
    description: "From the Perlane Collection for painless treatment. A robust filler for deep tissue volumization.",
    price: 62,
    bulk_price: 52.70,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "FDA Approved, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-lyft-with-lidocaine-1x1ml-600x600.png",
  },
  {
    name: "Restylane Lip Volume with Lidocaine (1x1ml)",
    slug: "restylane-lip-volume-lidocaine-1x1ml",
    description: "Restylane Lip Volume with Lidocaine offers a completely comfortable treatment to increase the volume of your lips and improve the contours of the lip outline.",
    price: 85,
    bulk_price: 72.25,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 1ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-lip-volume-with-lidocaine-1x1ml-600x600.png",
  },
  {
    name: "Restylane SubQ (1x2ml)",
    slug: "restylane-subq-1x2ml",
    description: "Restylane SubQ is injected deeper to add volume and support the overlying tissue, providing facial fullness and restoring symmetry. Ideal for patients with flattened facial features.",
    price: 130,
    bulk_price: 110.50,
    manufacturer: "Galderma",
    origin: "Sweden",
    form: "Injectable gel",
    dosage: "1 x 2ml",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/restylane-subq-1x2ml-600x600.png",
  },
];

const FACE_MASKS_PRODUCTS = [
  {
    name: "Disposable 3 Ply Face Masks (Box of 50)",
    slug: "disposable-3ply-face-masks-50",
    description: "Non woven disposable face masks with earloops to hold in place. Made from a 3 ply non woven material. Ideal for general use on public transport and in enclosed public spaces.",
    price: 15,
    bulk_price: 12,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "Disposable mask",
    dosage: "50 pcs/box",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/637303299602141355-3-ply-fm-in-situ-1-web-600x600.jpg",
  },
  {
    name: "Type IIR Medical Face Mask with Tie Coveralls (Box of 50)",
    slug: "type-iir-medical-mask-tie-50",
    description: "3 Layers Single Use Medical Face Mask 17.5cm x 9.5cm. EN 14683:2019+AC:2019 Type IIR with Tie Coverall. BFE≥98%. Ideal for Hospitals, Clinics, Laboratories.",
    price: 25,
    bulk_price: 20,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "Medical mask",
    dosage: "50 pcs/box",
    regulatory_status: "EN 14683 Type IIR, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/n1-scaled-1400x1867.jpg",
  },
  {
    name: "Type I Medical Face Mask for Kids (Box of 50)",
    slug: "type-i-medical-mask-kids-50",
    description: "3 Layers medical face mask designed for children. Polypropylene Spunbond outer and inner layers with High-Efficiency Melt-Blown Fabric filter. BFE≥95%. Ideal for schools and public transport.",
    price: 12,
    bulk_price: 9,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "Medical mask",
    dosage: "50 pcs/box",
    regulatory_status: "EN 14683 Type I, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/n1-scaled-1400x1867.jpg",
  },
  {
    name: "N95 Disposable Respirator Face Mask (Box of 20)",
    slug: "n95-respirator-mask-20",
    description: "Respirator face masks designed to protect wearer from exposure to small, infectious airborne particles, including bacteria and germs. PFE≥95%, BFE≥95%. Cone-shape with adjustable aluminum nose clip.",
    price: 35,
    bulk_price: 28,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "N95 Respirator",
    dosage: "20 pcs/box",
    regulatory_status: "NIOSH N95, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/n1-scaled-1400x1867.jpg",
  },
  {
    name: "Disposable 3 Ply Face Masks (Case of 5,000)",
    slug: "disposable-3ply-face-masks-5000",
    description: "Bulk case of non woven disposable face masks with earloops. Made from 3 ply non woven material. Perfect for businesses and healthcare facilities.",
    price: 450,
    bulk_price: 400,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "Disposable mask",
    dosage: "5,000 pcs/case",
    regulatory_status: "CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/637303299602141355-3-ply-fm-in-situ-1-web-600x600.jpg",
  },
  {
    name: "Type IIR Medical Face Mask (Case of 5,000)",
    slug: "type-iir-medical-mask-5000",
    description: "Bulk case of EN 14683:2019 Type IIR certified medical face masks. 3 layers with BFE≥98%. Hospital and clinical grade protection.",
    price: 450,
    bulk_price: 400,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "Medical mask",
    dosage: "5,000 pcs/case",
    regulatory_status: "EN 14683 Type IIR, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/n1-scaled-1400x1867.jpg",
  },
  {
    name: "N95 Respirator Face Mask (Case of 1,000)",
    slug: "n95-respirator-mask-1000",
    description: "Bulk case of N95 respirator masks for maximum protection. Particle Filtration Efficiency ≥95%, Bacterial Filtration Efficiency ≥95%. Ideal for all work environments.",
    price: 600,
    bulk_price: 500,
    manufacturer: "PharmooWorld",
    origin: "China",
    form: "N95 Respirator",
    dosage: "1,000 pcs/case",
    regulatory_status: "NIOSH N95, CE Marked",
    image_url: "https://www.pharmooworld.com/assets/images/n1-scaled-1400x1867.jpg",
  },
];

type ProductCategory = "botulinum" | "dermal-fillers" | "face-masks-ppe";

const PRODUCT_SETS: Record<ProductCategory, { name: string; products: typeof BOTULINUM_PRODUCTS }> = {
  "botulinum": {
    name: "Botulinum Products",
    products: BOTULINUM_PRODUCTS,
  },
  "dermal-fillers": {
    name: "Dermal Filler Products",
    products: DERMAL_FILLER_PRODUCTS,
  },
  "face-masks-ppe": {
    name: "Face Masks & PPE",
    products: FACE_MASKS_PRODUCTS,
  },
};

const ProductImport = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [importedCount, setImportedCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("botulinum");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const getCategoryId = (categoryType: ProductCategory) => {
    if (!categories) return null;
    if (categoryType === "botulinum") {
      return categories.find(c => c.slug === "botulinum" || c.name.toLowerCase().includes("botulinum"))?.id;
    }
    if (categoryType === "dermal-fillers") {
      return categories.find(c => c.slug === "dermal-fillers" || c.name.toLowerCase().includes("dermal") || c.name.toLowerCase().includes("filler"))?.id;
    }
    if (categoryType === "face-masks-ppe") {
      return categories.find(c => c.slug === "face-masks-ppe" || c.name.toLowerCase().includes("face mask") || c.name.toLowerCase().includes("ppe"))?.id;
    }
    return null;
  };

  const currentProducts = PRODUCT_SETS[selectedCategory].products;
  const categoryId = getCategoryId(selectedCategory);

  const importMutation = useMutation({
    mutationFn: async () => {
      if (!categoryId) {
        throw new Error("Category not found");
      }

      const productsToInsert = currentProducts.map((product) => ({
        ...product,
        category_id: categoryId,
        in_stock: true,
        bulk_min_quantity: 10,
      }));

      let successCount = 0;

      for (const product of productsToInsert) {
        const { error } = await supabase
          .from("products")
          .upsert(product, { onConflict: "slug" });

        if (!error) {
          successCount++;
          setImportedCount(successCount);
        } else {
          console.error(`Error importing ${product.name}:`, error);
        }
      }

      return successCount;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: "Import complete",
        description: `Successfully imported ${count} ${PRODUCT_SETS[selectedCategory].name}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Import failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCategoryChange = (value: ProductCategory) => {
    setSelectedCategory(value);
    setImportedCount(0);
    importMutation.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Products from PharmooWorld
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Product Category</label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="botulinum">Botulinum Products ({BOTULINUM_PRODUCTS.length} items)</SelectItem>
              <SelectItem value="dermal-fillers">Dermal Fillers ({DERMAL_FILLER_PRODUCTS.length} items)</SelectItem>
              <SelectItem value="face-masks-ppe">Face Masks & PPE ({FACE_MASKS_PRODUCTS.length} items)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground">
          Import {currentProducts.length} {PRODUCT_SETS[selectedCategory].name} from pharmooworld.com into the database.
          {categoryId ? (
            <span className="text-success"> Category found ✓</span>
          ) : (
            <span className="text-destructive"> Category not found - please create it first</span>
          )}
        </p>

        <ScrollArea className="h-64 border rounded-lg p-3">
          <div className="space-y-2">
            {currentProducts.map((product, index) => (
              <div key={product.slug} className="flex items-center gap-2 text-sm">
                {importedCount > index ? (
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                ) : (
                  <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
                <span className={`flex-1 truncate ${importedCount > index ? "text-muted-foreground" : ""}`}>
                  {product.name}
                </span>
                <Badge variant="outline" className="ml-auto flex-shrink-0">
                  ${product.price}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Button
          onClick={() => importMutation.mutate()}
          disabled={importMutation.isPending || importMutation.isSuccess || !categoryId}
          className="w-full gradient-medical"
        >
          {importMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Importing... ({importedCount}/{currentProducts.length})
            </>
          ) : importMutation.isSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Imported Successfully
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Import All {currentProducts.length} Products
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductImport;
