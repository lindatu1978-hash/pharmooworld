import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X } from "lucide-react";
import { z } from "zod";

const bannerSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  subtitle: z.string().max(500).optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  link_url: z.string().url().optional().nullable().or(z.literal("")),
  link_text: z.string().max(50).optional().nullable(),
  is_active: z.boolean(),
  display_order: z.number().min(0),
  starts_at: z.string().optional().nullable(),
  ends_at: z.string().optional().nullable(),
});

type BannerFormData = z.infer<typeof bannerSchema>;

interface BannerFormProps {
  bannerId: string | null;
  onComplete: () => void;
}

const BannerForm = ({ bannerId, onComplete }: BannerFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!bannerId;

  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    subtitle: "",
    image_url: "",
    link_url: "",
    link_text: "Learn More",
    is_active: true,
    display_order: 0,
    starts_at: null,
    ends_at: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch banner if editing
  const { data: banner, isLoading: isLoadingBanner } = useQuery({
    queryKey: ["banner", bannerId],
    queryFn: async () => {
      if (!bannerId) return null;
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("id", bannerId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!bannerId,
  });

  // Populate form when editing
  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || "",
        subtitle: banner.subtitle || "",
        image_url: banner.image_url || "",
        link_url: banner.link_url || "",
        link_text: banner.link_text || "Learn More",
        is_active: banner.is_active ?? true,
        display_order: banner.display_order || 0,
        starts_at: banner.starts_at ? banner.starts_at.split("T")[0] : null,
        ends_at: banner.ends_at ? banner.ends_at.split("T")[0] : null,
      });
    }
  }, [banner]);

  // Reset form when switching to add mode
  useEffect(() => {
    if (!bannerId) {
      setFormData({
        title: "",
        subtitle: "",
        image_url: "",
        link_url: "",
        link_text: "Learn More",
        is_active: true,
        display_order: 0,
        starts_at: null,
        ends_at: null,
      });
      setErrors({});
    }
  }, [bannerId]);

  const saveMutation = useMutation({
    mutationFn: async (data: BannerFormData) => {
      const bannerData = {
        title: data.title,
        subtitle: data.subtitle || null,
        image_url: data.image_url || null,
        link_url: data.link_url || null,
        link_text: data.link_text || null,
        is_active: data.is_active,
        display_order: data.display_order,
        starts_at: data.starts_at ? new Date(data.starts_at).toISOString() : null,
        ends_at: data.ends_at ? new Date(data.ends_at).toISOString() : null,
      };

      if (isEditing && bannerId) {
        const { error } = await supabase
          .from("banners")
          .update(bannerData)
          .eq("id", bannerId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("banners")
          .insert([bannerData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({
        title: isEditing ? "Banner updated" : "Banner created",
        description: `The banner has been ${isEditing ? "updated" : "created"} successfully.`,
      });
      onComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Error saving banner",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = bannerSchema.parse(formData);
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

  if (isLoadingBanner) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Banner Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Spring Sale - 20% Off"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                placeholder="Additional details about the promotion..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Background Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                }
                placeholder="https://..."
              />
              {errors.image_url && (
                <p className="text-sm text-destructive">{errors.image_url}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Link & Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Link & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link_url">Link URL</Label>
              <Input
                id="link_url"
                type="url"
                value={formData.link_url || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link_url: e.target.value }))
                }
                placeholder="https://... or /products"
              />
              {errors.link_url && (
                <p className="text-sm text-destructive">{errors.link_url}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="link_text">Button Text</Label>
              <Input
                id="link_text"
                value={formData.link_text || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link_text: e.target.value }))
                }
                placeholder="e.g., Shop Now"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min="0"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    display_order: parseInt(e.target.value) || 0,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="starts_at">Start Date</Label>
                <Input
                  id="starts_at"
                  type="date"
                  value={formData.starts_at || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      starts_at: e.target.value || null,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ends_at">End Date</Label>
                <Input
                  id="ends_at"
                  type="date"
                  value={formData.ends_at || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ends_at: e.target.value || null,
                    }))
                  }
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Leave empty to show the banner indefinitely (while active)
            </p>
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
          {isEditing ? "Update Banner" : "Create Banner"}
        </Button>
      </div>
    </form>
  );
};

export default BannerForm;
