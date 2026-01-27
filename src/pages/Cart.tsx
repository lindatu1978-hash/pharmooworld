import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Package, Shield, Truck } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
  const { items, itemCount, total, isLoading, updateQuantity, removeFromCart } = useCart();

  if (isLoading) {
    return (
      <Layout>
        <div className="container-pharma py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-32 bg-muted rounded" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Pharmoo World</title>
        <meta name="description" content="Review and checkout your pharmaceutical products order" />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
              <ShoppingCart className="h-8 w-8" />
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="container-pharma py-8 lg:py-12">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Looks like you haven't added any products yet. Browse our catalog to find what you need.
              </p>
              <Link to="/products">
                <Button size="lg" className="gradient-medical hover:opacity-90 gap-2">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const isBulkPrice = item.product.bulk_price && 
                                      item.product.bulk_min_quantity && 
                                      item.quantity >= item.product.bulk_min_quantity;
                  const price = isBulkPrice ? item.product.bulk_price! : item.product.price;
                  
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-4 lg:p-6">
                        <div className="flex gap-4">
                          {/* Image */}
                          <Link to={`/product/${item.product.slug}`} className="shrink-0">
                            <div className="h-24 w-24 bg-secondary/50 rounded-lg flex items-center justify-center overflow-hidden">
                              {item.product.image_url ? (
                                <img
                                  src={item.product.image_url}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="h-8 w-8 text-muted-foreground/50" />
                              )}
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.product.slug}`}>
                              <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                                {item.product.name}
                              </h3>
                            </Link>
                            
                            <div className="mt-1 text-sm text-muted-foreground">
                              ${price.toFixed(2)} / unit
                              {isBulkPrice && (
                                <span className="text-accent ml-2">(Bulk price applied)</span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="w-16 h-8 text-center text-sm"
                                  min={1}
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right shrink-0">
                            <p className="font-bold text-lg">
                              ${(price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-32">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-accent">Calculated at checkout</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout">
                      <Button size="lg" className="w-full gradient-medical hover:opacity-90 gap-2">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Link to="/products">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>

                    {/* Trust badges */}
                    <div className="pt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-accent" />
                        <span>Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-accent" />
                        <span>Global shipping available</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cart;