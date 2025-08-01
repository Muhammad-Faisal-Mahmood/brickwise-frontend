import { useDispatch } from "react-redux";
import { setProperties } from "../redux/features/propertySlice";
import axios from "axios";
import propertyAxios from "../api/propertyAxios";

export const usePublicProperties = () => {
  const dispatch = useDispatch();

  const fetchProperties = async (filters = {}) => {
    try {
      const params = {};

      // Only add parameters that have actual values
      if (filters.type) params.type = filters.type;
      if (filters.location) params.location = filters.location;
      if (filters.minPrice != null) params.minPrice = filters.minPrice;
      if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
      if (filters.minSize != null) params.minSize = filters.minSize;
      if (filters.maxSize != null) params.maxSize = filters.maxSize;
      if (filters.bedrooms != null) params.bedrooms = filters.bedrooms;
      if (filters.bathrooms != null) params.bathrooms = filters.bathrooms;
      if (filters.floors != null) params.floors = filters.floors;

      // Boolean filters: only send if explicitly true (null means don't filter)
      if (filters.newConstruction === true) params.newConstruction = true;
      if (filters.petFriendly === true) params.petFriendly = true;
      if (filters.swimmingPool === true) params.swimmingPool = true;

      if (filters.searchQuery) params.search = filters.searchQuery;

      console.log("Sending filters to backend:", params);

      const res = await propertyAxios.get("/properties/public", { params });
      dispatch(setProperties(res.data.data.content));

      return res.data.data.content;
    } catch (e) {
      console.error("Failed to fetch properties", e);
      dispatch(setProperties([])); // Set empty array on error
      return [];
    }
  };

  return { fetchProperties };
};
