import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

// It's good practice to define constants for values that don't change.
const API_BASE_URL = "https://crypto-invest-backend-1.onrender.com/api";

// A more descriptive name for the hook.
export const useUserDb = () => {
  const { user } = useAuth();

  // Consolidating related data into a single state object can be cleaner.
  const [data, setData] = useState({
    referrals: null,
    investments: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If there is no user, we shouldn't try to fetch data.
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch.
      setError(null); // Clear any previous errors.

      try {
        console.log(`${API_BASE_URL}/v1/user-investments/${user.uid}`)
        // Use Promise.all to fetch both endpoints concurrently for better performance.
        const [referralsRes, investmentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/referrals/user/${user.uid}`),
          fetch(`${API_BASE_URL}/v1/user-investments/${user.uid}`),
        ]);

        

        // A single check for both responses.
        if (!referralsRes.ok || !investmentsRes.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const referralsData = await referralsRes.json();
        const investmentsData = await investmentsRes.json();
         console.log(investmentsData)
        setData({
          referrals: referralsData,
          investments: investmentsData,
        });

      } catch (err) {
        setError(err);
      } finally {
        // The `finally` block ensures loading is set to false
        // whether the fetch succeeds or fails.
        setIsLoading(false);
      }
    };

    fetchAllData();

    // The effect should re-run if the `user` object changes.
  }, [user]);

  return {
    referralData: data.referrals,
    investmentData: data.investments,
    isLoading,
    error,
  };
};