REVOKE ALL ON FUNCTION public.enforce_review_integrity() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_purchased_product(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_purchased_product(uuid, uuid) TO authenticated;