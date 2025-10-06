import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Zap, Star, DollarSign, MessageCircle, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { AnimatedNumber } from "@/components/ui/animation_number";

const HomePage = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: TrendingUp,
      title: t("high_roi_returns"),
      description: t("high_roi_desc"),
      color: "text-accent"
    },
    {
      icon: Shield,
      title: t("secure_platform"),
      description: t("secure_platform_desc"),
      color: "text-crypto-blue"
    },
    {
      icon: Users,
      title: t("referral_program"),
      description: t("referral_program_desc"),
      color: "text-primary"
    },
    {
      icon: Zap,
      title: t("instant_payouts"),
      description: t("instant_payouts_desc"),
      color: "text-warning"
    }
  ];

  const stats = [
    { label: t("total_invested"), value: "2.4", icon: DollarSign },
    { label: t("active_users"), value: "15,847", icon: Users },
    { label: t("success_rate"), value: "98.7%", icon: Star },
    { label: t("daily_payouts"), value: "45", icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[url('/images/logo/cb_logo.png')]  bg-center">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>{t("crypto_investment_platform")}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                {t("invest_in_crypto")}{' '}
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  {t("maximize_returns")}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {t("homepage_hero_desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/investment">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t("start_investing")}
                  </Button>
                </Link>
                <Link to="/feedback">
                  <Button size="lg" variant="outline" className="border-border/50 hover:bg-secondary/50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("view_testimonials")}
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-gradient-card border-border/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">
                        <AnimatedNumber value={stat.value} />
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("why_choose_our_platform")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("features_section_desc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Categories Section */}
        <section className="py-20 bg-gradient-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("important_categories")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("important_categories_desc")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Investment */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{t("investment_plans")}</CardTitle>
                    <Badge variant="destructive" className="text-xs">{t("important")}</Badge>
                  </div>
                  <CardDescription>
                    {t("investment_plans_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/investment">
                    <Button className="w-full bg-gradient-primary">
                      {t("view_plans")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-accent" />
                    <CardTitle className="text-xl">{t("user_feedback")}</CardTitle>
                    <Badge variant="destructive" className="text-xs">{t("important")}</Badge>
                  </div>
                  <CardDescription>
                    {t("user_feedback_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/feedback">
                    <Button className="w-full" variant="outline">
                      {t("read_reviews")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Employment */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-6 h-6 text-warning" />
                    <CardTitle className="text-xl">{t("employment")}</CardTitle>
                    <Badge variant="destructive" className="text-xs">{t("important")}</Badge>
                  </div>
                  <CardDescription>
                    {t("employment_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/employment">
                    <Button className="w-full" variant="outline">
                      {t("learn_more")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-crypto border-border/50 shadow-premium">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("ready_to_start_investment_journey")}
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t("cta_desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/investment">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      {t("get_started_now")}
                    </Button>
                  </Link>
                  <Link to="/support">
                    <Button size="lg" variant="outline">
                      {t("contact_support")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;