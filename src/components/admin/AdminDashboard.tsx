import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingCart, Image, DollarSign, TrendingUp, Users } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [productsRes, ordersRes, bannersRes] = await Promise.all([
        supabase.from("products").select("id, price", { count: "exact" }),
        supabase.from("orders").select("id, total, status", { count: "exact" }),
        supabase.from("banners").select("id, is_active", { count: "exact" }),
      ]);

      const products = productsRes.data || [];
      const orders = ordersRes.data || [];
      const banners = bannersRes.data || [];

      const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      const activeBanners = banners.filter(b => b.is_active).length;

      return {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalBanners: banners.length,
        activeBanners,
        totalRevenue,
        pendingOrders,
      };
    },
  });

  const { data: recentOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      const { data: ordersData, error } = await supabase
        .from("orders")
        .select("id, total, status, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      // Fetch profiles for users
      const userIds = ordersData?.map(o => o.user_id).filter(Boolean) as string[];
      let profiles: Record<string, { company_name: string | null; email: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, company_name, email")
          .in("id", userIds);
        
        profilesData?.forEach(p => {
          profiles[p.id] = { company_name: p.company_name, email: p.email };
        });
      }

      return ordersData?.map(order => ({
        ...order,
        profile: order.user_id ? profiles[order.user_id] : null,
      }));
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning";
      case "processing":
        return "text-primary";
      case "shipped":
        return "text-accent";
      case "delivered":
        return "text-success";
      case "cancelled":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts || 0}</div>
            <p className="text-xs text-muted-foreground">
              Products in catalog
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders || 0}</div>
            <p className="text-xs text-warning">
              {stats?.pendingOrders || 0} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              All time earnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Banners
            </CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeBanners || 0}</div>
            <p className="text-xs text-muted-foreground">
              of {stats?.totalBanners || 0} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingOrders ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : recentOrders?.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No orders yet
            </p>
          ) : (
            <div className="space-y-4">
              {recentOrders?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium">
                      {order.profile?.company_name || order.profile?.email || "Guest"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(Number(order.total))}</p>
                    <p className={`text-sm capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
