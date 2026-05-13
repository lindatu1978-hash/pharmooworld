import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO, { createBreadcrumbSchema } from "@/components/SEO";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  author: string;
  featured_image: string | null;
  published_at: string | null;
  tags: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, author, featured_image, published_at, tags")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data) setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = ["all", ...new Set(posts.map(p => p.category))];
  const filteredPosts = selectedCategory === "all" ? posts : posts.filter(p => p.category === selectedCategory);

  return (
    <>
      <SEO
        title="Pharma Industry Blog & Guides"
        description="Expert articles on botulinum toxin, dermal fillers, cold chain logistics, pharmaceutical supply chain, and aesthetic medicine. Written by PharmooWorld's editorial team."
        keywords="pharmaceutical blog, botulinum toxin guide, dermal fillers education, cold chain logistics, medical supply chain"
        canonical="/blog"
        structuredData={createBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      <Layout>
        <div className="bg-gradient-to-b from-primary/5 to-background">
          <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                PharmooWorld Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert insights on pharmaceutical distribution, aesthetic medicine, cold chain logistics, and supply chain integrity.
              </p>
            </div>
          </section>

          <section className="container mx-auto px-4 pb-16">
            <div className="max-w-5xl mx-auto">
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat === "all" ? "All Articles" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-40 w-full rounded-lg mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No articles yet</h2>
                  <p className="text-muted-foreground">Check back soon for expert pharmaceutical industry content.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                        <CardContent className="p-6">
                          {post.featured_image && (
                            <div className="aspect-video bg-secondary/50 rounded-lg mb-4 overflow-hidden">
                              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                            </div>
                          )}
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                            {post.published_at && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                              </span>
                            )}
                          </div>
                          <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>
                          )}
                          <span className="text-sm text-primary font-medium flex items-center gap-1">
                            Read Article <ArrowRight className="h-3 w-3" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
