import { set } from "date-fns";
import { platform } from "os";
import { useEffect, useState, useCallback } from "react";

// Base URL for the API, making it easier to manage and change.
const API_URL = "https://crypto-invest-backend-1.onrender.com/api/v1/feedbacks";

/**
 * Represents the structure of a testimonial object.
 */
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

// For the `addTestimonial` function, we don't need the server-generated fields.
type NewTestimonial = Omit<Testimonial, 'id' | 'date'>;

/**
 * A custom hook to manage fetching and posting user feedback/testimonials.
 * @returns An object with the list of testimonials, loading state, error state, and a function to add a new testimonial.
 */
export const useFeedback = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [fetchingPayout, setFetchingPayout] = useState(false);
  const [payout, setPayout] = useState<number | null>(null);
  const [payoutError, setPayoutError] = useState<string | null>(null);
  const [creatingPayout, setCreatingPayout] = useState(false);
  const [createdPayout, setCreatedPayout] = useState(false);
  const [createPayoutError, setCreatePayoutError] = useState<string | null>(null);
  const [deletingPayout, setDeletingPayout] = useState(false)
  const [deletedPayout, setDeletedPayout]  = useState(false)

  /**
   * Fetches testimonials from the API.
   * Wrapped in useCallback to prevent re-creation on every render.
   */
  const fetchTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Assuming the API returns data in a { data: [...] } structure
      setTestimonials(data.data || []); 
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Posts a new testimonial to the API and then refreshes the list.
   * @param testimonial - The new testimonial data to be added.
   */
  const addTestimonial = useCallback(async (testimonial: NewTestimonial) => {
    setIsLoading(true);
    setError(null);

    console.log(testimonial)

    const payload = {
      id: `ID${Date.now().toString()}`,
      user: testimonial.user,
      platform:testimonial.platform,
      amount:testimonial.amount,
      date: Date.now().toString(),
      message:testimonial.message,
      link:testimonial.link,
      avatar:testimonial.avatar
    }

    console.log('HHHHHHHHH',payload)
    try {
      const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/v1/feedback', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to post testimonial. Status: ${response.status}`);
      }

      
      // On success, refetch the entire list to ensure data consistency.
      await fetchTestimonials(); 

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add testimonial.");
      // In case of error, we still need to stop the loading indicator.
      setIsLoading(false);
    }
  }, [fetchTestimonials]); // Depends on the stable fetchTestimonials function
  // update testimonial
  const updateTestimonial = async (testimonial: Testimonial) => {
    setUpdating(true);
    setUpdateError(null);
    console.log('updateTestimonial')
    console.log(testimonial)
    try {
      const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/v1/feedback`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonial),
      });
      if (!response.ok) {
        throw new Error(`Failed to update testimonial. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Updated Successfully',data)
      setUpdating(false);
      setUpdated(true);
      // On success, refetch the entire list to ensure data consistency.
      await fetchTestimonials();
    } catch (err) {
      setUpdateError(err instanceof Error ? err.message : "Failed to update testimonial.");
      // In case of error, we still need to stop the loading indicator.
      setUpdating(false);
    }
  }
    

  // deletetestimonial
  const deleteTestimonial = async (id: number) => {
    setDeleting(true);
    setDeleteError(null);
    console.log('deleteTestimonial')
    console.log(id)
    try {
      const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/v1/feedback/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete testimonial. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Deleted Successfully',data)
      setDeleting(false);
      setDeleted(true);
      // On success, refetch the entire list to ensure data consistency.
      await fetchTestimonials();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete testimonial.");
      // In case of error, we still need to stop the loading indicator.
      setDeleting(false);
    }
  }
// fetch payout
const fetchPayout = async () => {
  setFetchingPayout(true);
  setPayoutError(null);
  try {

    const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/v1/paidoutusers',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    if (!response.ok) {
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')

      throw new Error(`Failed to fetch payout. Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Payout ///////////////////////',data.data)
    setPayout(data.data);
    setFetchingPayout(false);
    } catch (err) {
      setFetchingPayout(false)
      setPayoutError(err instanceof Error ? err.message : "Failed to fetch payout.")

    }
    
}

const createPayout = async (payload) => {
  setCreatingPayout(true);
  setCreatePayoutError(null);
  console.log('createPayout', payload)
  try {
    const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/v1/paidoutuser',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    if (!response.ok) {
      throw new Error(`Failed to create payout. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created Payout',data)
    setCreatingPayout(false);
    setCreatedPayout(true);
    } catch (err) {
      setCreatingPayout(false)
      setCreatePayoutError(err instanceof Error ? err.message : "Failed to create payout.")
      }

}

// delete payment

const deletePayOut = async (id: string) => {
  setDeletingPayout(true)
  setDeleteError(null)
  try {
    const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/v1/paidoutuser/${id}`,
      {
        method: 'DELETE',
        headers :{
             "Content-Type": "application/json",
 
        }
      }
    )

    if(!response.ok){
      throw Error('Error deleting payout')
    }
  setDeletingPayout(false)
  setDeletedPayout(true)
  return true;
  } catch (er){
    setCreatePayoutError(er)
    setDeletingPayout(false)
    setDeletedPayout(false)
    return false;
  }

}



  // Fetch the testimonials when the component mounts.
  useEffect(() => {
    fetchTestimonials();
    fetchPayout();
  }, [fetchTestimonials]); // The dependency is a stable function thanks to useCallback.

  return { testimonials, isLoading, error, addTestimonial, deleteTestimonial, deleting, deleted, deleteError, updateTestimonial, updating, updated, updateError, payout, fetchingPayout, payoutError, createPayout, creatingPayout, createdPayout, createPayoutError, deletePayOut, deletingPayout, deletedPayout };
};