import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useAdminBlacklistedDealers = (page, pageSize, keyword, refreshKey) => {
  const [dealers, setDealers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlacklistedDealers = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get("/admin/blacklisted-dealers", {
          params: { page, size: pageSize, keyword },
        });
        setDealers(data.data.content || []);
        setTotalElements(data.data.totalElements || 0);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch blacklisted dealers"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlacklistedDealers();
  }, [page, pageSize, keyword, refreshKey]);

  return { dealers, totalElements, loading, error };
};

export default useAdminBlacklistedDealers;
