import { Select, InputNumber, Button, Input } from "antd";
import React from "react";

const DealerFilters = ({ handleFilterChange, applyFilters, filters }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Location filter */}
        <Input
          placeholder="Enter City"
          style={{ width: 160 }}
          value={filters.city}
          onChange={(e) => handleFilterChange("city", e.target.value)}
        />

        {/* Min Rating filter */}
        <Select
          placeholder="Min Rating"
          style={{ width: 140 }}
          onChange={(value) => handleFilterChange("minRating", value)}
          allowClear
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <Select.Option key={rating} value={rating}>
              {rating}+
            </Select.Option>
          ))}
        </Select>

        {/* Max Reviews filter */}
        <InputNumber
          placeholder="Max Reviews"
          style={{ width: 140 }}
          onChange={(value) => handleFilterChange("maxReviews", value)}
          min={0}
        />

        {/* <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button> */}
      </div>
    </div>
  );
};

export default DealerFilters;
