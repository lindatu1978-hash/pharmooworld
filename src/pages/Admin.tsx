import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { useAdmin } from "@/hooks/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, Settings } from "lucide-react";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";
import { Skeleton } from "@/components/ui/skeleton";

const Admin = () => {
  const { isAdmin, isLoading } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

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
    setActiveTab("add");
  };

  const handleFormComplete = () => {
    setEditingProductId(null);
    setActiveTab("products");
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Pharmoo World</title>
        <meta name="description" content="Admin panel for managing Pharmoo World products and settings." />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
              <Settings className="h-8 w-8" />
              Admin Panel
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage products, categories, and settings
            </p>
          </div>
        </div>

        <div className="container-pharma py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingProductId ? "Edit Product" : "Add Product"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductList onEditProduct={handleEditProduct} />
            </TabsContent>

            <TabsContent value="add">
              <ProductForm 
                productId={editingProductId} 
                onComplete={handleFormComplete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
