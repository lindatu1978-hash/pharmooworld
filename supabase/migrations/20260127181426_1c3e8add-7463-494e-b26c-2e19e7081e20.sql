-- Create promotional banners table
CREATE TABLE public.banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  link_url TEXT,
  link_text TEXT DEFAULT 'Learn More',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Everyone can view active banners
CREATE POLICY "Active banners are viewable by everyone"
ON public.banners
FOR SELECT
USING (is_active = true AND (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at >= now()));

-- Admins can manage banners
CREATE POLICY "Admins can insert banners"
ON public.banners
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update banners"
ON public.banners
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete banners"
ON public.banners
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view all banners (including inactive)
CREATE POLICY "Admins can view all banners"
ON public.banners
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_banners_updated_at
BEFORE UPDATE ON public.banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add RLS policies for admins to view and manage all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view all order items
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));