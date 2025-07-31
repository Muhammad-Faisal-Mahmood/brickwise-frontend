import { useEffect, useState } from "react";
import propertyAxios from "../api/propertyAxios";

const usePropertyDetails = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await propertyAxios.get(`/properties/${propertyId}`);
        // adjust depending on your actual response structure
        setProperty(response.data?.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        setError(err?.response?.data?.message || "Failed to load property");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
};

export default usePropertyDetails;
