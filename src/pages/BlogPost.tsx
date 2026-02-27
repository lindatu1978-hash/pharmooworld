import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO, { createBreadcrumbSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft, User, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  author: string;
  featured_image: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (!error && data) {
        setPost(data);

        // Fetch related posts from same category
        const { data: related } = await supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, category")
          .eq("is_published", true)
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(3);

        if (related) setRelatedPosts(related);
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog"><Button>Browse Articles</Button></Link>
        </div>
      </Layout>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt || "",
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "PharmooWorld",
      logo: { "@type": "ImageObject", url: "https://www.pharmooworld.com/favicon.png" },
    },
    datePublished: post.published_at,
    dateModified: post.published_at,
    url: `https://www.pharmooworld.com/blog/${post.slug}`,
    ...(post.featured_image && { image: post.featured_image }),
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.pharmooworld.com/blog/${post.slug}` },
  };

  return (
    <>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || `${post.title} - PharmooWorld blog article`}
        keywords={post.tags?.join(", ") || post.category}
        canonical={`/blog/${post.slug}`}
        type="article"
        image={post.featured_image || undefined}
        structuredData={[
          articleSchema,
          createBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <Layout>
        <article className="bg-background">
          {/* Breadcrumb */}
          <nav className="bg-secondary/30 py-3" aria-label="Breadcrumb">
            <div className="container mx-auto px-4">
              <ol className="flex items-center gap-2 text-sm">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <span className="text-muted-foreground">/</span>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <span className="text-muted-foreground">/</span>
                <li className="text-foreground truncate max-w-[200px]">{post.title}</li>
              </ol>
            </div>
          </nav>

          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>

              {/* Header */}
              <header className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.published_at && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> {post.author}
                </p>
              </header>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="aspect-video bg-secondary/50 rounded-xl overflow-hidden mb-8">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h2 className="text-xl font-bold mb-4">Related Articles</h2>
                  <div className="grid gap-4">
                    {relatedPosts.map(rp => (
                      <Link key={rp.id} to={`/blog/${rp.slug}`} className="block p-4 rounded-lg border hover:border-primary/30 transition-colors">
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{rp.title}</h3>
                        {rp.excerpt && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{rp.excerpt}</p>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal Links */}
              <div className="mt-8 p-6 bg-secondary/40 rounded-xl">
                <h3 className="font-semibold mb-3">Explore PharmooWorld</h3>
                <div className="flex flex-wrap gap-3">
                  <Link to="/products?category=Botulinum-products" className="text-sm text-primary hover:underline">Botulinum Products</Link>
                  <Link to="/products?category=Dermal-Fillers" className="text-sm text-primary hover:underline">Dermal Fillers</Link>
                  <Link to="/compliance" className="text-sm text-primary hover:underline">Compliance</Link>
                  <Link to="/certifications" className="text-sm text-primary hover:underline">Certifications</Link>
                  <Link to="/shipping-cold-chain" className="text-sm text-primary hover:underline">Cold Chain Shipping</Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

export default BlogPost;
