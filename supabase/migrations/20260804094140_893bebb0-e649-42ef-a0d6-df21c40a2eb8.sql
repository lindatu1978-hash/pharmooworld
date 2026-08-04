CREATE OR REPLACE FUNCTION public.has_purchased_product(_user_id uuid, _product_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    WHERE o.user_id = _user_id
      AND oi.product_id = _product_id
      AND o.status IN ('shipped'::order_status, 'delivered'::order_status)
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_purchased_product(uuid, uuid) FROM PUBLIC;

CREATE TABLE public.product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text,
  reviewer_name text,
  is_verified_purchase boolean NOT NULL DEFAULT true,
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (product_id, user_id)
);

CREATE INDEX idx_product_reviews_product ON public.product_reviews(product_id) WHERE is_approved = true;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_reviews TO authenticated;
GRANT SELECT ON public.product_reviews TO anon;
GRANT ALL ON public.product_reviews TO service_role;

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are viewable by everyone"
ON public.product_reviews FOR SELECT
USING (is_approved = true);

CREATE POLICY "Users can view their own reviews"
ON public.product_reviews FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all reviews"
ON public.product_reviews FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Verified buyers can create their own review"
ON public.product_reviews FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.has_purchased_product(auth.uid(), product_id)
);

CREATE POLICY "Users can update their own review"
ON public.product_reviews FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own review"
ON public.product_reviews FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any review"
ON public.product_reviews FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::user_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Admins can delete any review"
ON public.product_reviews FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'::user_role));

CREATE TRIGGER update_product_reviews_updated_at
BEFORE UPDATE ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.enforce_review_integrity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.is_verified_purchase := public.has_purchased_product(NEW.user_id, NEW.product_id);
  IF NEW.is_verified_purchase IS NOT TRUE THEN
    RAISE EXCEPTION 'Only verified purchasers can review this product';
  END IF;
  IF TG_OP = 'UPDATE' AND NOT public.has_role(auth.uid(), 'admin'::user_role) THEN
    NEW.is_approved := OLD.is_approved;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.enforce_review_integrity() FROM PUBLIC;

CREATE TRIGGER enforce_review_integrity_trg
BEFORE INSERT OR UPDATE ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.enforce_review_integrity();