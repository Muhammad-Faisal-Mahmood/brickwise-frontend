import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useAdminUsers = (page, size, keyword) => {
  const [users, setUsers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/admin/users`, {
          params: { page, size, keyword },
        });
        setUsers(res.data?.data?.content || []);
        setTotalElements(res.data?.data?.totalElements || 0);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, size, keyword]);

  return { users, totalElements, loading, error };
};

export default useAdminUsers;
