 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
 };
 
 const SITE_URL = "https://www.pharmooworld.com";
 
 Deno.serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
     const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     // Fetch all categories
     const { data: categories, error: categoriesError } = await supabase
       .from("categories")
       .select("slug")
       .order("name", { ascending: true });
 
     if (categoriesError) {
       throw categoriesError;
     }
 
     // Fetch all products
     const { data: products, error: productsError } = await supabase
       .from("products")
       .select("slug, updated_at")
       .order("name", { ascending: true });
 
     if (productsError) {
       throw productsError;
     }
 
     // Static pages
     const staticPages = [
       { loc: "/", priority: "1.0", changefreq: "weekly" },
       { loc: "/products", priority: "0.95", changefreq: "daily" },
       { loc: "/about", priority: "0.8", changefreq: "monthly" },
       { loc: "/contact", priority: "0.8", changefreq: "monthly" },
       { loc: "/faq", priority: "0.7", changefreq: "monthly" },
       { loc: "/testimonials", priority: "0.7", changefreq: "monthly" },
       { loc: "/client-assurance", priority: "0.7", changefreq: "monthly" },
       { loc: "/shipping", priority: "0.6", changefreq: "monthly" },
       { loc: "/returns", priority: "0.5", changefreq: "monthly" },
       { loc: "/terms", priority: "0.4", changefreq: "yearly" },
       { loc: "/privacy", priority: "0.4", changefreq: "yearly" },
       { loc: "/disclaimer", priority: "0.4", changefreq: "yearly" },
     ];
 
     const today = new Date().toISOString().split("T")[0];
 
     let xml = `<?xml version="1.0" encoding="UTF-8"?>
 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                             http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
 `;
 
     // Add static pages
     for (const page of staticPages) {
       xml += `
   <url>
     <loc>${SITE_URL}${page.loc}</loc>
     <lastmod>${today}</lastmod>
     <changefreq>${page.changefreq}</changefreq>
     <priority>${page.priority}</priority>
   </url>`;
     }
 
     // Add category pages
     for (const category of categories || []) {
       xml += `
   <url>
     <loc>${SITE_URL}/products?category=${category.slug}</loc>
     <lastmod>${today}</lastmod>
     <changefreq>daily</changefreq>
     <priority>0.85</priority>
   </url>`;
     }
 
     // Add product pages
     for (const product of products || []) {
       const lastmod = product.updated_at
         ? new Date(product.updated_at).toISOString().split("T")[0]
         : today;
       xml += `
   <url>
     <loc>${SITE_URL}/product/${product.slug}</loc>
     <lastmod>${lastmod}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.8</priority>
   </url>`;
     }
 
     xml += `
 </urlset>`;
 
     return new Response(xml, {
       headers: {
         ...corsHeaders,
         "Content-Type": "application/xml",
       },
     });
   } catch (error) {
     const errorMessage = error instanceof Error ? error.message : "Unknown error";
     console.error("Error generating sitemap:", errorMessage);
     return new Response(
       JSON.stringify({ error: errorMessage }),
       {
         status: 500,
         headers: { ...corsHeaders, "Content-Type": "application/json" },
       }
     );
   }
 });