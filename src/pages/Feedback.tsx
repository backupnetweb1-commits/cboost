import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Calendar, DollarSign, Users, MessageSquare, Edit, Plus } from "lucide-react";
import Layout from "@/components/Layout";
import { useFeedback } from "@/hooks/useFeedback";

interface Testimonial {
  id: number;
  user: string;
  platform: "telegram" | "facebook" | "instagram" | "whatsapp";
  amount: number;
  date: string;
  message: string;
  link: string;
  avatar: string;
}

interface PaidUser {
  id: any;
  name: string;
  amount: number;
  plan: string;
  date: string;
  time: string;
}

const Feedback = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const { isLoading, error, testimonials:feedback , payout, fetchingPayout, payoutError} = useFeedback();

  const testimonials:Testimonial[] = feedback || [
    {
      id: 1,
      user: "John Mitchell",
      platform: "telegram",
      amount: 150,
      date: "2024-01-15",
      message: t("testimonial_1"),
      link: "https://t.me/feedback/123",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      user: "Sarah Johnson",
      platform: "facebook",
      amount: 750,
      date: "2024-01-14",
      message: t("testimonial_2"),
      link: "https://facebook.com/post/456",
      avatar: "/placeholder.svg"
    }
  ];

  console.log('FeeeeeeeeeeeeeeeeBbbbbbbbbbbbbbbbbaaaaaaaaaaaaacccccccccccccckkkkkkkkkk',feedback)

  const todaysPaidUsers: PaidUser[] = payout || [
    { id: 1, name: "Alex Thompson", amount: 175, plan: "Plan 2", date: "2024-01-16", time: "09:15 AM" },
    { id: 2, name: "Maria Garcia", amount: 1150, plan: "Plan 4", date: "2024-01-16", time: "09:32 AM" },
    { id: 3, name: "David Kim", amount: 75, plan: "Plan 1", date: "2024-01-16", time: "10:07 AM" },
    { id: 4, name: "Lisa Wang", amount: 600, plan: "Plan 3", date: "2024-01-16", time: "10:23 AM" },
    { id: 5, name: "Robert Brown", amount: 2600, plan: "Plan 5", date: "2024-01-16", time: "10:45 AM" },
    { id: 6, name: "Jennifer Davis", amount: 125, plan: "Plan 2", date: "2024-01-16", time: "11:12 AM" },
    { id: 7, name: "Michael Wilson", amount: 5250, plan: "Plan 6", date: "2024-01-16", time: "11:38 AM" },
    { id: 8, name: "Amanda Taylor", amount: 550, plan: "Plan 3", date: "2024-01-16", time: "12:05 PM" },
    { id: 9, name: "Chris Anderson", amount: 10500, plan: "Plan 7", date: "2024-01-16", time: "12:27 PM" },
    { id: 10, name: "Jessica Moore", amount: 200, plan: "Plan 2", date: "2024-01-16", time: "12:54 PM" },
    { id: 11, name: "Ryan Jackson", amount: 1200, plan: "Plan 4", date: "2024-01-16", time: "01:18 PM" },
    { id: 12, name: "Nicole White", amount: 800, plan: "Plan 3", date: "2024-01-16", time: "01:42 PM" },
    { id: 13, name: "Kevin Harris", amount: 3150, plan: "Plan 5", date: "2024-01-16", time: "02:09 PM" },
    { id: 14, name: "Rachel Martin", amount: 425, plan: "Plan 3", date: "2024-01-16", time: "02:35 PM" },
    { id: 15, name: "Brandon Lee", amount: 7200, plan: "Plan 6", date: "2024-01-16", time: "03:01 PM" }
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "telegram": return "bg-blue-500";
      case "facebook": return "bg-blue-600";
      case "instagram": return "bg-pink-500";
      case "whatsapp": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram": return "TG";
      case "facebook": return "FB";
      case "instagram": return "IG";
      case "whatsapp": return "WA";
      default: return "??";
    }
  };
