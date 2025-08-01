import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar";
import {
  setFilters,
  resetFilters,
} from "../../../redux/features/propertySlice";
import Filters from "./Components/Filters";
import PropertyGrid from "./Components/PropertyGrid";
import { usePublicProperties } from "../../../hooks/usePublicProperties";

const Listing = () => {
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.properties.properties);
  const { fetchProperties } = usePublicProperties();

  const [localFilters, setLocalFilters] = useState({
    location: null,
    type: null,
    minPrice: null,
    maxPrice: null,
    minSize: null,
    maxSize: null,
    bedrooms: null,
    bathrooms: null,
    floors: null,
    newConstruction: null, // null = don't filter, true = only new construction
    petFriendly: null, // null = don't filter, true = only pet friendly
    swimmingPool: null, // null = don't filter, true = only with pool
    searchQuery: null,
  });

  // initial load
  useEffect(() => {
    fetchProperties(); // fetch all
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    // Clean up filters - remove null values to avoid sending unnecessary params
    const cleanFilters = Object.entries(localFilters).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    dispatch(setFilters(cleanFilters));
    fetchProperties(cleanFilters);
  };

  const handleSearch = (query) => {
    const searchQuery = query?.trim() || null;
    const updatedFilters = { ...localFilters, searchQuery };

    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
    fetchProperties(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetState = {
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
      searchQuery: null,
    };

    setLocalFilters(resetState);
    dispatch(resetFilters());
    fetchProperties(); // Fetch all properties without filters
  };

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search properties by title or description..."
      />

      <Filters
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        resetFilters={handleResetFilters}
      />

      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl text-primary-heading dark:text-dark-heading font-semibold mb-2">
          Available Properties
        </h2>
        <p className="text-primary-subHeading dark:text-dark-subHeading">
          {allProperties?.length || 0} properties found
        </p>
      </div>

      <PropertyGrid filteredProperties={allProperties} />
    </div>
  );
};

export default Listing;
