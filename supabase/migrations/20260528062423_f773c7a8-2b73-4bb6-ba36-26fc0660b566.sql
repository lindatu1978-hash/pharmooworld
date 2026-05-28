
-- Restrict EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, user_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Remove broad SELECT policy on storage.objects that allows listing all files in the public product-images bucket.
-- The bucket remains publicly readable via direct/CDN URLs without needing this policy.
DROP POLICY IF EXISTS "Product images are publicly accessible" ON storage.objects;
