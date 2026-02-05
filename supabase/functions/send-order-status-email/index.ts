import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderStatusRequest {
  orderId: string;
  newStatus: string;
  customerEmail: string;
  companyName?: string;
  orderTotal: number;
}

const getStatusMessage = (status: string): { subject: string; heading: string; message: string; color: string } => {
  switch (status) {
    case "processing":
      return {
        subject: "Your order is being processed",
        heading: "Order Processing",
        message: "Great news! We've started processing your order. Our team is preparing your items for shipment.",
        color: "#0ea5e9",
      };
    case "shipped":
      return {
        subject: "Your order has been shipped!",
        heading: "Order Shipped",
        message: "Your order is on its way! It has been shipped and is en route to your delivery address.",
        color: "#10b981",
      };
    case "delivered":
      return {
        subject: "Your order has been delivered",
        heading: "Order Delivered",
        message: "Your order has been successfully delivered. Thank you for choosing Pharmoo World!",
        color: "#22c55e",
      };
    case "cancelled":
      return {
        subject: "Your order has been cancelled",
        heading: "Order Cancelled",
        message: "Your order has been cancelled. If you did not request this cancellation, please contact our support team immediately.",
        color: "#ef4444",
      };
    default:
      return {
        subject: "Order status update",
        heading: "Order Update",
        message: `Your order status has been updated to: ${status}`,
        color: "#6b7280",
      };
  }
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { orderId, newStatus, customerEmail, companyName, orderTotal }: OrderStatusRequest = await req.json();

    if (!orderId || !newStatus || !customerEmail) {
      throw new Error("Missing required fields: orderId, newStatus, or customerEmail");
    }

    const statusInfo = getStatusMessage(newStatus);
    const shortOrderId = orderId.slice(0, 8).toUpperCase();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0ea5e9, #2563eb); padding: 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Pharmoo World</h1>
                      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Global Pharmaceutical Supplier</p>
                    </td>
                  </tr>
                  
                  <!-- Status Banner -->
                  <tr>
                    <td style="background-color: ${statusInfo.color}; padding: 20px; text-align: center;">
                      <h2 style="margin: 0; color: #ffffff; font-size: 24px;">${statusInfo.heading}</h2>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; color: #374151; font-size: 16px;">
                        Dear ${companyName || "Valued Customer"},
                      </p>
                      <p style="margin: 0 0 30px; color: #374151; font-size: 16px; line-height: 1.6;">
                        ${statusInfo.message}
                      </p>
                      
                      <!-- Order Details Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%">
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order ID</td>
                                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600; text-align: right; font-family: monospace;">#${shortOrderId}</td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Status</td>
                                <td style="padding: 8px 0; text-align: right;">
                                  <span style="background-color: ${statusInfo.color}; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${newStatus}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Total</td>
                                <td style="padding: 8px 0; color: #111827; font-size: 16px; font-weight: 700; text-align: right;">${formatCurrency(orderTotal)}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="https://www.pharmooworld.com/orders" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #2563eb); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                              View My Orders
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
                      <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                        Questions about your order?
                      </p>
                      <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                        Contact us at <a href="mailto:support@pharmooworld.com" style="color: #0ea5e9;">support@pharmooworld.com</a>
                      </p>
                      <p style="margin: 20px 0 0; color: #6b7280; font-size: 12px;">
                        © ${new Date().getFullYear()} Pharmoo World. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pharmoo World <orders@pharmooworld.com>",
        to: [customerEmail],
        subject: `Order #${shortOrderId}: ${statusInfo.subject}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Order status email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order status email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);