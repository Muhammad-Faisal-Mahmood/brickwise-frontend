// src/hooks/useProperties.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProperties,
  appendProperties,
  setLoading,
  setHasMore,
  setPage,
  setPropertyFilters,
  setError,
} from "../redux/features/propertySlice";
import { selectFilteredProperties } from "../redux/features/propertySlice";
import propertyAxios from "../api/propertyAxios";

const usePublicProperties = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectFilteredProperties);
  const { page, hasMore, loading, filters } = useSelector(
    (state) => state.properties
  );

  const fetchProperties = async (reset = false) => {
    if (loading) return;

    dispatch(setLoading(true));
    dispatch(setError(null)); // Clear previous errors

    try {
      const currentPage = reset ? 0 : page;
      const params = {
        page: currentPage,
        size: 10, // Adjust page size as needed
      };

      // Only add filter parameters that have actual values
      if (filters.type) params.type = filters.type;
      if (filters.location) params.location = filters.location;
      if (filters.minPrice != null) params.minPrice = filters.minPrice;
      if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
      if (filters.minSize != null) params.minSize = filters.minSize;
      if (filters.maxSize != null) params.maxSize = filters.maxSize;
      if (filters.bedrooms != null) params.bedrooms = filters.bedrooms;
      if (filters.bathrooms != null) params.bathrooms = filters.bathrooms;
      if (filters.floors != null) params.floors = filters.floors;
      if (filters.purpose) params.purpose = filters.purpose;

      // Boolean filters: only send if explicitly true
      if (filters.newConstruction === true) params.newConstruction = true;
      if (filters.petFriendly === true) params.petFriendly = true;
      if (filters.swimmingPool === true) params.swimmingPool = true;

      // Note: searchQuery is handled on frontend, not sent to backend

      console.log("Sending filters to backend:", params);

      const res = await propertyAxios.get("/properties/public", { params });

      const content = res.data?.data?.content || [];
      const lastPage = res.data?.data?.last; // Boolean from backend

      if (reset) {
        dispatch(setProperties(content));
        dispatch(setPage(1)); // Start next page from 1 if resetting
      } else {
        dispatch(appendProperties(content));
        dispatch(setPage(page + 1));
      }

      dispatch(setHasMore(!lastPage)); // Update hasMore based on backend's 'last' property
    } catch (e) {
      console.error("Failed to fetch properties:", e);
      dispatch(setError(e.message || "An unknown error occurred"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Effect runs when filters change
  useEffect(() => {
    fetchProperties(true);
  }, [filters, dispatch]);

  // Apply filters (reset page)
  const applyFilters = (newFilters) => {
    // Base filters with all values set to null (or default values like "")
    const baseFilters = {
      location: null,
      type: null,
      minPrice: null,
      maxPrice: null,
      minSize: null,
      maxSize: null,
      bedrooms: null,
      bathrooms: null,
      floors: null,
      newConstruction: null,
      petFriendly: null,
      swimmingPool: null,
      searchQuery: "",
      purpose: null,
    };

    // Override base with new filters
    const updatedFilters = {
      ...baseFilters,
      ...newFilters,
    };

    console.log("updated filters", updatedFilters);

    // Prevent unnecessary API calls if filters haven't actually changed
    if (JSON.stringify(filters) !== JSON.stringify(updatedFilters)) {
      dispatch(setPropertyFilters(updatedFilters));
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProperties(false); // Do not reset for loadMore
    }
  };

  return {
    properties,
    hasMore,
    loading,
    loadMore,
    applyFilters,
    filters,
  };
};

export default usePublicProperties;
