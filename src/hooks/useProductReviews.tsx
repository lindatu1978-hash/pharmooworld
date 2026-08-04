import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  reviewer_name: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ReviewInput {
  rating: number;
  title?: string;
  body?: string;
  reviewerName?: string;
}

export function useProductReviews(productId: string | undefined) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const reviewsQuery = useQuery({
    queryKey: ["product-reviews", productId],
    enabled: !!productId,
    staleTime: 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("id, product_id, user_id, rating, title, body, reviewer_name, is_verified_purchase, is_approved, created_at")
        .eq("product_id", productId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as ProductReview[];
    },
  });

  // Can this signed-in user review? Requires a shipped/delivered order containing the product.
  const eligibilityQuery = useQuery({
    queryKey: ["review-eligibility", productId, userId],
    enabled: !!productId && !!userId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_purchased_product", {
        _user_id: userId!,
        _product_id: productId!,
      });
      if (error) throw error;
      return data === true;
    },
  });

  const allReviews = reviewsQuery.data || [];
  const approvedReviews = useMemo(
    () => allReviews.filter((r) => r.is_approved),
    [allReviews],
  );
  const myReview = useMemo(
    () => (userId ? allReviews.find((r) => r.user_id === userId) ?? null : null),
    [allReviews, userId],
  );

  const { averageRating, reviewCount, distribution } = useMemo(() => {
    const count = approvedReviews.length;
    const total = approvedReviews.reduce((sum, r) => sum + r.rating, 0);
    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: approvedReviews.filter((r) => r.rating === star).length,
    }));
    return {
      averageRating: count ? Number((total / count).toFixed(1)) : 0,
      reviewCount: count,
      distribution: dist,
    };
  }, [approvedReviews]);

  const submitReview = useMutation({
    mutationFn: async (input: ReviewInput) => {
      if (!userId) throw new Error("You must be signed in to leave a review.");
      if (!productId) throw new Error("Missing product.");
      const payload = {
        product_id: productId,
        user_id: userId,
        rating: input.rating,
        title: input.title?.trim() || null,
        body: input.body?.trim() || null,
        reviewer_name: input.reviewerName?.trim() || null,
      };
      const { error } = myReview
        ? await supabase.from("product_reviews").update(payload).eq("id", myReview.id)
        : await supabase.from("product_reviews").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-reviews", productId] });
    },
  });

  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["product-reviews", productId] });
  }, [queryClient, productId]);

  return {
    reviews: approvedReviews,
    myReview,
    averageRating,
    reviewCount,
    distribution,
    isLoading: reviewsQuery.isLoading,
    isSignedIn: !!userId,
    canReview: eligibilityQuery.data === true,
    isCheckingEligibility: eligibilityQuery.isLoading,
    submitReview,
    refresh,
  };
}
