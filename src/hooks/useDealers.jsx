// src/hooks/useDealers.js
import { useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import {
  setDealers,
  appendDealers,
  setLoading,
  setHasMore,
  setPage,
  setDealerFilters,
  setError, // Good to have this for error handling
} from "../redux/features/dealerSlice";
import { selectFilteredDealers } from "../redux/features/dealerSlice";
import axiosInstance from "../api/axiosInstance";

const useDealers = () => {
  const dispatch = useDispatch();
  const dealers = useSelector(selectFilteredDealers);
  const { page, hasMore, loading, filters } = useSelector(
    (state) => state.dealers
  );

  const fetchDealers = async (reset = false) => {
    // Only fetch if not already loading to prevent duplicate requests
    if (loading) return;

    dispatch(setLoading(true));
    dispatch(setError(null)); // Clear previous errors

    try {
      const currentPage = reset ? 0 : page; // Determine the page number for the request
      const res = await axiosInstance.get("/dealer", {
        // Make sure your API endpoint matches the backend (e.g., /api/dealers)
        params: {
          page: currentPage,
          size: 10,
          minRating: filters.minRating,
          maxReviews: filters.maxReviews, // Add maxRating if your backend supports it and you have it in filters
          city: filters.city || null,
        },
      });

      const content = res.data?.content || [];
      const totalPages = res.data?.totalPages; // Assuming backend sends totalPages or similar
      const lastPage = res.data?.last; // Boolean from backend

      if (reset) {
        dispatch(setDealers(content));
        dispatch(setPage(1)); // Start next page from 1 if resetting
      } else {
        dispatch(appendDealers(content));
        dispatch(setPage(page + 1));
      }
      dispatch(setHasMore(!lastPage)); // Update hasMore based on backend's 'last' property
    } catch (e) {
      console.error("Failed to fetch dealers:", e);
      dispatch(setError(e.message || "An unknown error occurred")); // Dispatch error state
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --- New useEffect Hook ---
  useEffect(() => {
    // This effect runs once when the component mounts
    // and whenever 'filters' change (e.g., when a filter is applied).
    // It's crucial to call fetchDealers(true) here to load the initial data
    // or re-load data when filters change.
    fetchDealers(true);
  }, [filters, dispatch]); // Dependency array: re-run when filters or dispatch changes.
  // dispatch is stable, so effectively it's filters.

  // Apply filters (reset page)
  const applyFilters = (newFilters) => {
    // Merge new filters with existing ones
    const updatedFilters = { ...filters, ...newFilters };

    // Prevent unnecessary API calls if filters haven't actually changed
    if (JSON.stringify(filters) !== JSON.stringify(updatedFilters)) {
      dispatch(setDealerFilters(newFilters)); // This reducer already sets page to 0 and hasMore to true
      // fetchDealers(true); // No need to call here directly, useEffect will react to filters change
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchDealers(false); // Do not reset for loadMore
    }
  };

  return {
    dealers,
    hasMore,
    loading,
    loadMore,
    applyFilters,
    filters,
  };
};

export default useDealers;
