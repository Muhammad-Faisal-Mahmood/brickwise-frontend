import { useEffect, useState } from "react";
import propertyAxios from "../api/propertyAxios";

/**
 * Custom hook to fetch admin properties with pagination, optional listed filter, and search keyword.
 */
const useAdminProperties = (
  page = 0,
  size = 10,
  listed = null,
  keyword = "",
  refreshKey = 0
) => {
  const [properties, setProperties] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = { page, size };
        if (listed !== null) params.listed = listed;
        if (keyword) params.keyword = keyword; // future ready

        const res = await propertyAxios.get("/properties/admin", { params });
        setProperties(res.data.data.content || []);
        setTotalElements(res.data.data.totalElements || 0);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, size, listed, keyword, refreshKey]);

  return { properties, totalElements, loading, error };
};

export default useAdminProperties;
