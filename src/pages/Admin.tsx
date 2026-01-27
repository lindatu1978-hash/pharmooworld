import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { useAdmin } from "@/hooks/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, Settings, Image, ShoppingCart, LayoutDashboard } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import BannerList from "@/components/admin/BannerList";
import BannerForm from "@/components/admin/BannerForm";
import OrderList from "@/components/admin/OrderList";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const { isAdmin, isLoading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/account");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-pharma py-12">
          <Skeleton className="h-12 w-64 mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleEditProduct = (productId: string) => {
    setEditingProductId(productId);
    setActiveTab("add-product");
  };

  const handleProductFormComplete = () => {
    setEditingProductId(null);
    setActiveTab("products");
  };

  const handleEditBanner = (bannerId: string) => {
    setEditingBannerId(bannerId);
    setActiveTab("add-banner");
  };

  const handleBannerFormComplete = () => {
    setEditingBannerId(null);
    setActiveTab("banners");
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Pharmoo World</title>
        <meta name="description" content="Admin dashboard for managing Pharmoo World products, banners, and orders." />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
              <Settings className="h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage products, banners, orders, and settings
            </p>
          </div>
        </div>

        <div className="container-pharma py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 flex-wrap h-auto gap-2">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="add-product" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingProductId ? "Edit Product" : "Add Product"}
              </TabsTrigger>
              <TabsTrigger value="banners" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Banners
              </TabsTrigger>
              <TabsTrigger value="add-banner" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingBannerId ? "Edit Banner" : "Add Banner"}
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products">
              <ProductList onEditProduct={handleEditProduct} />
            </TabsContent>

            <TabsContent value="add-product">
              <ProductForm 
                productId={editingProductId} 
                onComplete={handleProductFormComplete}
              />
            </TabsContent>

            <TabsContent value="banners">
              <BannerList onEditBanner={handleEditBanner} />
            </TabsContent>

            <TabsContent value="add-banner">
              <BannerForm
                bannerId={editingBannerId}
                onComplete={handleBannerFormComplete}
              />
            </TabsContent>

            <TabsContent value="orders">
              <OrderList />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
