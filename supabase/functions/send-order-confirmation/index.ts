import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationRequest {
  orderId: string;
  customerEmail: string;
  companyName: string;
  orderTotal: number;
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      orderId,
      customerEmail,
      companyName,
      orderTotal,
      shippingAddress,
      paymentMethod,
      items,
    }: OrderConfirmationRequest = await req.json();

    if (!customerEmail || !orderId) {
      throw new Error("Missing required fields: customerEmail or orderId");
    }

    const orderIdShort = orderId.substring(0, 8).toUpperCase();

    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${item.product_name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">$${item.price.toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151; font-weight: 600;">$${(item.quantity * item.price).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0066CC 0%, #004499 100%); padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Order Confirmed!</h1>
              <p style="color: #cce0ff; margin: 8px 0 0 0; font-size: 14px;">Thank you for your order</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #065f46; font-weight: 600;">
                  ✓ Your order has been received and is being processed
                </p>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Dear <strong>${companyName || "Valued Customer"}</strong>,<br><br>
                Thank you for choosing Pharmoo World. We've received your order and it's now being processed by our team.
              </p>
              
              <!-- Order Details Box -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #111827; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #0066CC; padding-bottom: 8px;">Order Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Order ID:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">#${orderIdShort}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Payment Method:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">${paymentMethod}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Shipping Address:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: 600; text-align: right;">${shippingAddress}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Items Table -->
              <div style="margin-bottom: 24px;">
                <h2 style="color: #111827; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #0066CC; padding-bottom: 8px;">Order Items</h2>
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <thead>
                    <tr style="background-color: #f3f4f6;">
                      <th style="padding: 12px; text-align: left; color: #374151; font-weight: 600;">Product</th>
                      <th style="padding: 12px; text-align: center; color: #374151; font-weight: 600;">Qty</th>
                      <th style="padding: 12px; text-align: right; color: #374151; font-weight: 600;">Price</th>
                      <th style="padding: 12px; text-align: right; color: #374151; font-weight: 600;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                  <tfoot>
                    <tr style="background-color: #0066CC;">
                      <td colspan="3" style="padding: 16px; color: #ffffff; font-weight: 700; font-size: 16px;">Order Total</td>
                      <td style="padding: 16px; color: #ffffff; font-weight: 700; font-size: 18px; text-align: right;">$${orderTotal.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <!-- What's Next -->
              <div style="background-color: #eff6ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #1e40af; font-size: 16px; margin: 0 0 12px 0;">What's Next?</h3>
                <ol style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Our team will verify your order details</li>
                  <li>You'll receive a shipping confirmation with tracking info</li>
                  <li>Your order will be delivered to your specified address</li>
                </ol>
              </div>
              
              <!-- Contact Info -->
              <div style="text-align: center; padding: 24px; background-color: #f9fafb; border-radius: 12px;">
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Questions about your order?</p>
                <p style="color: #0066CC; font-size: 14px; margin: 0; font-weight: 600;">
                  Contact us at support@pharmooworld.com
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1f2937; padding: 24px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                © 2026 Pharmoo World. All rights reserved.
              </p>
              <p style="color: #6b7280; font-size: 11px; margin: 0;">
                GMP Certified | WHO Compliant | Global Shipping
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Pharmoo World <orders@pharmooworld.com>",
      to: [customerEmail],
      subject: `Order Confirmed - #${orderIdShort}`,
      html: emailHtml,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation email:", error);
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
