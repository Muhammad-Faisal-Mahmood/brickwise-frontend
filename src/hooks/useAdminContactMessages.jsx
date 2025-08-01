import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useAdminContactMessages = (page, size, search, queryType, refreshKey) => {
  const [messages, setMessages] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get("/contact-us/admin", {
          params: { page, size, search, queryType },
        });
        setMessages(res.data?.data?.content || []);
        setTotalElements(res.data?.data?.totalElements || 0);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [page, size, search, queryType, refreshKey]);

  return { messages, totalElements, loading, error };
};

export default useAdminContactMessages;
