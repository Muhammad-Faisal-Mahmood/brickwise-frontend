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
    newConstruction: null,
    petFriendly: null,
    swimmingPool: null,
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
    dispatch(setFilters(localFilters));
    fetchProperties(localFilters);
  };

  const handleSearch = (query) => {
    dispatch(setFilters({ searchQuery: query }));
    fetchProperties({ ...localFilters, searchQuery: query });
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} placeholder="Search listings..." />

      <Filters
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
      />

      <h2 className="text-2xl text-primary-heading dark:text-dark-heading font-semibold mt-12 mb-6 text-center">
        Properties
      </h2>
      <PropertyGrid filteredProperties={allProperties} />
    </>
  );
};

export default Listing;
