import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
// + Import new icons for the analytics dashboard
import { DollarSign, Users, TrendingUp, CalendarClock, Loader2, Trash2, Eye } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/use-toast";

// --- TYPE DEFINITIONS ---

export interface InvestmentPlan {
  id: string;
  name: string;
  amount: number;
  roi: number; // Return on Investment in percentage
  days: number;
  tier: "starter" | "premium" | "vip";
  features: string[];
}

export interface UserInvestment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  expectedReturn: number;
  status: "pending" | "active" | "completed";
  currentValue: number;
}

// + Interface for the analytics data
export interface InvestmentAnalytics {
  totalInvestments: number;
  totalAmount: number;
  totalCurrentValue: number;
  avgReturnPercentage: number;
  avgDurationInDays: number;
}


// --- MOCK DATA (replace with API calls) ---

const initialPlans: InvestmentPlan[] = [
  {
    id: "plan1",
    name: "Bronze Starter",
    amount: 500,
    roi: 10,
    days: 30,
    tier: "starter",
    features: ["Basic support", "Weekly reports"],
  },
  {
    id: "plan2",
    name: "Gold Premium",
    amount: 2500,
    roi: 15,
    days: 60,
    tier: "premium",
    features: ["Priority support", "Bi-weekly reports", "Analytics access"],
  },
];

const initialUserInvestments: UserInvestment[] = [
  {
    id: "invest1",
    userId: "user_abc",
    planId: "plan1",
    amount: 500,
    startDate: new Date("2025-09-15"),
    endDate: new Date("2025-10-15"),
    expectedReturn: 550,
    status: "active",
    currentValue: 525,
  },
  {
    id: "invest2",
    userId: "user_xyz",
    planId: "plan2",
    amount: 2500,
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-12-01"),
    expectedReturn: 2875,
    status: "pending",
    currentValue: 2500,
  },
];

const newPlanInitialState: Omit<InvestmentPlan, "id"> = {
  name: "",
  amount: 0,
  roi: 0,
  days: 0,
  tier: "starter",
  features: [],
};

// --- MAIN COMPONENT ---

