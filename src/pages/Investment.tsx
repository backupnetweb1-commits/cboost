import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Zap,
  MessageSquare,
} from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import PaymentModal from "@/components/PaymentModal";
import { useTransactions, InvestmentPlan } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/use-toast";
import AuthenticationDialog from "@/components/ui/auth_dialog";
import { useAuth } from "@/hooks/useAuth";
import { set } from "date-fns";

const Investment = () => {
  const { t } = useTranslation();
  const [currentEarnings, setCurrentEarnings] = useState<Record<number, number>>({});
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    makeInvestment,
    investmentPlans,
    loadingInvestment,
    transactions,
    loading,
    error,
    deposit,
    withdraw,
  } = useTransactions();
  const { toast } = useToast();
  const { user } = useAuth();

  // fallback plans if no data
  const plans: InvestmentPlan[] =
    investmentPlans && investmentPlans.length > 0
      ? investmentPlans
      : [
          {
            id: "1",
            name: t("starter_plan"),
            amount: 50,
            roi: 10,
            days: 3,
            tier: "starter",
            features: [t("roi_10"), t("duration_3_days"), t("basic_support")],
          },
          {
            id: "2",
            name: t("growth_plan"),
            amount: 100,
            roi: 10,
            days: 3,
            tier: "starter",
            features: [t("roi_10"), t("duration_3_days"), t("priority_support")],
          },
        ];

  const handleInvestment = async (planId: string, amount: number) => {
    setInitialLoading(true);
    try {
      if(!user){
        setAuthModalOpen(true);
        return;
      }
      const result = await makeInvestment(planId, amount);
      if (!result) {
        toast({
          title: "Error",
          description: "An error occurred while processing your investment",
        });
      } else {
        toast({
          title: "Success",
          description: "Your investment has been processed successfully",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
      });
    } finally {
      setInitialLoading(false);
    }
  };

  // Simulate live earnings growth
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarnings((prev) => {
        const newEarnings = { ...prev };
        plans.forEach((plan) => {
          const baseEarning = (plan.amount * plan.roi) / 100;
          const randomMultiplier = 0.8 + Math.random() * 0.4;
          newEarnings[parseInt(plan.id)] = baseEarning * randomMultiplier;
        });
        return newEarnings;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [plans]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "starter":
        return "border-blue-500/50 bg-blue-500/5";
      case "premium":
        return "border-purple-500/50 bg-purple-500/5";
      case "vip":
        return "border-yellow-500/50 bg-yellow-500/5 shadow-glow";
      default:
        return "";
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "starter":
        return "secondary";
      case "premium":
        return "outline";
      case "vip":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>{t("crypto_investment_plans")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t("invest_in_your_future")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("investment_header_desc")}
            </p>
          </div>

          {/* Investment Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const expectedReturn = (plan.amount * plan.roi) / 100;
              const liveEarning =
                currentEarnings[parseInt(plan.id)] || expectedReturn;
              const progressPercentage = (liveEarning / expectedReturn) * 100;

              return (
                <Card
                  key={plan.id}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    loading && initialLoading == false
                      ? "opacity-50 pointer-events-none blur"
                      : ""
                  } hover:scale-105 ${getTierColor(plan.tier)}`}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                      <Badge
                        variant={getTierBadgeVariant(plan.tier)}
                        className="capitalize"
                      >
                        {plan.tier}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-foreground">
                        ${plan.amount}
                      </div>
                      <CardDescription>
                        {t("roi_in_days", { roi: plan.roi, days: plan.days })}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Live Earnings Display */}
                    <div className="bg-gradient-card rounded-lg p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          {t("live_example_earnings")}
                        </span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          <span className="text-xs text-accent">{t("live")}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        ${liveEarning.toFixed(2)}
                      </div>
                      <Progress value={progressPercentage} className="mt-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {t("expected")}: ${expectedReturn}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Investment Button */}
                    <Button
                      disabled={loadingInvestment || initialLoading}
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                      onClick={() =>
                        handleInvestment(plan.id.toString(), plan.amount)
                      }
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      {loadingInvestment ? "Processing..." : t("invest_now")}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          planName={selectedPlan.name}
          planAmount={selectedPlan.amount}
        />
      )}

      {/* Authentication Dialog */}
      <AuthenticationDialog
        open={authModalOpen}
        onOpenChange={() => setAuthModalOpen(false)}
      />
    </Layout>
  );
};

export default Investment;
