import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import SearchBar from "../../../components/SearchBar";
import { resetFilters } from "../../../redux/features/propertySlice";
import Filters from "./Components/Filters";
import PropertyGrid from "./Components/PropertyGrid";
import usePublicProperties from "../../../hooks/usePublicProperties"; // Updated import

const Listing = () => {
  const dispatch = useDispatch();
  const { properties, hasMore, loading, loadMore, applyFilters, filters } =
    usePublicProperties();

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
    purpose: null,
  });

  const handleFilterChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
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

    applyFilters(cleanFilters);
  };

  const handleSearch = (query) => {
    applyFilters({ searchQuery: query });
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
      purpose: null,
    };

    setLocalFilters(resetState);
    dispatch(resetFilters());
  };

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search properties by title or description..."
      />

      <Filters
        handleFilterChange={handleFilterChange}
        applyFilters={handleApplyFilters}
        resetFilters={handleResetFilters}
      />

      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl text-primary-heading dark:text-dark-heading font-semibold mb-2">
          Available Properties
        </h2>
        <p className="text-primary-subHeading dark:text-dark-subHeading">
          {properties?.length || 0} properties found
        </p>
      </div>

      <PropertyGrid filteredProperties={properties} loading={loading} />

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button loading={loading} onClick={loadMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default Listing;