const AdminInvestmentManager: React.FC = () => {
  // + Add 'analytics' to the list of possible tabs
  const [activeTab, setActiveTab] = useState<"plans" | "investments" | "analytics">("plans");
  const { allInvestment, loadError, loadingAllInvestment, investmentPlans, loading, error, createPlan, creatingPlanError, creatingPlanSuccess, creatingPlan, deletePlan, deletePlanError, deletePlanSuccess, deletinPlanLoading } = useTransactions();
  const { toast, dismiss } = useToast();
  // State for Plans
  const [plans, setPlans] = useState<InvestmentPlan[]>(initialPlans);
  const [newPlan, setNewPlan] = useState(newPlanInitialState);
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [deletingPlanid, setDeletingPlanid] = useState<string | null>(null);

  // State for User Investments
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>(initialUserInvestments);

  // + State for Analytics
  const [analytics, setAnalytics] = useState<InvestmentAnalytics | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const todate = (firestoreObject) => {
    const totalMilliseconds = (firestoreObject._seconds * 1000) + (firestoreObject._nanoseconds / 1000000);
    const dateObject = new Date(totalMilliseconds);
    return dateObject;
  };
  ///set user in
  // --- Effects ---
  useEffect(() => {
    if (allInvestment && !loadingAllInvestment) {
      console.log('All Investment Data//: ', allInvestment)
      const userInvestments = allInvestment.map(investment => {
        const { planId, amount, startDate, endDate, expectedReturn, status, currentValue } = investment;
        const planName = getPlanName(planId);
        return {
          id: investment.id,
          userId: investment.userId,
          planId,
          planName,
          amount,
          startDate,
          endDate,
          expectedReturn,
          status,
          currentValue,
        };
      });
      setUserInvestments(userInvestments);
    }
  }, [allInvestment, loadingAllInvestment])

  // update investments plan data
  useEffect(() => {
    if (investmentPlans && !loading) {
      console.log('Investment Plans Data: ', investmentPlans)
      setPlans(investmentPlans);
    }
  }, [investmentPlans, loading])

  // + Effect to calculate analytics when the component mounts
  useEffect(() => {
    const calculateAnalytics = () => {
      if (userInvestments.length === 0) {
        setAnalytics({
          totalInvestments: 0, totalAmount: 0, totalCurrentValue: 0,
          avgReturnPercentage: 0, avgDurationInDays: 0
        });
        setIsLoadingAnalytics(false);
        return;
      }

      const totalInvestments = userInvestments.length;
      const totalAmount = userInvestments.reduce((acc, curr) => acc + curr.amount, 0);
      const totalCurrentValue = userInvestments.reduce((acc, curr) => acc + curr.currentValue, 0);

      const totalDuration = userInvestments.reduce((acc, curr) => {
        const duration = todate(curr.endDate).getTime() - todate(curr.startDate).getTime();
        return acc + duration;
      }, 0);

      const avgDurationInMs = totalDuration / totalInvestments;
      const avgDurationInDays = Math.round(avgDurationInMs / (1000 * 60 * 60 * 24));

      // Calculate the average return percentage based on current value vs initial amount
      const totalPercentageReturn = userInvestments.reduce((acc, curr) => {
        const percentage = ((curr.currentValue - curr.amount) / curr.amount) * 100;
        return acc + percentage;
      }, 0);
      const avgReturnPercentage = totalPercentageReturn / totalInvestments;

      setAnalytics({
        totalInvestments,
        totalAmount,
        totalCurrentValue,
        avgReturnPercentage,
        avgDurationInDays,
      });
      setIsLoadingAnalytics(false);
    };

    // Simulate an API call delay
    setTimeout(calculateAnalytics, 1000);
  }, [userInvestments]);


  // --- Handlers (remain the same) ---
  const handlePlanInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isNumeric = ["amount", "roi", "days"].includes(name);
    setNewPlan((prev) => ({
      ...prev,
      [name]: isNumeric ? Number(value) : value,
    }));
  };

  const handlePlanFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPlan(prev => ({ ...prev, features: e.target.value.split(',').map(f => f.trim()) }));
  };

  const handlePlanTierChange = (value: InvestmentPlan["tier"]) => {
    setNewPlan((prev) => ({ ...prev, tier: value }));
  };

  const handleAddPlan = async () => {
    if (!newPlan.name || newPlan.amount <= 0 || newPlan.roi <= 0) {
      alert("Please fill all required fields correctly.");
      return;
    }
    await createPlan(newPlan.name, newPlan.amount, newPlan.roi, newPlan.days, newPlan.tier, newPlan.features);
    // const planToAdd: InvestmentPlan = {
    //   id: `plan_${Date.now()}`,
    //   ...newPlan,
    // };
    // setPlans([...plans, planToAdd]);
    setNewPlan(newPlanInitialState); // Reset form
    setIsAddingPlan(false);
  };

  const handleDeletePlan = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      //
      setDeletingPlanid(id);
      await deletePlan(id);
      setPlans(plans.filter((plan) => plan.id !== id));
      setDeletingPlanid(null);
    }

  };


  // --- Investment Management Handlers ---

  console.log('All Investment Data: ', allInvestment)

  const handleStatusChange = (investmentId: string, newStatus: UserInvestment['status']) => {
    setUserInvestments(prev =>
      prev.map(inv =>
        inv.id === investmentId ? { ...inv, status: newStatus } : inv
      )
    );
  };

  // Helper to get plan name from its ID
  const getPlanName = (planId: string) => {
    return plans.find((p) => p.id === planId)?.name || "Unknown Plan";
  };

  const getStatusColor = (status: UserInvestment['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
    }
  }


  return (
    <div className="p-4 md:p-6 mt-16 bg-background min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Investment Management</h2>

      <div>
        {isLoadingAnalytics ? (
          <div className="flex flex-col items-center justify-center h-34">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        ) : analytics ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${analytics.totalAmount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {analytics.totalInvestments} investments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Current Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${analytics.totalCurrentValue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Represents total portfolio worth
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Return</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  +{analytics.avgReturnPercentage.toFixed(2)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average gain on an investment
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Duration</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ~{analytics.avgDurationInDays} Days
                </div>
                <p className="text-xs text-muted-foreground">
                  Average investment lifecycle
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <p>No analytics data available.</p>
        )}
      </div>
      {/* Tab Navigation */}
      <div className="flex mb-4 border-b border-border">
        <button
          onClick={() => setActiveTab("plans")}
          className={`py-2 px-4 font-semibold text-lg transition-colors ${activeTab === "plans"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-primary"
            }`}
        >
          Manage Plans
        </button>
        <button
          onClick={() => setActiveTab("investments")}
          className={`py-2 px-4 font-semibold text-lg transition-colors ${activeTab === "investments"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-primary"
            }`}
        >
          View Investments
        </button>
       
      </div>

      {/* Content Area */}
      <div>
        {activeTab === "plans" && (
          /* Plan Management JSX is unchanged */

          <Card>
            {
              creatingPlanSuccess && (
                <div className="flex items-center justify-center h-6">
                  <div className="flex items-center justify-center text-green-200 h-64">Plan created successfully</div>
                </div>
              )
            }
            {
              creatingPlanError && (
                <div className="flex items-center justify-center h-6">
                  <div className="flex items-center justify-center text-red-200 h-64">Error creating plan</div>
                </div>)
            }
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Investment Plans</CardTitle>
              <Button onClick={() => setIsAddingPlan(!isAddingPlan)}>
                {isAddingPlan ? "Cancel" : "Add New Plan"}
              </Button>
            </CardHeader>
            <CardContent>

              {isAddingPlan && (
                <div className="p-4 border rounded-lg mb-6 space-y-4">
                  <h3 className="text-lg font-semibold">New Plan Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Plan Name (e.g., Gold Premium)" value={newPlan.name} onChange={handlePlanInputChange} required />
                    <Input name="amount" type="number" placeholder="Minimum Amount ($)" value={newPlan.amount > 0 ? newPlan.amount : ''} onChange={handlePlanInputChange} required />
                    <Input name="roi" type="number" placeholder="ROI (%)" value={newPlan.roi > 0 ? newPlan.roi : ''} onChange={handlePlanInputChange} required />
                    <Input name="days" type="number" placeholder="Duration (days)" value={newPlan.days > 0 ? newPlan.days : ''} onChange={handlePlanInputChange} required />
                    <Select onValueChange={handlePlanTierChange} value={newPlan.tier}>
                      <SelectTrigger><SelectValue placeholder="Select a tier" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea placeholder="Features (comma-separated)" value={newPlan.features.join(', ')} onChange={handlePlanFeaturesChange} />
                  <Button onClick={handleAddPlan}>{creatingPlan ? <Loader2 className="h-8 w-8 animate-spin text-primary" /> : 'Save Plan'}</Button>
                </div>
              )}
              {
                deletePlanError && (
                  <div className="flex items-center justify-center h-6">
                    <div className="flex items-center justify-center text-red-200 h-64">Error deleting plan</div>
                  </div>
                )
              }
              {
                deletePlanSuccess && (
                  <div className="flex items-center justify-center h-6">
                    <div className="flex items-center justify-center text-green-200 h-64">Plan deleted successfully</div>
                  </div>
                )
              }
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {
                  plans.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>No investment plans found.</TableCell>
                    </TableRow>
                  )
                }
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell className="capitalize">{plan.tier}</TableCell>
                      <TableCell>${plan.amount.toLocaleString()}</TableCell>
                      <TableCell>{plan.roi}%</TableCell>
                      <TableCell>{plan.days}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleDeletePlan(plan.id)}>{deletingPlanid === plan.id && deletinPlanLoading ? <Loader2 className="h-8 w-8 animate-spin text-primary" /> : (<Trash2 className="text-red-600" />)}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "investments" && (
          /* User Investments JSX is unchanged */
          <Card>
            <CardHeader><CardTitle>Active User Investments</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Expected Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userInvestments.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs">{inv.userId}</TableCell>
                      <TableCell className="font-medium">{getPlanName(inv.planId)}</TableCell>
                      <TableCell>${inv.amount.toLocaleString()}</TableCell>
                      <TableCell>{todate(inv.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{todate(inv.endDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${inv.expectedReturn.toLocaleString()}</TableCell>
                      <TableCell>
                        <Select onValueChange={(value: UserInvestment['status']) => handleStatusChange(inv.id, value)} value={inv.status}>
                          <SelectTrigger className="w-32">
                            <SelectValue>
                              <Badge className={`${getStatusColor(inv.status)} hover:${getStatusColor(inv.status)} capitalize`}>{inv.status}</Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => { }} title="Delete Investment"><Trash2 className="text-red-600" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { }} title="View Investment Details"><Eye /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* ======================= */}
        {/* ANALYTICS TAB         */}
        {/* ======================= */}

      </div>
    </div>
  );
};

export default AdminInvestmentManager;