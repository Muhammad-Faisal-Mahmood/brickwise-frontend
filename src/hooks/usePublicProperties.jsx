import { useDispatch } from "react-redux";
import { setProperties } from "../redux/features/propertySlice";
import axios from "axios";
import propertyAxios from "../api/propertyAxios";

export const usePublicProperties = () => {
  const dispatch = useDispatch();

  const fetchProperties = async (filters = {}) => {
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.location) params.location = filters.location;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.searchQuery) params.search = filters.searchQuery;

      const res = await propertyAxios.get("/properties/public", { params });
      // adjust if backend returns differently
      dispatch(setProperties(res.data.data.content)); // content is the page list
    } catch (e) {
      console.error("Failed to fetch properties", e);
    }
  };

  return { fetchProperties };
};
