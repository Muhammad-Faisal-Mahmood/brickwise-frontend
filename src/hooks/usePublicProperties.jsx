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
      if (filters.minPrice != null) params.minPrice = filters.minPrice;
      if (filters.maxPrice != null) params.maxPrice = filters.maxPrice;
      if (filters.minSize != null) params.minSize = filters.minSize;
      if (filters.maxSize != null) params.maxSize = filters.maxSize;
      if (filters.bedrooms != null) params.bedrooms = filters.bedrooms;
      if (filters.bathrooms != null) params.bathrooms = filters.bathrooms;
      if (filters.floors != null) params.floors = filters.floors;
      if (filters.newConstruction != null)
        params.newConstruction = filters.newConstruction;
      if (filters.petFriendly != null) params.petFriendly = filters.petFriendly;
      if (filters.swimmingPool != null)
        params.swimmingPool = filters.swimmingPool;
      if (filters.searchQuery) params.search = filters.searchQuery;

      // status filter removed → backend always sends only available

      const res = await propertyAxios.get("/properties/public", { params });
      dispatch(setProperties(res.data.data.content));
    } catch (e) {
      console.error("Failed to fetch properties", e);
    }
  };

  return { fetchProperties };
};
