import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { message } from "antd";

const useDealerProfile = (dealerId) => {
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postingReview, setPostingReview] = useState(false);
  const [error, setError] = useState(null); // <-- new

  const fetchDealerProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`/dealer/profile/${dealerId}`);
      setDealer(res.data?.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch dealer profile:", error);
      setDealer(null);
      setError("Dealer not found");
    } finally {
      setLoading(false);
    }
  };

  const postReview = async (reviewText, rating) => {
    setPostingReview(true);
    try {
      await axiosInstance.post(`/dealer/${dealerId}/review`, {
        comment: reviewText,
        rating,
      });
      message.success("Review posted!");
      await fetchDealerProfile(); // refresh
    } catch (error) {
      console.error("Failed to post review:", error);
      message.error("Failed to post review.");
    } finally {
      setPostingReview(false);
    }
  };

  useEffect(() => {
    if (dealerId) fetchDealerProfile();
  }, [dealerId]);

  return { dealer, loading, postingReview, postReview, error };
};

export default useDealerProfile;
