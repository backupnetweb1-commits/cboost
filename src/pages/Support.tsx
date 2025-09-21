import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import { useContact } from "@/hooks/useContact";

const Support = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendContact, loading, error, success } = useContact();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    sendContact({
      fullName: formData.name,
      email: formData.email,
      whatsappNumber: formData.whatsapp,
      subject: formData.subject,
      message: formData.message
    });
    console.log("Support form submitted:", formData);
  };

  const supportChannels = [
    {
      name: t("telegram_support"),
      description: t("join_telegram_group"),
      icon: "TG",
      color: "bg-blue-500",
      link: "https://t.me/support"
    }
  ];

  const faqItems = [
    {
      question: t("faq_how_start_investing"),
      answer: t("faq_how_start_investing_answer")
    },
    {
      question: t("faq_when_receive_roi"),
      answer: t("faq_when_receive_roi_answer")
    },
    {
      question: t("faq_is_investment_secure"),
      answer: t("faq_is_investment_secure_answer")
    },
    {
      question: t("faq_withdraw_early"),
      answer: t("faq_withdraw_early_answer")
    }
  ];

  useEffect(() => {
    if (success) {
      // Reset form after successful submission
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        subject: "",
        message: ""
      });
    }
  }, [success]);

  // set isSubmitted to true if success is false after count of 5 seconds
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  }, [success]);

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Card className="bg-gradient-card border-border/50 shadow-premium">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  {t("thank_you_for_contacting")}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {t("support_request_submitted")}
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {t("get_immediate_help")}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {supportChannels.map((channel) => (
                        <Button
                          key={channel.name}
                          variant="outline"
                          className="h-16 flex-col space-y-2"
                          asChild
                        >
                          <a href={channel.link} target="_blank" rel="noopener noreferrer">
                            <div className={`w-6 h-6 ${channel.color} rounded text-white text-xs flex items-center justify-center`}>
                              {channel.icon}
                            </div>
                            <span className="text-sm">{channel.name.split(' ')[0]}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {t("quick_links")}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <a href="/feedback">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {t("feedback_group")}
                        </a>
                      </Button>
                      <Button className="bg-gradient-primary hover:shadow-glow" asChild>
                        <a href="/investment">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("investment_plans")}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>{t("support_center")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t("how_can_we_help")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("support_hero_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>{t("contact_support")}</span>
                  </CardTitle>
                  <CardDescription>
                    {t("contact_support_desc")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("full_name")} *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("your_full_name")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("email_address")} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("your_email")}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          {t("email_help_text")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">{t("whatsapp_number")} ({t("optional")})</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder={t("whatsapp_placeholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("subject")} *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t("subject_placeholder")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("message")} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("message_placeholder")}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow" size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {loading ? t("sending") : t("send_message")}
                    </Button>
                  </form>
                  {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
                  {success && <p className="text-sm text-green-500 mt-4">{t("message_sent_successfully")}</p>}
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="bg-gradient-card border-border/50 mt-8">
                <CardHeader>
                  <CardTitle>{t("frequently_asked_questions")}</CardTitle>
                  <CardDescription>{t("faq_quick_answers")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-subtle rounded-lg border border-border/30">
                      <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Support Channels */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>{t("direct_support_channels")}</CardTitle>
                  <CardDescription>{t("get_instant_help_social")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportChannels.map((channel) => (
                    <Button
                      key={channel.name}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${channel.color} rounded text-white text-sm flex items-center justify-center flex-shrink-0`}>
                            {channel.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{channel.name}</div>
                            <div className="text-xs text-muted-foreground">{channel.description}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-auto" />
                        </div>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-crypto border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{t("response_times")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("email_support")}</span>
                    <Badge variant="outline">24-48 {t("hours")}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("live_chat")}</span>
                    <Badge variant="default">{t("instant")}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{t("social_media")}</span>
                    <Badge variant="outline">2-6 {t("hours")}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>{t("support_hours")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("monday_friday")}</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("weekend")}</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("emergency")}</span>
                      <span className="font-medium">{t("always_available")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;