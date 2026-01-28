import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, FileText, Eye, ShoppingBag, ArrowRight } from "lucide-react";
import Invoice from "@/components/admin/Invoice";

const Orders = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [invoiceOrderId, setInvoiceOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/account");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/account");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: orderItems } = useQuery({
    queryKey: ["user-order-items", selectedOrderId, invoiceOrderId],
    queryFn: async () => {
      const orderId = selectedOrderId || invoiceOrderId;
      if (!orderId) return [];
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);
      if (error) throw error;
      return data;
    },
    enabled: !!(selectedOrderId || invoiceOrderId),
  });

  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary">Processing</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-accent/10 text-accent border-accent">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const selectedOrder = orders?.find((o) => o.id === selectedOrderId);
  const invoiceOrder = orders?.find((o) => o.id === invoiceOrderId);

  if (loading) {
    return (
      <Layout>
        <div className="container-pharma py-12">
          <Skeleton className="h-10 w-48 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders | Pharmoo World</title>
        <meta name="description" content="View your order history and download invoices" />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              My Orders
            </h1>
            <p className="text-muted-foreground mt-2">
              View your order history and download invoices
            </p>
          </div>
        </div>

        <div className="container-pharma py-8 lg:py-12">
          {ordersLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : orders?.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start shopping to see your orders here.
                </p>
                <Link to="/products">
                  <Button>
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Desktop Table */}
              <div className="hidden md:block border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {order.id.slice(0, 8).toUpperCase()}
                        </TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(Number(order.total))}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrderId(order.id)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setInvoiceOrderId(order.id)}
                            title="Download Invoice"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {orders?.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-sm font-mono">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">
                          {formatCurrency(Number(order.total))}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrderId(order.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setInvoiceOrderId(order.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Order Details Modal */}
          {selectedOrderId && selectedOrder && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Order Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrderId(null)}
                  >
                    ✕
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono">{selectedOrder.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{formatDate(selectedOrder.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="capitalize">{selectedOrder.payment_method?.replace("_", " ") || "N/A"}</p>
                    </div>
                    {selectedOrder.shipping_address && (
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground">Shipping Address</p>
                        <p>{selectedOrder.shipping_address}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Order Items</h4>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead className="text-center">Qty</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orderItems?.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.product_name}</TableCell>
                              <TableCell className="text-center">{item.quantity}</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(Number(item.price) * item.quantity)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(Number(selectedOrder.total))}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedOrderId(null);
                      setInvoiceOrderId(selectedOrder.id);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Invoice Modal */}
          {invoiceOrder && orderItems && (
            <Invoice
              order={{
                ...invoiceOrder,
                profile: profile ? {
                  company_name: profile.company_name,
                  email: profile.email,
                  phone: profile.phone,
                } : null,
              }}
              orderItems={orderItems}
              onClose={() => setInvoiceOrderId(null)}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Orders;