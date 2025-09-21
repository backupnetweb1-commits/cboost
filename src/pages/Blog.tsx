import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Calendar, User, Mail, Edit, Plus, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const Blog = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Cryptocurrency Investment: A Beginner's Guide",
      excerpt: "Learn the fundamentals of cryptocurrency investing and how to get started with digital assets safely and effectively.",
      content: "Full article content here...",
      author: "Investment Team",
      date: "2024-01-15",
      category: "Education",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Market Analysis: Q1 2024 Crypto Trends",
      excerpt: "Comprehensive analysis of cryptocurrency market trends and predictions for the first quarter of 2024.",
      content: "Full article content here...",
      author: "Market Analysts",
      date: "2024-01-12",
      category: "Market Analysis",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Maximizing Your ROI: Advanced Investment Strategies",
      excerpt: "Discover proven strategies to maximize your return on investment and build a profitable crypto portfolio.",
      content: "Full article content here...",
      author: "Strategy Team",
      date: "2024-01-10",
      category: "Strategy",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Security Best Practices for Crypto Investors",
      excerpt: "Essential security measures every cryptocurrency investor should know to protect their digital assets.",
      content: "Full article content here...",
      author: "Security Team",
      date: "2024-01-08",
      category: "Security",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "The Future of Digital Assets in 2024",
      excerpt: "Exploring upcoming trends, regulations, and innovations that will shape the cryptocurrency landscape.",
      content: "Full article content here...",
      author: "Research Team",
      date: "2024-01-05",
      category: "Future Trends",
      readTime: "10 min read",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "How to Choose the Right Investment Plan",
      excerpt: "A detailed guide to selecting the investment plan that best fits your financial goals and risk tolerance.",
      content: "Full article content here...",
      author: "Advisory Team",
      date: "2024-01-03",
      category: "Planning",
      readTime: "4 min read",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Education", "Market Analysis", "Strategy", "Security", "Future Trends", "Planning"];

  const handleNewsletterSignup = () => {
    if (email) {
      // Handle newsletter signup logic here
      console.log("Newsletter signup:", email);
      setEmail("");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Investment Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Knowledge Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest insights, strategies, and market analysis 
              from our team of cryptocurrency and investment experts.
            </p>
          </div>

          {/* Admin Controls */}
          <div className="flex justify-end mb-6">
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className="mr-2"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Mode"}
            </Button>
            {isEditing && (
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Article */}
              <Card className="bg-gradient-card border-border/50 mb-8">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-subtle rounded-t-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="default">Featured</Badge>
                      <Badge variant="outline">{blogPosts[0].category}</Badge>
                      <span className="text-sm text-muted-foreground">{blogPosts[0].readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{blogPosts[0].author}</span>
                        <Calendar className="w-4 h-4 text-muted-foreground ml-4" />
                        <span className="text-sm text-muted-foreground">{blogPosts[0].date}</span>
                      </div>
                      <Button variant="outline">
                        Read More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.slice(1).map((post) => (
                  <Card key={post.id} className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gradient-subtle rounded-t-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                          {isEditing && (
                            <Button size="sm" variant="ghost" className="ml-auto">
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Newsletter Signup */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>Newsletter</span>
                    </CardTitle>
                    <CardDescription>
                      Get the latest insights delivered to your inbox
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-email">Email Address</Label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow"
                      onClick={handleNewsletterSignup}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Weekly market insights and investment tips. Unsubscribe anytime.
                    </p>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className="w-full justify-start text-left"
                          size="sm"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gradient-crypto border-border/50">
                  <CardHeader>
                    <CardTitle>Blog Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Articles</span>
                      <span className="font-semibold">{blogPosts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subscribers</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-semibold">12 Articles</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;