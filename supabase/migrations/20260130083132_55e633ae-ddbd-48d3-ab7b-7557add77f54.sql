-- Add DELETE policy for users to delete their own profile
CREATE POLICY "Users can delete their own profile"
ON public.profiles FOR DELETE TO authenticated
USING (auth.uid() = id);

-- Add DELETE policy for admins to delete any profile
CREATE POLICY "Admins can delete any profile"
ON public.profiles FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::user_role));