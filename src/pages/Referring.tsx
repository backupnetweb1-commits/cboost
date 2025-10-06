import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Link} from 'react-router-dom'
import { 
  Users, 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  UserPlus, 
  TrendingUp,
  Calendar,
  Mail,
  Zap,
  Sparkles,
  Crown,
  Star,
  Target,
  BarChart3,
  Gift
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Referring = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [stats, setStats] = useState([
    { label: "Total Referrals", value: "0", icon: Users, trend: "+0" },
    { label: "Active Referrals", value: "0", icon: UserPlus, trend: "+0" },
    { label: "Total Earnings", value: "$0.00", icon: DollarSign, trend: "+$0.00" },
    { label: "Tier 1 Referrals", value: "0", icon: Target, trend: "+0" },
  ]);
  const [tierStats, setTierStats] = useState({ 
    1: 0, 
    2: 0, 
    3: 0, 
    earnings: {1: 0, 2: 0, 3: 0} 
  });
  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const baseURL = window.location.origin;

  const referralTiers = [
    { 
      tier: 1, 
      commission: 10, 
      color: "border-blue-500 bg-blue-500/20", 
      icon: Crown, 
      requirements: "Direct referrals", 
      description: "Earn 10% commission on every investment made by users you directly refer",
      gradient: "from-blue-500 to-blue-600"
    },
    { 
      tier: 2, 
      commission: 7, 
      color: "border-purple-500 bg-purple-500/20", 
      icon: Star, 
      requirements: "Second level referrals", 
      description: "Earn 7% commission on investments from referrals of your referrals",
      gradient: "from-purple-500 to-purple-600"
    },
    { 
      tier: 3, 
      commission: 5, 
      color: "border-yellow-500 bg-yellow-500/20", 
      icon: Zap, 
      requirements: "Third level referrals", 
      description: "Earn 5% commission on third-level referral investments",
      gradient: "from-yellow-500 to-yellow-600"
    }
  ];

  const handleCopy = async (text: string, setFn: any, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFn(true);
      toast({ 
        title: message, 
        description: "Share it with your friends to start earning!",
        duration: 3000 
      });
      setTimeout(() => setFn(false), 2000);
    } catch (err) { 
      console.error(err); 
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!user?.uid) return;
    console.log("Fetching referral data for user:", user);

    const fetchReferralData = async () => {
      try {
        setLoading(true);
        console.log("Fetching referral data for user:", user.uid);
        
        const response = await axios.get(`https://crypto-invest-backend-1.onrender.com/api/referrals/user/${user.uid}`); //make sure you change this to the live server url casue this is mine
        const data = response.data;

        console.log("Referral API response:", data);

        // Update main stats
        setStats([
          { 
            label: "Total Referrals", 
            value: data.totalReferrals?.toString() || "0", 
            icon: Users, 
            trend: `+${data.totalReferrals || 0}` 
          },
          { 
            label: "Active Referrals", 
            value: data.activeReferrals?.toString() || "0", 
            icon: UserPlus, 
            trend: `+${data.activeReferrals || 0}` 
          },
          { 
            label: "Total Earnings", 
            value: `$${(data.totalEarnings || 0).toFixed(2)}`, 
            icon: DollarSign, 
            trend: `+$${(data.totalEarnings || 0).toFixed(2)}` 
          },
          { 
            label: "Tier 1 Referrals", 
            value: (data.tiers?.[1] || 0).toString(), 
            icon: Target, 
            trend: `+${data.tiers?.[1] || 0}` 
          },
        ]);

        // Update tier stats
        setTierStats({ 
          1: data.tiers?.[1] || 0, 
          2: data.tiers?.[2] || 0, 
          3: data.tiers?.[3] || 0, 
          earnings: data.tierEarnings || {1: 0, 2: 0, 3: 0} 
        });

        // Set referred users directly from the API response
        console.log("Referred users from API:", data.referredUsers);
        setReferredUsers(data.referredUsers || []);

      } catch (error) {
        console.error("Error fetching referral data:", error);
        toast({ 
          title: "Failed to load referral data", 
          description: "Please try again later",
          variant: "destructive" 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [user?.uid, toast]);

  // Filter users based on active tab
  const filteredUsers = activeTab === "all" 
    ? referredUsers 
    : referredUsers.filter(user => user.level === parseInt(activeTab));

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen  py-12 flex items-center justify-center">
          <div className="text-center ">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your referral empire...</p>
          </div>
        </div>
      </Layout>
    );
  }
if(!user){
  return (
    <Layout>
      <div className="min-h-screen py-12  flex max-md:flex-col items-start justify-center">
        <div className="text-center bg-blue-500 p-8 rounded-lg m-2">
          <p className="text-white">Join Referal Program</p>
          <Link to={'/auth'}>
                <Button variant="default" size="lg">Sign In to Join</Button>

          </Link>
        </div>
         <div className="lg:col-span-2 space-y-6">
              {referralTiers.map(tier => (
                <Card key={tier.tier} className={`border-2 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm ${tier.color} hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader className="flex flex-row justify-between items-center pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${tier.gradient} rounded-full`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          Tier {tier.tier}
                          {tier.tier === 1 && <Crown className="w-4 h-4 ml-2 text-yellow-500" />}
                        </CardTitle>
                        <CardDescription>{tier.requirements}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`bg-gradient-to-r ${tier.gradient} text-white px-3 py-1 text-sm`}>
                      {tier.commission}% Commission
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">{tier.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Referrals</span>
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-lg font-bold text-foreground mt-1">{tierStats[tier.tier]}</p>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Earnings</span>
                          <DollarSign className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          ${(tierStats.earnings?.[tier.tier] || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
      </div>
      </Layout>
      )
}
  return (
    <Layout>
      <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with animated gradient */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-3xl rounded-full"></div>
            <div className="relative">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-4 shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>Premium Referral Program</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Build Your Empire
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Invite friends and earn up to <span className="font-bold text-blue-500">22% total commission</span> across three powerful tiers
              </p>
            </div>
          </div>

          {/* Stats Grid with animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Your Referral Toolkit</CardTitle>
                  <CardDescription>Spread the word and watch your earnings grow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="flex items-center text-sm font-medium mb-2">
                      <Share2 className="w-4 h-4 mr-2" />
                      Referral Link
                    </Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={`${baseURL}/auth/${user['referralCode']}`} 
                        readOnly 
                        className="flex-1 font-mono text-sm" 
                      />
                      <Button 
                        size="icon" 
                        variant={copiedLink ? "default" : "outline"}
                        onClick={() => handleCopy(
                          `${baseURL}/auth/${user['referralCode']}`, 
                          setCopiedLink, 
                          "Link copied! 🎉"
                        )}
                      >
                        {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="flex items-center text-sm font-medium mb-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Your Unique Code
                    </Label>
                    <div className="flex space-x-2">
                      <Input 
                        value={user['referralCode'] || "Loading..."} 
                        readOnly 
                        className="flex-1 font-mono text-sm font-bold" 
                      />
                      <Button 
                        size="icon" 
                        variant={copiedCode ? "default" : "outline"}
                        onClick={() => handleCopy(
                          user['referralCode'] || "", 
                          setCopiedCode, 
                          "Code copied! ✨"
                        )}
                        disabled={!user['referralCode']}
                      >
                        {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">🎯 Pro Tip</h4>
                    <p className="text-xs text-muted-foreground">
                      Share your code on social media to maximize your earnings potential!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Commission Tiers */}
            <div className="lg:col-span-2 space-y-6">
              {referralTiers.map(tier => (
                <Card key={tier.tier} className={`border-2 bg-gradient-to-br from-background to-background/50 backdrop-blur-sm ${tier.color} hover:shadow-2xl transition-all duration-300`}>
                  <CardHeader className="flex flex-row justify-between items-center pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${tier.gradient} rounded-full`}>
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          Tier {tier.tier}
                          {tier.tier === 1 && <Crown className="w-4 h-4 ml-2 text-yellow-500" />}
                        </CardTitle>
                        <CardDescription>{tier.requirements}</CardDescription>
                      </div>
                    </div>
                    <Badge className={`bg-gradient-to-r ${tier.gradient} text-white px-3 py-1 text-sm`}>
                      {tier.commission}% Commission
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">{tier.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Referrals</span>
                          <Users className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-lg font-bold text-foreground mt-1">{tierStats[tier.tier]}</p>
                      </div>
                      <div className="bg-background/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Earnings</span>
                          <DollarSign className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-lg font-bold text-green-600 mt-1">
                          ${(tierStats.earnings?.[tier.tier] || 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Referred Users Section */}
          <Card className="bg-background/80 backdrop-blur-sm border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    Your Referral Network
                  </CardTitle>
                  <CardDescription>
                    {referredUsers.length} people joined through your referral
                  </CardDescription>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant={activeTab === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("all")}
                  >
                    All Tiers
                  </Button>
                  <Button
                    variant={activeTab === "1" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("1")}
                  >
                    Tier 1
                  </Button>
                  <Button
                    variant={activeTab === "2" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("2")}
                  >
                    Tier 2
                  </Button>
                  <Button
                    variant={activeTab === "3" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("3")}
                  >
                    Tier 3
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 border-dashed border-2 rounded-lg">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h4 className="text-lg font-semibold text-muted-foreground mb-2">
                    No referrals yet
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {activeTab !== "all" 
                      ? `No Tier ${activeTab} referrals found` 
                      : "Start sharing your referral code to build your network!"
                    }
                  </p>
                  <Button onClick={() => handleCopy(user['referralCode'] || "", setCopiedCode, "Code copied!")}>
                    
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Referral Code
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((refUser, index) => (
                    <Card key={index} className="bg-background/50 border-border/30 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4 space-y-3">
                        {/* Header with tier badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full ${
                              refUser.level === 1 ? "bg-blue-500/20" :
                              refUser.level === 2 ? "bg-purple-500/20" :
                              "bg-yellow-500/20"
                            }`}>
                              <UserPlus className={`w-4 h-4 ${
                                refUser.level === 1 ? "text-blue-500" :
                                refUser.level === 2 ? "text-purple-500" :
                                "text-yellow-500"
                              }`} />
                            </div>
                            <h4 className="font-semibold">
                              {refUser.firstName} {refUser.lastName}
                            </h4>
                          </div>
                          <Badge variant={
                            refUser.level === 1 ? "default" :
                            refUser.level === 2 ? "secondary" :
                            "outline"
                          }>
                            Tier {refUser.level}
                          </Badge>
                        </div>

                        {/* Email */}
                        {refUser.email && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{refUser.email}</span>
                          </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                          <div>
                            <span className="text-xs text-muted-foreground">Balance</span>
                            <p className="font-bold text-green-600">
                              ${(refUser.walletBalance || 0).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground">Potential</span>
                            <p className="font-bold text-blue-600">
                              ${((refUser.walletBalance || 0) * (refUser.level === 1 ? 0.1 : refUser.level === 2 ? 0.07 : 0.05)).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Join date - using joinedAt from API */}
                        {refUser.joinedAt && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2 border-t">
                            <Calendar className="w-3 h-3" />
                            <span>Joined {new Date(refUser.joinedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{referredUsers.length}</p>
                <p className="text-sm text-muted-foreground">Total Network Size</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  ${(tierStats.earnings[1] + tierStats.earnings[2] + tierStats.earnings[3]).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Earned</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {referredUsers.filter(u => (u.walletBalance || 0) > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Active Investors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Referring;