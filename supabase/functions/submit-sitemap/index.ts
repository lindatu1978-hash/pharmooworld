const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE_URL = "https://pharmooworld.lovable.app";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// IndexNow key — a unique identifier for ownership verification
// This key file should be accessible at https://pharmooworld.lovable.app/{key}.txt
const INDEXNOW_KEY = "pharmooworld2026indexnow";

interface SubmissionResult {
  engine: string;
  method: string;
  status: number;
  success: boolean;
  message: string;
}

/**
 * Submit via IndexNow protocol (supported by Bing, Yandex, Naver, Seznam)
 * One submission to indexnow.org fans out to all participating engines.
 * Ref: https://www.indexnow.org/documentation
 */
async function submitViaIndexNow(sitemapUrl: string): Promise<SubmissionResult> {
  const apiUrl = "https://api.indexnow.org/indexnow";
  
  try {
    // First, fetch the sitemap to extract URLs
    const sitemapResponse = await fetch(sitemapUrl);
    const sitemapText = await sitemapResponse.text();
    
    // Extract URLs from sitemap XML
    const urlMatches = sitemapText.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = urlMatches
      .map(match => match.replace(/<\/?loc>/g, ''))
      .filter(url => url.startsWith('http'))
      .slice(0, 10000); // IndexNow limit per request

    if (urls.length === 0) {
      return {
        engine: "IndexNow (Bing, Yandex, Naver, Seznam)",
        method: "IndexNow API",
        status: 0,
        success: false,
        message: "No URLs found in sitemap",
      };
    }

    console.log(`Found ${urls.length} URLs in sitemap, submitting via IndexNow...`);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    const text = await response.text();
    
    return {
      engine: "IndexNow (Bing, Yandex, Naver, Seznam)",
      method: "IndexNow API",
      status: response.status,
      success: response.status === 200 || response.status === 202,
      message: response.status === 200 || response.status === 202
        ? `Successfully submitted ${urls.length} URLs`
        : `Response (${response.status}): ${text.substring(0, 300)}`,
    };
  } catch (error) {
    return {
      engine: "IndexNow (Bing, Yandex, Naver, Seznam)",
      method: "IndexNow API",
      status: 0,
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Submit to Yandex via legacy ping (still functional as of 2026)
 */
async function submitToYandex(sitemapUrl: string): Promise<SubmissionResult> {
  const pingUrl = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  try {
    const response = await fetch(pingUrl);
    await response.text();
    return {
      engine: "Yandex",
      method: "Ping",
      status: response.status,
      success: response.ok,
      message: response.ok ? "Sitemap ping accepted" : `Failed with status ${response.status}`,
    };
  } catch (error) {
    return {
      engine: "Yandex",
      method: "Ping",
      status: 0,
      success: false,
      message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Google: Ping deprecated since June 2023. Google discovers sitemaps via:
 * 1. robots.txt (already configured)
 * 2. Google Search Console (manual/API with service account)
 * We log a reminder for Google Search Console API setup.
 */
function googleNote(): SubmissionResult {
  return {
    engine: "Google",
    method: "robots.txt + Search Console",
    status: 200,
    success: true,
    message: "Google discovers sitemap via robots.txt directive (already configured). For faster indexing, submit via Search Console.",
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log(`[${new Date().toISOString()}] Starting automated sitemap submission...`);
    console.log(`Sitemap: ${SITEMAP_URL}`);

    const results = await Promise.all([
      submitViaIndexNow(SITEMAP_URL),
      submitToYandex(SITEMAP_URL),
    ]);

    // Add Google note
    results.push(googleNote());

    const successCount = results.filter(r => r.success).length;
    const summary = {
      timestamp: new Date().toISOString(),
      sitemap_url: SITEMAP_URL,
      total_engines: results.length,
      successful: successCount,
      failed: results.length - successCount,
      results,
      next_run: "Daily at 06:00 UTC",
    };

    console.log(`Submission complete: ${successCount}/${results.length} successful`);
    results.forEach(r => {
      console.log(`  ${r.engine} [${r.method}]: ${r.success ? '✅' : '❌'} (${r.status}) ${r.message}`);
    });

    return new Response(JSON.stringify(summary, null, 2), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Sitemap submission error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
