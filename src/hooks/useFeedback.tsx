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

  // Fetch the testimonials when the component mounts.
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]); // The dependency is a stable function thanks to useCallback.

  return { testimonials, isLoading, error, addTestimonial };
};