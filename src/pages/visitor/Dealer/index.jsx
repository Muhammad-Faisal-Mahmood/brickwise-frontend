import { useState } from "react";
import useDealers from "../../../hooks/useDealers";
import SearchBar from "../../../components/SearchBar";
import DealerFilters from "./components/DealerFilters";
import DealerGrid from "./components/DealerGrid";
import { Button } from "antd";

const Dealers = () => {
  const { dealers, hasMore, loading, loadMore, applyFilters, filters } =
    useDealers();

  const handleSearch = (query) => {
    applyFilters({ searchQuery: query });
  };

  const handleFilterChange = (field, value) => {
    applyFilters({ [field]: value });
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} placeholder="Search Dealers..." />

      <DealerFilters
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
        filters={filters}
      />

      <h2 className="text-2xl text-primary-heading dark:text-dark-heading font-semibold mt-12 mb-6 text-center">
        Dealers
      </h2>

      <DealerGrid dealers={dealers} />

      {hasMore && (
        <div className="flex justify-center mt-4">
          <Button loading={loading} onClick={loadMore}>
            Show More
          </Button>
        </div>
      )}
    </>
  );
};

export default Dealers;
