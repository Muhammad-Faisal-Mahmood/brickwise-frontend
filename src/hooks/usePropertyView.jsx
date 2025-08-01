import { useCallback, useRef } from "react";
import propertyAxios from "../api/propertyAxios";

const usePropertyView = () => {
  const viewedProperties = useRef(new Set());

  const trackPropertyView = useCallback(async (propertyId) => {
    if (!propertyId || viewedProperties.current.has(propertyId)) {
      return;
    }

    try {
      await propertyAxios.post(`/properties/${propertyId}/view`);
      viewedProperties.current.add(propertyId);
      console.log(`Property ${propertyId} view incremented`);
    } catch (error) {
      console.error("Failed to track property view:", error);
      // Silently ignore so it doesn't break the UI
    }
  }, []);

  const getPropertyViews = useCallback(async (propertyId) => {
    try {
      const response = await propertyAxios.get(
        `/properties/${propertyId}/views`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch property views:", error);
      return null;
    }
  }, []);

  return { trackPropertyView, getPropertyViews };
};

export default usePropertyView;
