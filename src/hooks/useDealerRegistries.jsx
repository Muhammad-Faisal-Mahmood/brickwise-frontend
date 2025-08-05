import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useDealerRegistries = (page, size, keyword, refreshKey) => {
  const [registries, setRegistries] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistries = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/admin/dealer-registries", {
          params: { page, size, keyword },
        });
        setRegistries(res.data?.data?.content || []);
        setTotalElements(res.data?.data?.totalElements || 0);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch dealer applications"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRegistries();
  }, [page, size, keyword, refreshKey]);

  return { registries, totalElements, loading, error };
};

export default useDealerRegistries;
