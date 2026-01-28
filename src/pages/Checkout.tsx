import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Package, Shield, Truck, ArrowLeft, CreditCard, Building2, Bitcoin } from "lucide-react";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/account");
        return;
      }
      setUser(session.user);

      // Fetch profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setFormData({
          companyName: profile.company_name || "",
          contactName: "",
          email: profile.email || session.user.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          city: profile.city || "",
          country: profile.country || "",
          notes: "",
        });
      }
    };

    getUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || items.length === 0) return;

    setIsSubmitting(true);

    try {
      // Create order
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.country}`;
      
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          notes: formData.notes,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.bulk_price && 
               item.product.bulk_min_quantity && 
               item.quantity >= item.product.bulk_min_quantity
          ? item.product.bulk_price
          : item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send notification emails (admin + customer confirmation)
      const emailPayload = {
        orderId: order.id,
        customerEmail: formData.email,
        companyName: formData.companyName,
        orderTotal: total,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.country}`,
        paymentMethod,
        items: orderItems.map((item) => ({
          product_name: item.product_name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      try {
        // Send both emails in parallel
        await Promise.all([
          supabase.functions.invoke("send-admin-order-notification", { body: emailPayload }),
          supabase.functions.invoke("send-order-confirmation", { body: emailPayload }),
        ]);
      } catch (emailError) {
        console.error("Failed to send notification emails:", emailError);
        // Don't fail the order if emails fail
      }

      // Clear cart
      await clearCart();

      toast({
        title: "Order placed successfully!",
        description: "We'll send you payment instructions via email.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-pharma py-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-4">
            Add some products to your cart before checking out.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Pharmoo World</title>
        <meta name="description" content="Complete your pharmaceutical products order" />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Checkout
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your order
            </p>
          </div>
        </div>

        <div className="container-pharma py-8 lg:py-12">
          <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Shipping Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Special instructions, delivery preferences, etc."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-4 w-4" />
                            <span className="font-medium">Bank Transfer (T/T)</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Payment via wire transfer. Banking details will be provided after order confirmation.
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <Bitcoin className="h-4 w-4" />
                            <span className="font-medium">Cryptocurrency</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Pay with Bitcoin, USDT, or USDC. Wallet addresses provided after confirmation.
                          </p>
                        </Label>
                      </div>

                      <div className="flex items-start gap-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer">
                        <RadioGroupItem value="corporate_invoice" id="corporate_invoice" />
                        <Label htmlFor="corporate_invoice" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-medium">Corporate Invoice</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Net 30 terms for verified corporate accounts. Requires credit approval.
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-32">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => {
                      const price = item.product.bulk_price && 
                                    item.product.bulk_min_quantity && 
                                    item.quantity >= item.product.bulk_min_quantity
                        ? item.product.bulk_price
                        : item.product.price;
                      
                      return (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>${(price * item.quantity).toFixed(2)}</span>
                        </div>
                      );
                    })}

                    <hr className="border-border" />

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-accent">Calculated separately</span>
                    </div>

                    <hr className="border-border" />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-medical hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>

                    <div className="pt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-accent" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-accent" />
                        <span>Temperature-controlled shipping</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;