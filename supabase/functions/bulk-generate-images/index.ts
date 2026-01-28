import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { batchSize = 5, skipExisting = false } = await req.json().catch(() => ({}));

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get products that need images - exclude those already with supabase storage URLs
    const { data: products, error: fetchError } = await supabase
      .from("products")
      .select("id, name, description, image_url")
      .or("image_url.is.null,image_url.not.ilike.%supabase.co/storage%")
      .order("name")
      .limit(batchSize);

    if (fetchError) throw fetchError;
    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No products need images", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing ${products.length} products...`);

    const results = [];
    
    for (const product of products) {
      try {

        console.log(`Generating image for: ${product.name}`);

        // Create a product-specific prompt
        const imagePrompt = `Professional pharmaceutical product photo of "${product.name}". ${product.description?.substring(0, 200) || ""}. Clean white background, professional studio lighting, high-quality medical product photography, sharp focus, commercial product shot. Ultra high resolution.`;

        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [{ role: "user", content: imagePrompt }],
            modalities: ["image", "text"],
          }),
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error(`AI error for ${product.name}:`, aiResponse.status, errorText);
          
          if (aiResponse.status === 429) {
            results.push({ id: product.id, name: product.name, status: "rate_limited" });
            // Stop processing on rate limit
            break;
          }
          
          results.push({ id: product.id, name: product.name, status: "ai_error", error: errorText });
          continue;
        }

        const aiData = await aiResponse.json();
        const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (!imageData) {
          results.push({ id: product.id, name: product.name, status: "no_image_generated" });
          continue;
        }

        // Extract and upload base64 image
        const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!base64Match) {
          results.push({ id: product.id, name: product.name, status: "invalid_format" });
          continue;
        }

        const [, imageType, base64Data] = base64Match;
        const imageBuffer = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

        const fileName = `${product.id}.${imageType}`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageBuffer, {
            contentType: `image/${imageType}`,
            upsert: true,
          });

        if (uploadError) {
          console.error(`Upload error for ${product.name}:`, uploadError);
          results.push({ id: product.id, name: product.name, status: "upload_error", error: uploadError.message });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;

        // Update product
        const { error: updateError } = await supabase
          .from("products")
          .update({ image_url: imageUrl })
          .eq("id", product.id);

        if (updateError) {
          results.push({ id: product.id, name: product.name, status: "update_error", error: updateError.message });
          continue;
        }

        console.log(`✓ Generated image for: ${product.name}`);
        results.push({ id: product.id, name: product.name, status: "success", imageUrl });

        // Small delay between generations to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (err) {
        console.error(`Error processing ${product.name}:`, err);
        results.push({ id: product.id, name: product.name, status: "error", error: String(err) });
      }
    }

    const successful = results.filter(r => r.status === "success").length;
    const failed = results.filter(r => r.status !== "success" && r.status !== "skipped").length;
    const skipped = results.filter(r => r.status === "skipped").length;

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: results.length,
        successful,
        failed,
        skipped,
        results 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Bulk generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
