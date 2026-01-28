import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, ShoppingCart, FileText } from "lucide-react";
import Invoice from "./Invoice";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [invoiceOrderId, setInvoiceOrderId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders", searchQuery, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as OrderStatus);
      }

      const { data: ordersData, error } = await query.limit(100);
      if (error) throw error;

      // Fetch profiles for users
      const userIds = ordersData?.map(o => o.user_id).filter(Boolean) as string[];
      let profiles: Record<string, { company_name: string | null; email: string | null; phone: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, company_name, email, phone")
          .in("id", userIds);
        
        profilesData?.forEach(p => {
          profiles[p.id] = { company_name: p.company_name, email: p.email, phone: p.phone };
        });
      }

      let result = ordersData?.map(order => ({
        ...order,
        profile: order.user_id ? profiles[order.user_id] : null,
      }));

      // Filter by search query on client side (for company name/email)
      if (searchQuery && result) {
        result = result.filter(
          (order) =>
            order.profile?.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.profile?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return result;
    },
  });

  const { data: orderItems } = useQuery({
    queryKey: ["order-items", selectedOrderId, invoiceOrderId],
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

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({
        title: "Order updated",
        description: "Order status has been changed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating order",
        description: error.message,
        variant: "destructive",
      });
    },
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
      hour: "2-digit",
      minute: "2-digit",
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
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const selectedOrder = orders?.find((o) => o.id === selectedOrderId);
  const invoiceOrder = orders?.find((o) => o.id === invoiceOrderId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Badge variant="secondary" className="gap-1">
          <ShoppingCart className="h-3 w-3" />
          {orders?.length || 0} orders
        </Badge>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {order.profile?.company_name || "Guest"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.profile?.email || "-"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(Number(order.total))}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value: OrderStatus) =>
                        updateStatusMutation.mutate({ id: order.id, status: value })
                      }
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setInvoiceOrderId(order.id)}
                      title="Generate Invoice"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrderId(order.id)}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrderId} onOpenChange={() => setSelectedOrderId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p>{selectedOrder.profile?.company_name || "Guest"}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.profile?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p>{formatDate(selectedOrder.created_at)}</p>
                </div>
                {selectedOrder.shipping_address && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Shipping Address</p>
                    <p>{selectedOrder.shipping_address}</p>
                  </div>
                )}
                {selectedOrder.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p>{selectedOrder.notes}</p>
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
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(Number(item.price))}
                          </TableCell>
                          <TableCell className="text-right font-medium">
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invoice Modal */}
      {invoiceOrder && orderItems && (
        <Invoice
          order={invoiceOrder}
          orderItems={orderItems}
          onClose={() => setInvoiceOrderId(null)}
        />
      )}
    </div>
  );
};

export default OrderList;
