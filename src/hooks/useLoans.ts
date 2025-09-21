import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { set } from "date-fns";



export interface Loantype {
  loan_id: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  duration: number;
}

export const useLoans = () => {
    const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numberOfReferrals, setNumberOfReferrals] = useState(0);
  const [loanLoading, setLoanLoading] = useState(false);

  const looanRequest = async (loans: Loantype) => {
    setLoanLoading(true);
    try {
      const response = await fetch(
        `https://crypto-invest-backend-1.onrender.com/api/loan/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...loans,
            user_id: user.uid,
          }),
        }
      );
      const data = await response.json();
      console.log(data)
      setLoans(data);
    setLoanLoading(false);    } catch (error) {
      setError(error);
      setLoanLoading(false);
    }
  };

  useEffect(() => {
    // const fetchLoans = async () => {
    //   try {
    //     const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/loans/${}/${}`);
    //     const data = await response.json();
    //     setLoans(data);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // };
   // fetchLoans();
  }, []);

  useEffect(() => {
    const fetchReferrals = async () => {
        setLoading(true);
        const code = user['referralCode'];
      try {
        if (!code) {
          setNumberOfReferrals(0);
          setLoading(false);
          return;
        }
        console.log('codeeeeeeeeeeeeeeeeeeeee',code)
        const response = await fetch(
              `https://crypto-invest-backend-1.onrender.com/api/referrals/code/${code}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }

        );
        const data = await response.json();
        console.log(data)
        if(data.message === "Referral not found"){
            setNumberOfReferrals(0);
        } else {
        setNumberOfReferrals(data.referredUsers.length);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchReferrals();
  }, [user]);

  return { loading, error, loanLoading, numberOfReferrals, looanRequest, loans };

}   
