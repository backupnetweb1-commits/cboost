import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useLoans, Loantype } from "@/hooks/useLoans";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { CheckCircle, Info, Users, DollarSign, TrendingUp, ArrowRight, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";

const MIN_LOAN = 100;
const MAX_LOAN = 100000;
const REQUIRED_REFERRALS = 40;

const generatLoanId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const LoanPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { loading, error, numberOfReferrals, loanLoading, loans, looanRequest } = useLoans();
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanError, setLoanError] = useState("");
  const [loanSuccess, setLoanSuccess] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const baseURL = window.location.origin;

  const [loan, setLoan] = useState<{ amount: number; approved: boolean; status: string }>({ amount: 0, approved: false, status: "none" });
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

  const userReferrals = numberOfReferrals // user['referrals']?.length || 0;
  const hasCollateral = userReferrals >= REQUIRED_REFERRALS
  //|| user?.hasReferralMarketCollateral | false;
  console.log('User referrals', user)

  const canRequestLoan = useMemo(() => {
    const amt = Number(loanAmount);
    return (
      hasCollateral &&
      amt >= MIN_LOAN &&
      amt <= MAX_LOAN &&
      loan.status !== "approved"
    );
  }, [loanAmount, hasCollateral, loan.status]);

  const handleLoanRequest = async () => {
    const amt = Number(loanAmount);
    if (!hasCollateral) {
      setLoanError(t("loan_collateral_required", { count: REQUIRED_REFERRALS }));
      return;
    }
    if (amt < MIN_LOAN || amt > MAX_LOAN) {
      setLoanError(t("loan_amount_range", { min: MIN_LOAN, max: MAX_LOAN }));
      return;
    }
    const loanData: Loantype = {
      loan_id: generatLoanId(),
      user_id: user.uid,
      amount: amt,
      interest_rate: 0.01,
      duration: 12,
    };
    await looanRequest(loanData);
    // setLoan({ amount: amt, approved: true, status: "approved" });
    setLoanSuccess(t("loan_approved_and_credited", { amount: amt }));
    setLoanError("");
  };

  const handleLoanWithdraw = () => {
    window.open("https://t.me/Cryptoboost2016", "_blank");
  };

  

  useEffect(() => {

    if (!hasCollateral) {
      setShowDialog(true)
      console.log('show dialog')
    }
  }, [hasCollateral]);
  console.log('Has collateral', hasCollateral)
  console.log('User referrals', userReferrals)
  console.log('Number of referrals', numberOfReferrals)

  console.log('Can request loan', loans['success'])
  return (
    <Layout>
      <div className="min-h-screen py-12 px-4 bg-background flex flex-col items-center">
        {/* Hero Section */}
        <div className="max-w-2xl w-full text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-semibold mb-4 shadow-md">
            <TrendingUp className="w-6 h-6" />
            <span>Get a Loan Instantly</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {t("loan_hero_title", "Flexible Loans for Ambitious Investors")}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {t("loan_hero_desc", "Unlock capital for your investments. Use your referrals as collateral and repay automatically from your commissions.")}
          </p>
        </div>
        {/* Main Content: Two Columns */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Explanation & Steps */}
          <Card className={`bg-gradient-subtle border-border/50 ${loading && "opacity-50 blur"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="w-5 h-5 text-accent" /> How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-6 space-y-4 text-muted-foreground text-base">
                <li>To take a loan, you must provide collateral. You can acquire collateral by having at least <span className="font-semibold text-foreground">40 referrals</span> or by buying referrals from our referral market.</li>
                <li>Loan amounts range from <span className="font-semibold">$100</span> (minimum) to <span className="font-semibold">$100,000</span> (maximum). 40 referrals are required for any loan up to $10,000.</li>
                <li>Once your loan is approved, the requested amount is <span className="font-semibold text-foreground">automatically credited</span> to your account.</li>
                <li>Your future referral commissions will be used to <span className="font-semibold">repay the loan automatically</span>.</li>
                <li>Unapproved loans cannot be used for investments. Only approved loans are eligible for investment purposes.</li>
                <li>To withdraw your loan, click the withdrawal button. This will redirect you to contact the admin on Telegram or WhatsApp for manual processing.</li>
              </ol>
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-600"><CheckCircle className="w-5 h-5" /> Fast approval & instant crediting</div>
                <div className="flex items-center gap-2 text-blue-600"><Users className="w-5 h-5" /> Use your network as collateral</div>
                <div className="flex items-center gap-2 text-accent"><DollarSign className="w-5 h-5" /> Repay as you earn</div>
              </div>
            </CardContent>
          </Card>
          {/* Right: Loan Form */}
          <Card className={`bg-gradient-card border-border/50${loading && "opacity-50 blur"}  shadow-lg`}>
            <CardHeader>
              <CardTitle className="text-2xl">{t("loan_request", "Request a Loan")}</CardTitle>
              <CardDescription>{t("loan_request_desc", "Fill out the form to request your loan. Minimum 40 referrals required.")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="loan-amount">{t("loan_amount_usd", "Loan Amount (USD)")}</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  placeholder="e.g., 1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                  disabled={loan.status === "approved" || !hasCollateral}
                />

                <div className="text-xs text-muted-foreground">
                  {t("collateral_status", { status: hasCollateral ? t("met", "Met") : t("not_met", "Not met"), count: userReferrals })}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t("loan_min_max", { min: MIN_LOAN, max: MAX_LOAN, count: REQUIRED_REFERRALS })}
                </div>
                {loanError && <div className="text-xs text-red-500">{loanError}</div>}
                {loanSuccess && <div className="text-xs text-green-600">{loanSuccess}</div>}
                <Button
                  className="w-full bg-gradient-primary mt-2"
                  onClick={handleLoanRequest}
                  disabled={!canRequestLoan}
                  size="lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2" /> {loanLoading ? t("requesting_loan", "Requesting Loan...") : t("request_loan", "Request Loan")}
                </Button>
                {loans['success'] == true && (
                  <Button
                    className="w-full mt-2 bg-gradient-primary"
                    onClick={handleLoanWithdraw}
                    variant="outline"
                    size="lg"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" /> {t("withdraw_loan_contact_admin", "Withdraw Loan (Contact Admin)")}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Dialog for not eligible for loan */}
      <Dialog
        open={showDialog}
        onOpenChange={()=>{ setShowDialog(false)
       // window.location.href = "/";
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("loan_not_eligible_title", "Not Eligible for Loan")}</DialogTitle>
            <DialogDescription>{t("loan_not_eligible_desc", "You do not have enough referrals to take a loan.\n Share your referral link to earn more. \n Click the button below to share your referral link. or \n Buy referrals from our referral market.")}</DialogDescription>
           <div className="w-full flex justify-between items-center gap-4">
 <Button
   variant="outline"
              onClick={() => handleCopy(
                `${baseURL}/auth/${user['referralCode']}`,
                setCopiedLink,
                "Link copied! 🎉"
              )}
              size="lg"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> {t("share_referral_link", "Copy Referral Link")}
                </>
              )}
            </Button >
            <Link to='/market' className="w-full border"><Button 
             size="lg"
             className="w-full"
            >Buy Referrals</Button></Link>

           </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default LoanPage;
