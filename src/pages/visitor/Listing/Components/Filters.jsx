import { InputNumber, Button, Checkbox, Input, Slider } from "antd";
import React, { useState } from "react";

const Filters = ({ handleFilterChange, applyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sizeRange, setSizeRange] = useState([0, 10000]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    handleFilterChange("minPrice", value[0]);
    handleFilterChange("maxPrice", value[1]);
  };

  const handleSizeChange = (value) => {
    setSizeRange(value);
    handleFilterChange("minSize", value[0]);
    handleFilterChange("maxSize", value[1]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 mb-6 space-y-4">
      {/* Top row: inputs & checkboxes */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Input
          placeholder="Location"
          style={{ width: 140 }}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
        <Input
          placeholder="Property Type"
          style={{ width: 140 }}
          onChange={(e) => handleFilterChange("type", e.target.value)}
        />
        <InputNumber
          placeholder="Bedrooms"
          style={{ width: 100 }}
          min={0}
          onChange={(v) => handleFilterChange("bedrooms", v)}
        />
        <InputNumber
          placeholder="Bathrooms"
          style={{ width: 100 }}
          min={0}
          onChange={(v) => handleFilterChange("bathrooms", v)}
        />
        <InputNumber
          placeholder="Floors"
          style={{ width: 100 }}
          min={0}
          onChange={(v) => handleFilterChange("floors", v)}
        />

        <Checkbox
          onChange={(e) =>
            handleFilterChange("newConstruction", e.target.checked)
          }
        >
          New Construction
        </Checkbox>
        <Checkbox
          onChange={(e) => handleFilterChange("petFriendly", e.target.checked)}
        >
          Pet Friendly
        </Checkbox>
        <Checkbox
          onChange={(e) => handleFilterChange("swimmingPool", e.target.checked)}
        >
          Swimming Pool
        </Checkbox>
      </div>

      {/* New line: sliders */}
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xs md:text-base text-primary-heading dark:text-dark-heading">
            Price Range
          </span>
          <Slider
            range
            min={0}
            max={1000000}
            step={5000}
            value={priceRange}
            onChange={handlePriceChange}
            style={{ width: 200 }}
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs md:text-base text-primary-heading dark:text-dark-heading">
            Size Range (sq ft)
          </span>
          <Slider
            range
            min={0}
            max={10000}
            step={100}
            value={sizeRange}
            onChange={handleSizeChange}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
