import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, company, subject, message }: ContactFormRequest = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !subject || !message) {
      throw new Error("Missing required fields");
    }

    // Send email to info@pharmooworld.com
    const adminEmailResponse = await resend.emails.send({
      from: "Pharmoo World Contact <noreply@pharmooworld.com>",
      to: ["info@pharmooworld.com"],
      subject: `Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Details</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subject</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
          </tr>
        </table>
        <h2>Message</h2>
        <div style="background-color: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</div>
        <hr style="margin-top: 24px;" />
        <p style="color: #666; font-size: 12px;">This message was sent from the Pharmoo World contact form.</p>
      `,
      replyTo: email,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    // Send confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "Pharmoo World <noreply@pharmooworld.com>",
      to: [email],
      subject: "Thank You for Contacting Pharmoo World",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0f766e; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0;">Pharmoo World</h1>
          </div>
          <div style="padding: 32px 24px; background-color: #f9fafb;">
            <h2 style="color: #111827; margin-top: 0;">Hello ${firstName},</h2>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thanks for contacting Pharmoo World! Our correspondent would get back soonest.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              We have received your message regarding "<strong>${subject}</strong>" and our team is reviewing it now.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to browse our products at <a href="https://pharmooworld.lovable.app/products" style="color: #0f766e;">pharmooworld.com</a>.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 24px;">
              Best regards,<br />
              <strong>The Pharmoo World Team</strong>
            </p>
          </div>
          <div style="background-color: #e5e7eb; padding: 16px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              1914 S Vermont Ave, Los Angeles, CA 90006, USA<br />
              Phone: +401 - 232 - 4508 | Email: info@pharmooworld.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("Customer confirmation email sent:", customerEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
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
