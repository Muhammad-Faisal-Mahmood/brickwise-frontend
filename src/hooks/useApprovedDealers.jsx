import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useApprovedDealers = (page, size, keyword) => {
  const [dealers, setDealers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDealers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/admin/dealers", {
          params: { page, size, keyword },
        });
        setDealers(res.data?.data?.content || []);
        setTotalElements(res.data?.data?.totalElements || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch dealers");
      } finally {
        setLoading(false);
      }
    };
    fetchDealers();
  }, [page, size, keyword]);

  return { dealers, totalElements, loading, error };
};

export default useApprovedDealers;
