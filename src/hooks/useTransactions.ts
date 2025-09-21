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

  // fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://crypto-invest-backend-1.onrender.com/api/transactions",
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
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    investmentPlans,
    makeInvestment,
    deposit,
    withdraw,
    loadingInvestment,
  };
};
