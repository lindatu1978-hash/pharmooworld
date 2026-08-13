import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, MessageSquare, Lock } from "lucide-react";
import StarRating from "@/components/product/StarRating";
import { useProductReviews } from "@/hooks/useProductReviews";
import { useToast } from "@/hooks/use-toast";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const { toast } = useToast();
  const {
    reviews,
    myReview,
    averageRating,
    reviewCount,
    distribution,
    isLoading,
    isSignedIn,
    canReview,
    isCheckingEligibility,
    submitReview,
  } = useProductReviews(productId);

  const [rating, setRating] = useState(myReview?.rating ?? 0);
  const [title, setTitle] = useState(myReview?.title ?? "");
  const [body, setBody] = useState(myReview?.body ?? "");
  const [reviewerName, setReviewerName] = useState(myReview?.reviewer_name ?? "");

  // Seed the form once the user's existing review loads (query resolves async)
  const seededReviewId = useRef<string | null>(null);
  useEffect(() => {
    if (myReview && seededReviewId.current !== myReview.id) {
      seededReviewId.current = myReview.id;
      setRating(myReview.rating ?? 0);
      setTitle(myReview.title ?? "");
      setBody(myReview.body ?? "");
      setReviewerName(myReview.reviewer_name ?? "");
    }
  }, [myReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast({ title: "Select a rating", description: "Please choose between 1 and 5 stars.", variant: "destructive" });
      return;
    }
    if (title.length > 120 || body.length > 2000 || reviewerName.length > 80) {
      toast({ title: "Too long", description: "Please shorten your review.", variant: "destructive" });
      return;
    }
    try {
      await submitReview.mutateAsync({ rating, title, body, reviewerName });
      toast({
        title: myReview ? "Review updated" : "Thank you for your review",
        description: "It will appear publicly once our team has verified it.",
      });
    } catch (err) {
      toast({
        title: "Could not submit review",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : reviewCount === 0 ? (
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">No verified reviews yet</h3>
                <p className="text-sm text-muted-foreground">
                  Only customers with a completed, delivered order for {productName} can leave a rating — so every
                  review here is from a real buyer.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-[auto,1fr] md:items-center">
              <div className="text-center md:text-left">
                <p className="text-4xl font-bold leading-none">{averageRating.toFixed(1)}</p>
                <StarRating value={averageRating} size="md" className="mt-2 justify-center md:justify-start" />
                <p className="text-sm text-muted-foreground mt-1">
                  {reviewCount} verified {reviewCount === 1 ? "review" : "reviews"}
                </p>
              </div>
              <div className="space-y-1.5">
                {distribution.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-10 text-muted-foreground">{star} ★</span>
                    <Progress value={reviewCount ? (count / reviewCount) * 100 : 0} className="h-2 flex-1" />
                    <span className="w-8 text-right text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review form / eligibility states */}
      <Card>
        <CardContent className="p-6">
          {!isSignedIn ? (
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Sign in to review</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Reviews are limited to verified purchasers of this product.
                </p>
                <Link to="/auth">
                  <Button size="sm">Sign In</Button>
                </Link>
              </div>
            </div>
          ) : isCheckingEligibility ? (
            <Skeleton className="h-20 w-full" />
          ) : !canReview ? (
            <div className="flex items-start gap-3">
              <BadgeCheck className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Verified purchase required</h3>
                <p className="text-sm text-muted-foreground">
                  You can review this product once one of your orders containing it has shipped or been delivered.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-semibold">{myReview ? "Edit your review" : "Write a review"}</h3>
                <p className="text-sm text-muted-foreground">
                  Verified purchase — published after a short moderation check.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Your rating</label>
                <StarRating value={rating} size="lg" interactive onChange={setRating} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="review-name" className="text-sm font-medium mb-1 block">
                    Display name (optional)
                  </label>
                  <Input
                    id="review-name"
                    value={reviewerName}
                    maxLength={80}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Dr. A. Okafor"
                  />
                </div>
                <div>
                  <label htmlFor="review-title" className="text-sm font-medium mb-1 block">
                    Headline (optional)
                  </label>
                  <Input
                    id="review-title"
                    value={title}
                    maxLength={120}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarise your experience"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="review-body" className="text-sm font-medium mb-1 block">
                  Your review
                </label>
                <Textarea
                  id="review-body"
                  value={body}
                  maxLength={2000}
                  rows={4}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Product quality, packaging, cold-chain condition on arrival, delivery time…"
                />
                <p className="text-xs text-muted-foreground mt-1">{body.length}/2000</p>
              </div>

              <Button type="submit" disabled={submitReview.isPending}>
                {submitReview.isPending ? "Submitting…" : myReview ? "Update review" : "Submit review"}
              </Button>

              {myReview && !myReview.is_approved && (
                <p className="text-xs text-muted-foreground">
                  Your review is awaiting moderation and is not publicly visible yet.
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>

      {/* Review list */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <StarRating value={review.rating} size="sm" />
                  {review.title && <span className="font-semibold">{review.title}</span>}
                  {review.is_verified_purchase && (
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                      Verified purchase
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {review.reviewer_name || "Verified buyer"} · {formatDate(review.created_at)}
                </p>
                {review.body && <p className="text-sm leading-relaxed text-muted-foreground">{review.body}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
