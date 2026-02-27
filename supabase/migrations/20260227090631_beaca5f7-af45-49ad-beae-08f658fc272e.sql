
-- Blog posts table for Phase 4 authority content
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL DEFAULT 'PharmooWorld Editorial',
  featured_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Published blog posts are viewable by everyone"
ON public.blog_posts FOR SELECT
USING (is_published = true);

-- Admins full access
CREATE POLICY "Admins can view all blog posts"
ON public.blog_posts FOR SELECT
USING (has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts FOR UPDATE
USING (has_role(auth.uid(), 'admin'::user_role));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE
USING (has_role(auth.uid(), 'admin'::user_role));

-- Timestamp trigger
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);
