import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ExternalLink, Edit, Trash, Loader2, Calendar, Users, Trash2, Edit2 } from "lucide-react"; // Import Loader2
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Import AlertDialog components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFeedback } from "@/hooks/useFeedback";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";


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

// Helper styles/icons
const getPlatformColor = (platform: Testimonial["platform"]) => {
  switch (platform) {
    case "telegram": return "bg-blue-500";
    case "facebook": return "bg-blue-700";
    case "instagram": return "bg-pink-500";
    case "whatsapp": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

const getPlatformIcon = (platform: Testimonial["platform"]) => {
  switch (platform) {
    case "telegram": return "✈️";
    case "facebook": return "👍";
    case "instagram": return "📸";
    case "whatsapp": return "💬";
    default: return "❓";
  }
};

interface PaidUser {
  id: string;
  name: string;
  amount: number;
  plan: string;
  date: string;
  time: string;
}


const AdminFeedbackManager: React.FC = () => {
  const { testimonials, addTestimonial, isLoading, error, deleteTestimonial, updateTestimonial, updateError, updating, updated, payout, fetchingPayout, payoutError, createPayout, creatingPayout, createPayoutError, deletePayOut, deletingPayout, deletedPayout } = useFeedback();
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [deletingPayoutId, setDeletingPayoutId] = useState(null)
  const [activeTab, setActiveTab] = useState<"view" | "add" | "paidout">("view");
  const [newPayOut, setNewPayOut] = useState<{
    name: string;
    amount: number;
    plan: string;
    date: string;
    time: string;
    proof?: string;
  }>({
    name: "",
    amount: 0,
    plan: "",
    date: new Date().toLocaleDateString(),
    time: "",
    proof: "",
  });
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddPayOut, setIsAddPayOut] = useState(false);

  const { t } = useTranslation();

  // State to track which specific item is being deleted for UI feedback
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  // New feedback form state
  const [newFeedback, setNewFeedback] = useState<Omit<Testimonial, "id">>({
    user: "",
    platform: "telegram",
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    message: "",
    link: "",
    avatar: null,
  });

  // Edit form state
  const [editId, setEditId] = useState<number | null>(null);
  const [editFeedback, setEditFeedback] = useState<Omit<Testimonial, "id" | "date">>({
    user: "",
    platform: "telegram",
    amount: 0,
    message: "",
    link: "",
    avatar: null,
  });

  // Keep local state synced with hook testimonials
  useEffect(() => {
    if (testimonials) {
      setFeedbacks(testimonials);
    }
  }, [testimonials]);

  // --- HANDLERS ---

  // Add feedback handlers
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };
  const handleAddPayOutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPayOut((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPlatformChange = (value: Testimonial["platform"]) => {
    setNewFeedback((prev) => ({ ...prev, platform: value }));
  };

  const handleAdd = async () => {
    if (!newFeedback.user || !newFeedback.message) return;
    try {
      await addTestimonial({ ...newFeedback });
      toast({ title: "Success", description: "New feedback added." });
      setNewFeedback({
        user: "",
        platform: "telegram",
        amount: 0,
        date: new Date().toISOString().slice(0, 10),
        message: "",
        link: "",
        avatar: null,
      });
      setActiveTab("view");
    } catch (err) {
      toast({ title: "Error", description: "Failed to add feedback.", variant: "destructive" });
      console.error(err);
    }
  };

  // Edit handlers
  const startEdit = (fb: Testimonial) => {
    setEditId(fb.id);
    setEditFeedback({
      user: fb.user,
      platform: fb.platform,
      amount: fb.amount,
      message: fb.message,
      link: fb.link,
      avatar: fb.avatar,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFeedback((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleEditPlatformChange = (value: Testimonial["platform"]) => {
    setEditFeedback((prev) => ({ ...prev, platform: value }));
  };

  const handleUpdate = () => {
    if (editId === null || !editFeedback.user || !editFeedback.message) return;
    // NOTE: This updates local state only. You should have a function in your `useFeedback` hook to persist this change.
    setFeedbacks((prev) =>
      prev.map((fb) =>
        fb.id === editId ? { ...fb, ...editFeedback, date: fb.date } : fb
      )
    );
    toast({ title: "Success", description: "Feedback updated locally." });
    setEditId(null);
  };

  const resetEdit = () => setEditId(null);
  const handleCreatePayout = async () => {
    try {
      await createPayout(newPayOut)
      toast({
        description: 'Payout Created Successfully',
        title:'Success'
      })
    } catch (er){
      alert(er)
    }
  }

  // Improved Delete Handler
  const handleDelete = async (id: number) => {
    setIsDeletingId(id);
    try {
      await deleteTestimonial(id);
      toast({
        title: "Success",
        description: "Feedback has been deleted.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete feedback. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsDeletingId(null);
    }
  };
  const handleDeletePayout = async (id:string) => {
    setDeletingPayoutId(id)
    try {
      await deletePayOut(id)
        toast({
        title: "Success",
        description: "Payout has been deleted.",
      });
    } catch (er){
      toast({
        title: "Error",
        description: "Failed to delete feedback. Please try again.",
        variant: "destructive",
      });
    } finally{
      setDeletingPayoutId(null)
    }


  }

  return (
    <div className="p-4 bg-background mt-16 min-h-screen">
      <h3 className="text-2xl font-bold mb-4">Manage Feedback</h3>

      {/* Tabs */}
      <div className="flex mb-4 border-b border-border">
        <button
          onClick={() => {
            setActiveTab("view");
            resetEdit();
          }}
          className={`py-2 px-4 font-semibold text-lg transition-colors duration-300 ${activeTab === "view"
            ? "text-primary border-b-2 border-primary"
            : "text-muted-foreground hover:text-primary"
            }`}
        >
          View/Edit Feedback
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`py-2 px-4 font-semibold text-lg transition-colors duration-300 ${activeTab === "add"
            ? "text-primary border-b-2 border-primary"
            : "text-muted-foreground hover:text-primary"
            }`}
        >
          Add Feedback
        </button>
        <button
          onClick={() => setActiveTab("paidout")}
          className={`py-2 px-4 font-semibold text-lg transition-colors duration-300 ${activeTab === "paidout"
            ? "text-primary border-b-2 border-primary"
            : "text-muted-foreground hover:text-primary"
            }`}
        >
          Pay Out
        </button>
      </div>

      {/* View/Edit Section */}
      {activeTab === "view" && (
        <div className="mt-4">
          {editId !== null ? (
            // Edit Form
            <div className="p-4 bg-muted border rounded-lg shadow-md mt-4">
              <h4 className="font-semibold text-xl mb-2">Edit Feedback</h4>
              <div className="flex flex-col gap-4">
                <Input name="user" placeholder="User" value={editFeedback.user} onChange={handleEditChange} />
                <Select value={editFeedback.platform} onValueChange={handleEditPlatformChange}>
                  <SelectTrigger><SelectValue placeholder="Select a platform" /></SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input name="amount" type="number" placeholder="Amount" value={editFeedback.amount} onChange={handleEditChange} />
                <Textarea name="message" placeholder="Message" value={editFeedback.message} onChange={handleEditChange} />
                <Input name="link" placeholder="Link (optional)" value={editFeedback.link} onChange={handleEditChange} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleUpdate}>Update</Button>
                <Button variant="outline" onClick={resetEdit}>Cancel</Button>
              </div>
            </div>
          ) : (
            // View Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.length === 0 && !isLoading && (
                <Card className="md:col-span-2 lg:col-span-3 border w-full h-[200px] flex justify-center items-center">
                  <p className="text-muted-foreground">No feedback available. Add one!</p>
                </Card>
              )}
              {feedbacks.map((testimonial, index) => (
                <Card key={index} className="bg-muted border shadow-md p-4 space-y-4">
                  <CardHeader className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.user} />
                          <AvatarFallback>
                            {testimonial.user.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{testimonial.user}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getPlatformColor(testimonial.platform)} text-white text-xs`}>
                              {getPlatformIcon(testimonial.platform)}
                              <span className="ml-1 capitalize">{testimonial.platform}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" onClick={() => startEdit(testimonial)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive" disabled={isDeletingId === testimonial.id}>
                              {isDeletingId === testimonial.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the feedback from "{testimonial.user}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(testimonial.id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4">
                    <p className="text-foreground/80 italic">"{testimonial.message}"</p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">${testimonial.amount} received</span>
                      </div>
                      {testimonial.link && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={testimonial.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            See Feedback
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Section */}
      {activeTab === "add" && (
        <div className="p-4 bg-muted border rounded-lg shadow-md">
          <h4 className="font-semibold text-xl mb-2">Add New Feedback</h4>
          <div className="flex flex-col gap-4">
            <Input name="user" placeholder="User" value={newFeedback.user} onChange={handleAddChange} />
            <Select onValueChange={handleAddPlatformChange} value={newFeedback.platform}>
              <SelectTrigger><SelectValue placeholder="Select a platform" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input name="amount" type="number" placeholder="Amount" value={newFeedback.amount} onChange={handleAddChange} />
            <Textarea name="message" placeholder="Message" value={newFeedback.message} onChange={handleAddChange} />
            <Input name="link" placeholder="Link" value={newFeedback.link} onChange={handleAddChange} />
            <Input name="avatar" placeholder="Avatar URL" value={newFeedback.avatar} onChange={handleAddChange} />
          </div>
          <Button onClick={handleAdd} className="mt-4" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : "Add Feedback"}
          </Button>
          {error && <p className="text-red-500 mt-2 text-sm">Error: {error}</p>}
        </div>
      )}
      {
        activeTab === 'paidout' && (
          <Card>
            <CardContent className="p-2">
              <div className="flex flex-col gap-4 w-full justify-center items-end">
                <Button onClick={() => setIsAddPayOut(!isAddPayOut)}>{isAddPayOut ? 'Cancel' : 'Add PaidOut'}</Button>
              </div>
              {
                isAddPayOut && (
                  <div className="flex flex-col gap-4 border rounded-lg shadow-md p-4 w-full mt-2 justify-center items-end">
                    <div className="flex w-full flex-wrap  gap-4">
                      <Input name="name" placeholder="User" value={newPayOut.name} onChange={handleAddPayOutChange} />
                      <Input name="amount" type="number" placeholder="Amount" value={newPayOut.amount} onChange={handleAddPayOutChange} />
                      <Input name="proof" placeholder="Proof" value={newPayOut.proof} onChange={handleAddPayOutChange} />
                      <Button onClick={handleCreatePayout} className="mt-4" disabled={creatingPayout}>
                        {creatingPayout ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : "Add Pay Out"}
                      </Button>
                      {error && <p className="text-red-500 mt-2 text-sm">Error: {createPayoutError}</p>}
                    </div>
                  </div>
                )
              }

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
                            <th className="text-left py-3 px-2">{t('actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                     
                          {payout?.map((user, index) => (
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
                                  <a href={`${user.proof}`} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    {t('proof_of_payout')}
                                  </a>
                                </Button>
                              </td>

                              <td className="py-3 px-2">
                                <Button size="sm" title="Update Pay Out" variant="ghost">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" title="Delete Pay Out" onClick={()=>handleDeletePayout(user.id)} variant="ghost">
                                  {deletingPayoutId == user.id && deletingPayout ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                </Button>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t('total_paid_today_first_15')}</span>
                        <span className="text-xl font-bold text-accent">
                          ${payout?.reduce((sum, user) => sum + user.amount, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )
      }
    </div>
  );
};

export default AdminFeedbackManager;