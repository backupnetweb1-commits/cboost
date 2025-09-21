import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { TrendingUp, DollarSign, Users, Link2, CreditCard, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useUserDb } from "@/hooks/useUserDb";

const UserDashboard: React.FC = () => {
    const { toast } = useToast();
    const baseUrl = window.location.origin;
    const [copiedLink, setCopiedLink] = React.useState(false);

    // --- Hooks provide all the state we need ---
    const { user, loading: authLoading, logOut } = useAuth();
    const { referralData, investmentData, isLoading: dbLoading, error } = useUserDb();

    // --- 1. Simplified and robust loading and error handling at the top ---
    if (authLoading || dbLoading) {
        return  <Layout>
                <div className="min-h-screen py-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your info...</p>
                  </div>
                </div>
              </Layout>;
    }

    if (error) {
        return <Layout>
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="text-center">
            {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div> */}
            <p className="text-error">
                {error}
            </p>
          </div>
        </div>
      </Layout>;
    }

    // Handle case where user is not logged in after loading
    if (!user) {
        return <Layout><div>Please log in to view your dashboard.</div></Layout>;
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedLink(true);
            toast({
                title: "Link copied! 🎉",
                description: "Share it with your friends to start earning!",
                duration: 3000
            });
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (err) {
            console.error(err);
            toast({ title: "Failed to copy", variant: "destructive" });
        }
    };

    const referralLink = `${baseUrl}/auth/${user.referralCode || ''}`;

    return (
        <Layout>
            <div className="min-h-screen py-12 px-4 flex flex-col items-center bg-background from-blue-50 to-white">
                <div className="max-w-5xl w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            {/* --- 2. Use data directly and safely with optional chaining (?.) --- */}
                            <h1 className="text-3xl font-bold">Welcome, {user.firstName} {user.lastName}!</h1>
                            <p className="text-sm text-muted-foreground italic">{user.email}</p>
                        </div>
                        <Button variant="outline" size="lg" onClick={logOut}>Log Out</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Account Balance */}
                        <Card className="bg-gradient-card border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-accent" /> Account Balance</CardTitle>
                                <CardDescription>Current available balance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">${(user.walletBalance || 0).toLocaleString()}</div>
                                <div className="w-full flex justify-end gap-4 items-center ">
                                    <Button variant="outline" title="Withdraw" disabled={user.walletBalance === 0} size="lg" className="mr-2">Withdraw</Button>
                                    <Button variant="default" title="Deposit" size="lg">Deposit</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Referrals */}
                        <Card className="bg-gradient-card border-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-accent" /> Referrals</CardTitle>
                                <CardDescription>Total successful referrals</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-3xl font-bold">{referralData?.activeReferrals || 0}</div>
                                    <Link to='/market'><Button>Buy Referrals</Button></Link>
                                </div>
                                <div className="w-full flex mt-4 items-center justify-between gap-4">
                                    <Input type="text" placeholder="Share your referral link" value={referralLink} readOnly />
                                    <Button size="icon" variant={copiedLink ? "default" : "outline"} onClick={() => handleCopy(referralLink)}>
                                        {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        {/* Loan */}

                        <Card className="bg-gradient-card border-border/50">

                            <CardHeader>

                                <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-accent" /> Loan</CardTitle>

                                <CardDescription>Your current loan status and repayment</CardDescription>

                            </CardHeader>

                            <CardContent>

                                <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">

                                    <div>

                                        <div className="text-lg font-semibold">Amount: <span className="text-foreground">1000</span></div>

                                        <div className="text-sm text-muted-foreground">Status:2000</div>

                                    </div>

                                    <div>

                                        <div className="text-lg font-semibold">Repaid: <span className="text-foreground">${''}</span></div>

                                        <div className="text-sm text-muted-foreground">Outstanding: ${''}</div>

                                    </div>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                    {/* Note: Loan data seems to be missing from your hooks. I've removed it.
                            If you fetch it, you can add it back like the other cards. */}
                </div>

                {/* Investments Table */}
                <Card className="mb-8 bg-gradient-subtle w-full border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent" /> Investments</CardTitle>
                        <CardDescription>Your active and past investments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* Table Head */}
                                <thead>
                                    <tr className="border-b border-border/30">
                                        <th className="text-left py-3 px-2">Plan</th>
                                        <th className="text-left py-3 px-2">Amount</th>
                                        <th className="text-left py-3 px-2">ROI (%)</th>
                                        <th className="text-left py-3 px-2">Expected Return</th>
                                        <th className="text-left py-3 px-2">Status</th>
                                    </tr>
                                </thead>
                                {/* --- 3. Render real data directly from the investmentData hook --- */}
                                <tbody>
                                    {investmentData && investmentData.length > 0 ? (
                                        investmentData.map(inv => (
                                            <tr key={inv.id} className="border-b border-border/20 hover:bg-accent/5">
                                                <td className="py-3 px-2 font-medium">{inv.planId}</td>
                                                <td className="py-3 px-2">${inv.amount}</td>
                                                <td className="py-3 px-2">{inv.roi}</td>
                                                <td className="py-3 px-2">${inv.expectedReturn}</td>
                                                <td className="py-3 px-2">{inv.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">No investments found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Referral Table */}
                <Card className="mt-8 bg-gradient-subtle w-full border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Link2 className="w-5 h-5 text-accent" /> Referral List</CardTitle>
                        <CardDescription>All users you have referred</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* Table Head */}
                                <thead>
                                    <tr className="border-b border-border/30">
                                        <th className="text-left py-3 px-2">Name</th>
                                        <th className="text-left py-3 px-2">Email</th>
                                        <th className="text-left py-3 px-2">Date Joined</th>
                                        <th className="text-left py-3 px-2">Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referralData?.referredUsers && referralData.referredUsers.length > 0 ? (
                                        referralData.referredUsers.map((ref, idx) => (
                                            <tr key={idx} className="border-b border-border/20 hover:bg-accent/5">
                                                <td className="py-3 px-2 font-medium">{ref.firstName}</td>
                                                <td className="py-3 px-2">{ref.email}</td>
                                                <td className="py-3 px-2">{new Date(ref.joinedAt).toLocaleDateString()}</td>
                                                <td className="py-3 px-2">{ref.level}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="text-center py-4">No referrals found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout >
    );
};

export default UserDashboard;