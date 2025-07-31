import { Select, InputNumber, Button } from "antd";
import React from "react";

const { Option } = Select;

const Filters = ({ handleFilterChange, applyFilters }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <Select
          placeholder="Select Location"
          style={{ width: 160 }}
          onChange={(value) => handleFilterChange("location", value)}
          allowClear
        >
          <Option value="Islamabad">Islamabad</Option>
          <Option value="Lahore">Lahore</Option>
          <Option value="Karachi">Karachi</Option>
          <Option value="Rawalpindi">Rawalpindi</Option>
        </Select>

        <Select
          placeholder="Property Type"
          style={{ width: 140 }}
          onChange={(value) => handleFilterChange("type", value)}
          allowClear
        >
          <Option value="villa">Villa</Option>
          <Option value="apartment">Apartment</Option>
          <Option value="office">Office</Option>
        </Select>

        <InputNumber
          placeholder="Min Price"
          style={{ width: 120 }}
          onChange={(value) => handleFilterChange("minPrice", value)}
          min={0}
          formatter={(value) =>
            value ? `PKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
          }
          parser={(value) => (value ? value.replace(/PKR\s?|(,*)/g, "") : "")}
        />
        <InputNumber
          placeholder="Max Price"
          style={{ width: 120 }}
          onChange={(value) => handleFilterChange("maxPrice", value)}
          min={0}
          formatter={(value) =>
            value ? `PKR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
          }
          parser={(value) => (value ? value.replace(/PKR\s?|(,*)/g, "") : "")}
        />

        <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
