-- Add SELECT policy for admins to view all profiles for customer support
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::user_role));