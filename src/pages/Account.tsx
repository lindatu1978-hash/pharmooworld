import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Phone, MapPin, FileCheck, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  company_name: string | null;
  company_type: string | null;
  license_number: string | null;
  is_verified: boolean;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
}

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    company_name: '',
    company_type: '',
    license_number: '',
    is_verified: false,
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully"
      });
    }
    setSaving(false);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            {profile.is_verified && (
              <Badge className="bg-success text-success-foreground">
                <FileCheck className="h-4 w-4 mr-1" />
                Verified Buyer
              </Badge>
            )}
          </div>

          <form onSubmit={handleSave}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Your business details for order processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company_name"
                        className="pl-10"
                        value={profile.company_name || ''}
                        onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_type">Company Type</Label>
                    <Input
                      id="company_type"
                      placeholder="e.g., Hospital, Pharmacy, Distributor"
                      value={profile.company_type || ''}
                      onChange={(e) => setProfile({ ...profile, company_type: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="license_number">License Number</Label>
                    <Input
                      id="license_number"
                      placeholder="Pharmaceutical License #"
                      value={profile.license_number || ''}
                      onChange={(e) => setProfile({ ...profile, license_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      className="pl-10"
                      value={profile.address || ''}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profile.city || ''}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profile.country || ''}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
