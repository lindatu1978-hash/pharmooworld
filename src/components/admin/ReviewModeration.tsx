import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Trash2, BadgeCheck } from "lucide-react";
import StarRating from "@/components/product/StarRating";
import { useToast } from "@/hooks/use-toast";

interface AdminReview {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  reviewer_name: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
  products: { name: string; slug: string } | null;
}

const ReviewModeration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("id, rating, title, body, reviewer_name, is_verified_purchase, is_approved, created_at, products(name, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as AdminReview[];
    },
  });

  const mutate = useMutation({
    mutationFn: async ({ id, action }: { id: string; action: "approve" | "unapprove" | "delete" }) => {
      const { error } =
        action === "delete"
          ? await supabase.from("product_reviews").delete().eq("id", id)
          : await supabase.from("product_reviews").update({ is_approved: action === "approve" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
      toast({ title: "Review updated" });
    },
    onError: (err) =>
      toast({
        title: "Action failed",
        description: err instanceof Error ? err.message : "Try again.",
        variant: "destructive",
      }),
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  const pending = reviews.filter((r) => !r.is_approved);
  const published = reviews.filter((r) => r.is_approved);

  const renderRow = (review: AdminReview) => (
    <div key={review.id} className="border border-border rounded-lg p-4 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <StarRating value={review.rating} size="sm" />
        <span className="font-medium">{review.products?.name || "Unknown product"}</span>
        {review.is_verified_purchase && (
          <Badge variant="secondary" className="gap-1">
            <BadgeCheck className="h-3 w-3" aria-hidden="true" /> Verified
          </Badge>
        )}
      </div>
      {review.title && <p className="font-medium text-sm">{review.title}</p>}
      {review.body && <p className="text-sm text-muted-foreground">{review.body}</p>}
      <p className="text-xs text-muted-foreground">
        {review.reviewer_name || "Verified buyer"} · {new Date(review.created_at).toLocaleDateString()}
      </p>
      <div className="flex gap-2 pt-1">
        <Button
          size="sm"
          variant={review.is_approved ? "outline" : "default"}
          disabled={mutate.isPending}
          onClick={() => mutate.mutate({ id: review.id, action: review.is_approved ? "unapprove" : "approve" })}
        >
          <Check className="h-4 w-4 mr-1" />
          {review.is_approved ? "Unpublish" : "Approve"}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          disabled={mutate.isPending}
          onClick={() => mutate.mutate({ id: review.id, action: "delete" })}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending approval ({pending.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing waiting for review.</p>
          ) : (
            pending.map(renderRow)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published reviews ({published.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {published.length === 0 ? (
            <p className="text-sm text-muted-foreground">No published reviews yet.</p>
          ) : (
            published.map(renderRow)
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewModeration;
