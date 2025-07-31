// src/hooks/usePaginatedProperties.js
import { useEffect, useState } from "react";
import propertyAxios from "../api/propertyAxios";

/**
 * General paginated properties hook.
 * @param endpoint - API endpoint like '/properties/admin' or '/properties/my-properties'
 * @param params - object: { listed, keyword, etc }
 */
const usePaginatedProperties = (
  endpoint,
  page = 0,
  size = 10,
  params = {},
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
        const res = await propertyAxios.get(endpoint, {
          params: { page, size, ...params },
        });
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
  }, [endpoint, page, size, JSON.stringify(params), refreshKey]);

  return { properties, totalElements, loading, error };
};

export default usePaginatedProperties;
