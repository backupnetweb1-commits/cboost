import { set } from "date-fns";
import { useAuth } from "./useAuth";
import { useState, useEffect } from "react";

export interface InvestmentPlan {
  id: string;
  name: string;
  amount: number;
  roi: number;
  days: number;
  tier: "starter" | "premium" | "vip";
  features: string[];
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingInvestment, setLoadingInvestment] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [loadingAllInvestment, setLoadingAllInvestment] = useState<boolean>(
    false
  );
  const [allInvestment, setAllInvestment] = useState<any[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
 const [creatingPlan, setCreatingPlan] = useState<boolean>(false);
 const [creatingPlanError, setCreatingPlanError] = useState<string | null>(null);
 const [creatingPlanSuccess, setCreatingPlanSuccess] = useState<boolean>(false);
 const [deletePlanError, setDeletePlanError] = useState<string | null>(null);
 const [deletePlanSuccess, setDeletePlanSuccess] = useState<boolean>(false);
 const [deletinPlanLoading, setDeletingPlanLoading] = useState<boolean>(false);
  // deposit
  const deposit = async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://crypto-invest-backend-1.onrender.com/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, type: "deposit", user: user?.uid }),
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // withdraw
  const withdraw = async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://crypto-invest-backend-1.onrender.com/api/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, type: "withdraw", user: user?.uid }),
        }
      );
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  // make investment
  const makeInvestment = async (planId: string, amount: number) => {
    setLoadingInvestment(true);
    setError(null);
    try {
      const response = await fetch(
        `https://crypto-invest-backend-1.onrender.com/api/v1/make-investment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.uid,
            planId: planId,
            amount: amount,
          }),
        }
      );
      const data = await response.json();
      setLoadingInvestment(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoadingInvestment(false);
      return null;
    }
  };

  // fetch investment plans
  useEffect(() => {
    const fetchInvestmentPlans = async () => {
      try {
        const response = await fetch(
          "https://crypto-invest-backend-1.onrender.com/api/v1/plans",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        // Map backend data into UI shape
        const mappedPlans: InvestmentPlan[] = data.map((p: any) => ({
          id: p._id || p.id,
          name: p.name,
          amount: p.amount,
          roi: p.roi,
          days: p.days,
          tier: p.tier,
          features: p.features || [],
        }));

        setInvestmentPlans(mappedPlans);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchInvestmentPlans();
  }, []);
// fetch in
useEffect(()=>{
  const fetchAllInvestment = async () => {
    setLoadingAllInvestment(true);
    setLoadError(null);
    try {
      const response = await fetch(
        `https://crypto-invest-backend-1.onrender.com/api/v1/all-investments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAllInvestment(data);
      setLoadingAllInvestment(false);
    } catch (err: any) {
      setLoadError(err.message);
      setLoadingAllInvestment(false);
    }

  }

  fetchAllInvestment();
},[])
  // fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://crypto-invest-backend-1.onrender.com/api/v1/transactions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
   // fetchTransactions();
  }, []);

  // delete plan
  const deletePlan = async (planId: string) => {
    setDeletingPlanLoading(true);
    setDeletePlanError(null);
    setDeletePlanSuccess(false);
    try {
      const response = await fetch(
        `https://crypto-invest-backend-1.onrender.com/api/v1/plan/${planId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setDeletingPlanLoading(false);
      setDeletePlanSuccess(true);
      return data;
    } catch (err: any) {
      setDeletingPlanLoading(false);
      setDeletePlanError(err.message);
      return null;
    }
  }

  // create plan

  const createPlan = async (name: string, amount: number, roi: number, days: number, tier: "starter" | "premium" | "vip", features: string[]) => {
   setCreatingPlan(true);
   setCreatingPlanError(null);
   setCreatingPlanSuccess(false);
    try {
      const response = await fetch(
        "https://crypto-invest-backend-1.onrender.com/api/v1/create-plans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            amount,
            roi,
            days,
            tier,
            features,
          }),
        }
      );
      const data = await response.json();
      setCreatingPlan(false);
      setCreatingPlanSuccess(true);
      return data;
    } catch (err: any) {
      setCreatingPlan(false);
      setCreatingPlanError(err.message);
      return null;
    }
  };

  return {
    transactions,
    loading,
    error,
    investmentPlans,
    makeInvestment,
    deposit,
    withdraw,
    loadingInvestment,
    allInvestment,
    loadError,
    loadingAllInvestment,
    createPlan,
    creatingPlan,
    creatingPlanError,
    creatingPlanSuccess,
    deletePlan,
    deletePlanError,
    deletePlanSuccess,
    deletinPlanLoading,
  };
};
