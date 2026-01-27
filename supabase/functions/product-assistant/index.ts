import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Fetch products from database for context
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: products } = await supabase
      .from("products")
      .select("name, slug, description, price, form, dosage, manufacturer, origin, in_stock")
      .limit(50);

    const { data: categories } = await supabase
      .from("categories")
      .select("name, slug, description");

    const productContext = products?.map(p => 
      `- ${p.name}: ${p.description || 'No description'}, Price: $${p.price}, Form: ${p.form || 'N/A'}, Manufacturer: ${p.manufacturer || 'N/A'}, In Stock: ${p.in_stock ? 'Yes' : 'No'}, URL: /product/${p.slug}`
    ).join('\n') || 'No products available';

    const categoryContext = categories?.map(c => 
      `- ${c.name}: ${c.description || 'No description'}, URL: /products?category=${c.slug}`
    ).join('\n') || 'No categories available';

    const systemPrompt = `You are Pharmoo Assistant, a helpful AI product advisor for Pharmoo World - a global pharmaceutical and medical supplies platform.

Your role is to help buyers find the right pharmaceutical products, medical supplies, and cosmetic products based on their needs.

## Available Product Categories:
${categoryContext}

## Available Products:
${productContext}

## Guidelines:
1. Be professional, helpful, and knowledgeable about pharmaceutical products
2. Always recommend products based on the user's stated needs
3. Include product links when recommending items (use markdown links)
4. If asked about prescription products, remind users that valid documentation is required
5. Highlight key product features like manufacturer, form, and pricing
6. If you don't have information about a specific product, suggest they browse the catalog or contact support
7. Never provide medical advice - always recommend consulting healthcare professionals
8. Be concise but thorough in your responses
9. If asked about bulk orders, mention that bulk pricing is available

## Response Format:
- Use markdown formatting for clarity
- Include links to products when recommending them
- Keep responses focused and actionable`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Product assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
