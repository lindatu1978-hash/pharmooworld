import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderNotificationRequest {
  orderId: string;
  customerEmail: string;
  companyName: string;
  orderTotal: number;
  shippingAddress: string;
  paymentMethod: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const {
      orderId,
      customerEmail,
      companyName,
      orderTotal,
      shippingAddress,
      paymentMethod,
      items,
    }: OrderNotificationRequest = await req.json();

    // Create Supabase client to fetch admin emails
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all admin users
    const { data: adminRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (rolesError) {
      console.error("Error fetching admin roles:", rolesError);
      throw rolesError;
    }

    if (!adminRoles || adminRoles.length === 0) {
      console.log("No admin users found to notify");
      return new Response(
        JSON.stringify({ message: "No admin users to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Fetch admin emails from profiles
    const adminIds = adminRoles.map((r) => r.user_id);
    const { data: adminProfiles, error: profilesError } = await supabase
      .from("profiles")
      .select("email")
      .in("id", adminIds)
      .not("email", "is", null);

    if (profilesError) {
      console.error("Error fetching admin profiles:", profilesError);
      throw profilesError;
    }

    const adminEmails = adminProfiles?.map((p) => p.email).filter(Boolean) as string[];

    if (adminEmails.length === 0) {
      console.log("No admin emails found");
      return new Response(
        JSON.stringify({ message: "No admin emails to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Format payment method for display
    const paymentMethodDisplay: Record<string, string> = {
      bank_transfer: "Bank Transfer (T/T)",
      crypto: "Cryptocurrency",
      corporate_invoice: "Corporate Invoice",
    };
    const paymentDisplay = paymentMethodDisplay[paymentMethod] || paymentMethod;

    // Generate items HTML
    const itemsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.product_name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
            <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `
      )
      .join("");

    const shortOrderId = orderId.slice(0, 8).toUpperCase();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New Order Received!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Order #${shortOrderId}</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #065f46; font-weight: 600;">New order requires attention</p>
                <p style="margin: 5px 0 0 0; color: #047857;">Total Value: <strong>$${orderTotal.toFixed(2)}</strong></p>
              </div>

              <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Information</h2>
              <table style="width: 100%; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 140px;">Company:</td>
                  <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${companyName || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Payment Method:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${paymentDisplay}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Shipping Address:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${shippingAddress}</td>
                </tr>
              </table>

              <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Order Items</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                  <tr style="background: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr style="background: #f0fdf4;">
                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: 600; color: #065f46;">Order Total:</td>
                    <td style="padding: 15px; text-align: right; font-weight: 700; color: #065f46; font-size: 18px;">$${orderTotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <a href="https://www.pharmooworld.com/admin" style="display: inline-block; background: linear-gradient(135deg, #059669, #10b981); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                  View in Admin Dashboard
                </a>
              </div>
            </div>
            
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
              This is an automated notification from Pharmoo World.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email to all admins using fetch
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pharmoo World <notifications@pharmooworld.com>",
        to: adminEmails,
        subject: `🎉 New Order #${shortOrderId} - $${orderTotal.toFixed(2)}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-admin-order-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
