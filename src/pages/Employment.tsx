import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, TrendingUp, Target, Share2, Gift, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Employment = () => {
  const { t } = useTranslation();
  const benefits = [
    {
      title: "High Commission Rates",
      description: "Earn up to 10% commission on every successful referral",
      icon: DollarSign,
      highlight: "Up to 10%"
    },
    {
      title: "Flexible Working",
      description: "Work from anywhere, anytime. Set your own schedule",
      icon: Briefcase,
      highlight: "100% Remote"
    },
    {
      title: "Multiple Income Streams",
      description: "Earn from direct referrals and multi-level commissions",
      icon: TrendingUp,
      highlight: "3 Tiers"
    },
    {
      title: "No Investment Required",
      description: "Start earning immediately without any upfront costs",
      icon: Gift,
      highlight: "Free to Start"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Join Our Program",
      description: "Sign up for our referral program and get your unique referral link"
    },
    {
      step: 2,
      title: "Share Your Link",
      description: "Share your referral link with friends, family, and social networks"
    },
    {
      step: 3,
      title: "Guide New Users",
      description: "Help new users understand our investment plans and choose the right one"
    },
    {
      step: 4,
      title: "Earn Commissions",
      description: "Receive commissions instantly when your referrals make investments"
    }
  ];

  const earningExamples = [
    {
      referrals: 5,
      avgInvestment: 500,
      monthlyEarning: 250,
      yearlyEarning: 3000
    },
    {
      referrals: 20,
      avgInvestment: 1000,
      monthlyEarning: 2000,
      yearlyEarning: 24000
    },
    {
      referrals: 50,
      avgInvestment: 1500,
      monthlyEarning: 7500,
      yearlyEarning: 90000
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              <span>{t('employment_opportunity')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('become_a_partner')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('employment_header_desc')}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              {t('why_partner_with_us')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 bg-accent/20 rounded-full w-fit mb-4">
                      <benefit.icon className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <Badge variant="default" className="mx-auto w-fit">
                      {benefit.highlight}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              {t('how_it_works')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 relative">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-0.5 bg-gradient-primary"></div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Earning Potential */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">
              {t('your_earning_potential')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earningExamples.map((example, index) => (
                <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  index === 1 ? 'border-accent/50 bg-accent/5 shadow-glow' : 'bg-gradient-card border-border/50'
                }`}>
                  {index === 1 && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      {t('most_popular')}
                    </div>
                  )}
                  <CardHeader className={index === 1 ? 'pt-12' : ''}>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-foreground mb-2">
                        {example.referrals}
                      </div>
                      <CardTitle>{t('active_referrals')}</CardTitle>
                      <CardDescription>
                        {t('average_investment')}: ${example.avgInvestment}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-subtle p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{t('monthly_earnings')}</div>
                        <div className="text-2xl font-bold text-accent">
                          ${example.monthlyEarning.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-subtle p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">{t('yearly_potential')}</div>
                        <div className="text-2xl font-bold text-primary">
                          ${example.yearlyEarning.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Commission Structure */}
          <Card className="bg-gradient-crypto border-border/50 shadow-premium mb-16">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t('three_tier_commission_structure')}</CardTitle>
              <CardDescription>{t('maximize_earnings_multi_level')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('tier_1')}</h3>
                  <div className="text-3xl font-bold text-accent mb-2">10%</div>
                  <p className="text-sm text-muted-foreground">
                    {t('direct_referrals_desc')}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Share2 className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('tier_2')}</h3>
                  <div className="text-3xl font-bold text-accent mb-2">7%</div>
                  <p className="text-sm text-muted-foreground">
                    {t('second_level_referrals_desc')}
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-card rounded-lg border border-border/50">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('tier_3')}</h3>
                  <div className="text-3xl font-bold text-accent mb-2">5%</div>
                  <p className="text-sm text-muted-foreground">
                    {t('third_level_referrals_desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-card border-border/50 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  {t('ready_to_start_your_journey')}
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t('join_successful_partners_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow" asChild>
                    <Link to="/referring">
                      <Users className="w-5 h-5 mr-2" />
                      {t('join_referral_program')}
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t('learn_more')}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  {t('no_fees_no_commitments')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employment;