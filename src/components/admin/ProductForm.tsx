import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X, Sparkles } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().max(5000).optional(),
  price: z.number().min(0, "Price must be positive"),
  bulk_price: z.number().min(0).optional().nullable(),
  bulk_min_quantity: z.number().min(1).optional().nullable(),
  category_id: z.string().optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  in_stock: z.boolean(),
  dosage: z.string().max(200).optional().nullable(),
  form: z.string().max(200).optional().nullable(),
  manufacturer: z.string().max(200).optional().nullable(),
  origin: z.string().max(200).optional().nullable(),
  regulatory_status: z.string().max(200).optional().nullable(),
  shelf_life: z.string().max(200).optional().nullable(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  productId: string | null;
  onComplete: () => void;
}

const ProductForm = ({ productId, onComplete }: ProductFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!productId;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    bulk_price: null,
    bulk_min_quantity: 10,
    category_id: null,
    image_url: "",
    in_stock: true,
    dosage: "",
    form: "",
    manufacturer: "",
    origin: "",
    regulatory_status: "",
    shelf_life: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch product if editing
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!productId,
  });

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || 0,
        bulk_price: product.bulk_price || null,
        bulk_min_quantity: product.bulk_min_quantity || 10,
        category_id: product.category_id || null,
        image_url: product.image_url || "",
        in_stock: product.in_stock ?? true,
        dosage: product.dosage || "",
        form: product.form || "",
        manufacturer: product.manufacturer || "",
        origin: product.origin || "",
        regulatory_status: product.regulatory_status || "",
        shelf_life: product.shelf_life || "",
      });
    }
  }, [product]);

  // Reset form when switching to add mode
  useEffect(() => {
    if (!productId) {
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: 0,
        bulk_price: null,
        bulk_min_quantity: 10,
        category_id: null,
        image_url: "",
        in_stock: true,
        dosage: "",
        form: "",
        manufacturer: "",
        origin: "",
        regulatory_status: "",
        shelf_life: "",
      });
      setErrors({});
    }
  }, [productId]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const saveMutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const productData = {
        name: data.name,
        slug: data.slug,
        price: data.price,
        description: data.description || null,
        image_url: data.image_url || null,
        bulk_price: data.bulk_price || null,
        bulk_min_quantity: data.bulk_min_quantity || null,
        category_id: data.category_id || null,
        in_stock: data.in_stock,
        dosage: data.dosage || null,
        form: data.form || null,
        manufacturer: data.manufacturer || null,
        origin: data.origin || null,
        regulatory_status: data.regulatory_status || null,
        shelf_life: data.shelf_life || null,
      };

      if (isEditing && productId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", productId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: isEditing ? "Product updated" : "Product created",
        description: `The product has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      onComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Error saving product",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerateImage = async () => {
    if (!productId) {
      toast({
        title: "Save product first",
        description: "Please save the product before generating an image.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-product-image", {
        body: {
          productId,
          productName: formData.name,
          productDescription: formData.description,
        },
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setFormData((prev) => ({ ...prev, image_url: data.imageUrl }));
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
        queryClient.invalidateQueries({ queryKey: ["admin-products"] });
        toast({
          title: "Image generated",
          description: "AI product image has been created successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Image generation failed",
        description: error.message || "Failed to generate product image.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = productSchema.parse(formData);
      saveMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Aliaxin® GP"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="e.g., aliaxin-gp"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category_id || ""}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category_id: value || null,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Product description..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                  }
                  placeholder="https://..."
                  className="flex-1"
                />
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage}
                    title="Generate AI image"
                  >
                    {isGeneratingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              {errors.image_url && (
                <p className="text-sm text-destructive">{errors.image_url}</p>
              )}
              {formData.image_url && (
                <img 
                  src={formData.image_url} 
                  alt="Product preview" 
                  className="mt-2 h-24 w-24 object-cover rounded-md border"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value) || 0,
                  }))
                }
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk_price">Bulk Price (USD)</Label>
              <Input
                id="bulk_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.bulk_price || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bulk_price: e.target.value ? parseFloat(e.target.value) : null,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bulk_min_quantity">Minimum Bulk Quantity</Label>
              <Input
                id="bulk_min_quantity"
                type="number"
                min="1"
                value={formData.bulk_min_quantity || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bulk_min_quantity: e.target.value
                      ? parseInt(e.target.value)
                      : null,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="in_stock">In Stock</Label>
              <Switch
                id="in_stock"
                checked={formData.in_stock}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, in_stock: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  value={formData.manufacturer || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      manufacturer: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  value={formData.origin || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, origin: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={formData.dosage || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dosage: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="form">Form</Label>
                <Input
                  id="form"
                  value={formData.form || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, form: e.target.value }))
                  }
                  placeholder="e.g., Gel, Tablet, Injection"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="regulatory_status">Regulatory Status</Label>
                <Input
                  id="regulatory_status"
                  value={formData.regulatory_status || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      regulatory_status: e.target.value,
                    }))
                  }
                  placeholder="e.g., CE Marked, FDA Approved"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shelf_life">Shelf Life</Label>
                <Input
                  id="shelf_life"
                  value={formData.shelf_life || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shelf_life: e.target.value,
                    }))
                  }
                  placeholder="e.g., 24 months"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onComplete}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="gradient-medical"
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
