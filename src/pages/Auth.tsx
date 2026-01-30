import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { Mail, Lock, Building2, LogOut, Package, Settings, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAdmin();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(profileData);
      }
      setCheckingAuth(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(profileData);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            company_name: signupData.companyName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  if (checkingAuth) {
    return (
      <Layout>
        <div className="container-pharma py-12 flex justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Logged in view
  if (user) {
    return (
      <>
        <Helmet>
          <title>My Account | Pharmoo World</title>
          <meta name="description" content="Manage your Pharmoo World account" />
        </Helmet>

        <Layout>
          <div className="bg-secondary/30 py-8">
            <div className="container-pharma">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                My Account
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {profile?.company_name || user.email}
              </p>
            </div>
          </div>

          <div className="container-pharma py-12">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{profile?.company_name || "Not set"}</p>
                    </div>
                    {profile?.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                    )}
                    {profile?.country && (
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{profile.country}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  <Link to="/orders">
                    <Button variant="outline" className="w-full justify-start h-auto py-4">
                      <Package className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">My Orders</p>
                        <p className="text-xs text-muted-foreground">View history & invoices</p>
                      </div>
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="outline" className="w-full justify-start h-auto py-4">
                      <Settings className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Browse Products</p>
                        <p className="text-xs text-muted-foreground">Explore our catalog</p>
                      </div>
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="sm:col-span-2">
                      <Button variant="outline" className="w-full justify-start h-auto py-4 border-primary/50 bg-primary/5">
                        <ShieldCheck className="h-5 w-5 mr-3 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">Admin Dashboard</p>
                          <p className="text-xs text-muted-foreground">Manage products, orders & banners</p>
                        </div>
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Logout */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sign In | Pharmoo World</title>
        <meta name="description" content="Sign in to your Pharmoo World account to manage orders and access wholesale pricing." />
      </Helmet>

      <Layout>
        <div className="bg-secondary/30 py-8">
          <div className="container-pharma">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in or create an account to place orders
            </p>
          </div>
        </div>

        <div className="container-pharma py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="login">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Create Account</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="you@company.com"
                            className="pl-10"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full gradient-medical" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>

                      <div className="relative my-4">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                          or continue with
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                      >
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        {isGoogleLoading ? "Signing in..." : "Continue with Google"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-company">Company Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-company"
                            placeholder="Your Company Ltd"
                            className="pl-10"
                            value={signupData.companyName}
                            onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="you@company.com"
                            className="pl-10"
                            value={signupData.email}
                            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            required
                            minLength={8}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full gradient-medical" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By creating an account, you agree to our Terms & Conditions and Privacy Policy.
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Auth;