if(error || payoutError){
  return (
    <Layout>
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">{error || payoutError}</p>
          {/* <Button onClick={() => addTestimonial({})}>Try Again</Button> */}
        </div>
      </div>
      </Layout>
  )
}

 if (isLoading || fetchingPayout  ) {
    return (
      <Layout>
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your userTestimonial...</p>
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
              <span>{t('user_feedback_testimonials')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('what_our_users_say')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('real_feedback_desc')}
            </p>
          </div>

          {/* Admin Controls */}
          {/* <div className="flex justify-end mb-6">
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className="mr-2"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? t('save_changes') : t('edit_mode')}
            </Button>
            {isEditing && (
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                {t('add_testimonial')}
              </Button>
            )}
          </div> */}

          {/* User Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t('success_stories_testimonials')}
            </h2>
            {
                testimonials.length === 0 && (  
                  <div className="text-center border w-full border-border/50 rounded-md p-8">
                    <p className="text-muted-foreground">{t('no_testimonials_yet')}</p>
                    {isEditing && (
                      <Button size="sm" variant="outline" onClick={() => {}}>
                        {t('add_testimonial')}
                      </Button>
                    )}
                  </div>
                )
              }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.user} />
                          <AvatarFallback>{testimonial.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{testimonial.user}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getPlatformColor(testimonial.platform)} text-white text-xs`}>
                              {getPlatformIcon(testimonial.platform)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                          </div>
                        </div>
                      </div>
                      {isEditing && (
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground italic">"{testimonial.message}"</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-accent">${testimonial.amount} {t('received')}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://etherscan.io/tx/0x${testimonial.id}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {t('evidence_of_withdrawal')}
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={testimonial.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {t('see_feedback')}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Today's Payouts */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                {t('todays_payouts_first_15_users')}
              </h2>
              {isEditing && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    {t('edit_list')}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {t('view_history')}
                  </Button>
                </div>
              )}
            </div>
            
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{t('live_payout_record', { date: 'January 16, 2024' })}</span>
                </CardTitle>
                <CardDescription>
                  {t('real_time_roi_payments')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left py-3 px-2">#</th>
                        <th className="text-left py-3 px-2">{t('user')}</th>
                        <th className="text-left py-3 px-2">{t('amount')}</th>
                        {/* <th className="text-left py-3 px-2">{t('plan')}</th> */}
                        {/* <th className="text-left py-3 px-2">{t('time')}</th> */}
                        <th className="text-left py-3 px-2">{t('proof')}</th>
                        {isEditing && <th className="text-left py-3 px-2">{t('actions')}</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {todaysPaidUsers.map((user, index) => (
                        <tr key={user.id} className="border-b border-border/20 hover:bg-accent/5">
                          <td className="py-3 px-2 font-mono text-sm">{index + 1}</td>
                          <td className="py-3 px-2 font-medium">{user.name}</td>
                          <td className="py-3 px-2">
                            <span className="font-semibold text-accent">${user.amount}</span>
                          </td>
                          {/* <td className="py-3 px-2">
                            <Badge variant="outline">{user.plan}</Badge>
                          </td> */}
                          {/* <td className="py-3 px-2 text-sm text-muted-foreground">{user.time}</td> */}
                          <td className="py-3 px-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={`${user?.proof}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {t('proof_of_payout')}
                              </a>
                            </Button>
                          </td>
                          {isEditing && (
                            <td className="py-3 px-2">
                              <Button size="sm" variant="ghost">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('total_paid_today_first_15')}</span>
                    <span className="text-xl font-bold text-accent">
                      ${todaysPaidUsers.reduce((sum, user) => sum + user.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <Card className="bg-gradient-crypto border-border/50 shadow-premium">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                {t('join_feedback_communities')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" size="lg" className="h-16 flex-col space-y-2">
                  <div className="w-6 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">TG</div>
                  <span>{t('telegram')}</span>
                </Button>
                <Button variant="outline" size="lg" className="h-16 flex-col space-y-2">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">FB</div>
                  <span>{t('facebook')}</span>
                </Button>
                <Button variant="outline" size="lg" className="h-16 flex-col space-y-2">
                  <div className="w-6 h-6 bg-pink-500 rounded text-white text-xs flex items-center justify-center">IG</div>
                  <span>{t('instagram')}</span>
                </Button>
                <Button variant="outline" size="lg" className="h-16 flex-col space-y-2">
                  <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center">WA</div>
                  <span>{t('whatsapp')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;