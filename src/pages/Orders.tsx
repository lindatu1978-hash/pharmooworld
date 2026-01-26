import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Order {
  id: string;
  status: string;
  total: number;
  payment_method: string | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: any; color: string }> = {
  pending: { icon: Clock, color: 'bg-warning/10 text-warning' },
  processing: { icon: Package, color: 'bg-primary/10 text-primary' },
  shipped: { icon: Truck, color: 'bg-accent/10 text-accent' },
  delivered: { icon: CheckCircle, color: 'bg-success/10 text-success' },
  cancelled: { icon: XCircle, color: 'bg-destructive/10 text-destructive' }
};

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    setOrders(data || []);
    setLoading(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-1/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = config.icon;
              
              return (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                          <Badge className={config.color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        {order.payment_method && (
                          <p className="text-sm text-muted-foreground">
                            Payment: {order.payment_method.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
