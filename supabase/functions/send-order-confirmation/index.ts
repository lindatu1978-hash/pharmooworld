import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "info@pharmooworld.com";

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
  customerPhone?: string;
  customerCountry?: string;
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
      customerPhone,
      customerCountry,
    }: OrderConfirmationRequest = await req.json();

    if (!customerEmail || !orderId) {
      throw new Error("Missing required fields: customerEmail or orderId");
    }

    const orderIdShort = orderId.substring(0, 8).toUpperCase();
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const invoiceNumber = `INV-${orderIdShort}`;

    // Format payment method for display
    const paymentMethodDisplay: Record<string, string> = {
      bank_transfer: "Bank Transfer (T/T)",
      crypto: "Cryptocurrency (BTC)",
      bitcoin: "Bitcoin (BTC)",
      corporate_invoice: "Corporate Invoice",
      escrow: "Escrow Service",
    };
    const paymentDisplay = paymentMethodDisplay[paymentMethod] || paymentMethod;

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const itemsHtml = items
      .map(
        (item, index) => `
        <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'};">
          <td style="padding: 14px 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 500;">${item.product_name}</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #374151;">${item.quantity}</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">$${item.price.toFixed(2)}</td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: 600;">$${(item.quantity * item.price).toFixed(2)}</td>
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
          <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0066CC 0%, #004499 100%); padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Order Confirmed!</h1>
              <p style="color: #cce0ff; margin: 8px 0 0 0; font-size: 14px;">Thank you for choosing Pharmoo World</p>
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
                Thank you for your order. Please find your invoice details below.
              </p>
              
              <!-- Invoice Header -->
              <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 12px 12px 0 0; padding: 24px; margin-top: 24px;">
                <table style="width: 100%;">
                  <tr>
                    <td>
                      <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">INVOICE</h2>
                      <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 14px;">${invoiceNumber}</p>
                    </td>
                    <td style="text-align: right;">
                      <p style="color: #ffffff; margin: 0; font-size: 14px; font-weight: 600;">Pharmoo World</p>
                      <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 12px;">Global Pharmaceutical Supply</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Invoice Details -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-top: none; padding: 24px; margin-bottom: 24px;">
                <table style="width: 100%;">
                  <tr>
                    <td style="vertical-align: top; width: 50%;">
                      <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Bill To</p>
                      <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0;">${companyName || "Customer"}</p>
                      <p style="color: #374151; font-size: 13px; margin: 4px 0 0 0;">${customerEmail}</p>
                      ${customerPhone ? `<p style="color: #374151; font-size: 13px; margin: 4px 0 0 0;">${customerPhone}</p>` : ""}
                      ${customerCountry ? `<p style="color: #374151; font-size: 13px; margin: 4px 0 0 0;">${customerCountry}</p>` : ""}
                    </td>
                    <td style="vertical-align: top; width: 50%; text-align: right;">
                      <table style="margin-left: auto;">
                        <tr>
                          <td style="color: #6b7280; font-size: 13px; padding: 4px 12px 4px 0;">Invoice Date:</td>
                          <td style="color: #111827; font-size: 13px; font-weight: 600; padding: 4px 0;">${orderDate}</td>
                        </tr>
                        <tr>
                          <td style="color: #6b7280; font-size: 13px; padding: 4px 12px 4px 0;">Order ID:</td>
                          <td style="color: #111827; font-size: 13px; font-weight: 600; padding: 4px 0;">#${orderIdShort}</td>
                        </tr>
                        <tr>
                          <td style="color: #6b7280; font-size: 13px; padding: 4px 12px 4px 0;">Payment:</td>
                          <td style="color: #111827; font-size: 13px; font-weight: 600; padding: 4px 0;">${paymentDisplay}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Ship To -->
                <div style="margin-top: 20px; padding-top: 16px; border-top: 1px dashed #d1d5db;">
                  <p style="color: #6b7280; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Ship To</p>
                  <p style="color: #111827; font-size: 14px; margin: 0;">${shippingAddress}</p>
                </div>
              </div>
              
              <!-- Items Table -->
              <div style="margin-bottom: 24px; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                  <thead>
                    <tr style="background: linear-gradient(135deg, #0066CC 0%, #004499 100%);">
                      <th style="padding: 14px 12px; text-align: left; color: #ffffff; font-weight: 600; font-size: 13px;">Product</th>
                      <th style="padding: 14px 12px; text-align: center; color: #ffffff; font-weight: 600; font-size: 13px;">Qty</th>
                      <th style="padding: 14px 12px; text-align: right; color: #ffffff; font-weight: 600; font-size: 13px;">Unit Price</th>
                      <th style="padding: 14px 12px; text-align: right; color: #ffffff; font-weight: 600; font-size: 13px;">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>

                <!-- Totals -->
                <div style="background-color: #f9fafb; padding: 16px 12px; border-top: 2px solid #e5e7eb;">
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Subtotal</td>
                      <td style="padding: 6px 0; color: #374151; font-size: 14px; text-align: right;">$${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #6b7280; font-size: 14px;">Shipping</td>
                      <td style="padding: 6px 0; color: #374151; font-size: 14px; text-align: right;">Calculated separately</td>
                    </tr>
                  </table>
                </div>
                <div style="background: linear-gradient(135deg, #0066CC 0%, #004499 100%); padding: 16px 12px;">
                  <table style="width: 100%;">
                    <tr>
                      <td style="color: #ffffff; font-weight: 700; font-size: 16px;">TOTAL</td>
                      <td style="color: #ffffff; font-weight: 700; font-size: 20px; text-align: right;">$${orderTotal.toFixed(2)} USD</td>
                    </tr>
                  </table>
                </div>
              </div>
              
              <!-- What's Next -->
              <div style="background-color: #eff6ff; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #1e40af; font-size: 16px; margin: 0 0 12px 0;">📦 What's Next?</h3>
                <ol style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Our team will verify your order details and payment</li>
                  <li>You'll receive a shipping confirmation with tracking information</li>
                  <li>Your order will be delivered to your specified address</li>
                </ol>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="https://www.pharmooworld.com/orders" style="display: inline-block; background: linear-gradient(135deg, #0066CC, #004499); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                  View My Orders
                </a>
              </div>
              
              <!-- Terms & Contact -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0; font-weight: 600;">PAYMENT TERMS</p>
                <p style="color: #374151; font-size: 13px; margin: 0 0 16px 0;">Payment is due upon receipt of invoice. Please reference invoice number ${invoiceNumber} with your payment.</p>
                
                <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0; font-weight: 600;">QUESTIONS?</p>
                <p style="color: #374151; font-size: 13px; margin: 0;">
                  Contact us at <a href="mailto:info@pharmooworld.com" style="color: #0066CC; text-decoration: none;">info@pharmooworld.com</a>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1f2937; padding: 24px; text-align: center;">
              <p style="color: #ffffff; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
                Pharmoo World
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                GMP Certified | WHO Compliant | Global Shipping
              </p>
              <p style="color: #6b7280; font-size: 11px; margin: 0;">
                © ${new Date().getFullYear()} Pharmoo World. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send to customer with CC to admin
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Pharmoo World <orders@pharmooworld.com>",
        to: [customerEmail],
        cc: [ADMIN_EMAIL],
        subject: `Order Confirmation & Invoice - #${orderIdShort}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Order confirmation with invoice sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
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
