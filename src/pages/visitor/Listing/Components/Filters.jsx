import {
  InputNumber,
  Button,
  Checkbox,
  Input,
  Slider,
  Row,
  Col,
  Card,
  Typography,
  Collapse,
  Select,
} from "antd";
import React, { useState } from "react";
import { FilterOutlined, ClearOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const Filters = ({ handleFilterChange, applyFilters, resetFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sizeRange, setSizeRange] = useState([0, 10000]);
  const [inputs, setInputs] = useState({
    location: "",
    type: "",
    bedrooms: null,
    bathrooms: null,
    floors: null,
    purpose: null,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    newConstruction: null,
    petFriendly: null,
    swimmingPool: null,
  });

  // Handlers
  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    handleFilterChange(field, value || null);
  };

  const handlePurposeChange = (value) => {
    setInputs((prev) => ({ ...prev, purpose: value }));
    handleFilterChange("purpose", value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    handleFilterChange("minPrice", value[0] === 0 ? null : value[0]);
    handleFilterChange("maxPrice", value[1] === 1000000 ? null : value[1]);
  };

  const handleSizeChange = (value) => {
    setSizeRange(value);
    handleFilterChange("minSize", value[0] === 0 ? null : value[0]);
    handleFilterChange("maxSize", value[1] === 10000 ? null : value[1]);
  };

  const handleCheckboxChange = (field, checked) => {
    const newValue = checked ? true : null;
    setCheckboxStates((prev) => ({ ...prev, [field]: newValue }));
    handleFilterChange(field, newValue);
  };

  const handleReset = () => {
    // Reset local states
    setPriceRange([0, 1000000]);
    setSizeRange([0, 10000]);
    setInputs({
      location: "",
      type: "",
      bedrooms: null,
      bathrooms: null,
      floors: null,
      purpose: null,
    });
    setCheckboxStates({
      newConstruction: null,
      petFriendly: null,
      swimmingPool: null,
    });
    if (resetFilters) resetFilters();
  };

  // Format helpers
  const formatPrice = (value) =>
    value >= 1000000
      ? `${(value / 1000000).toFixed(1)}M`
      : value >= 1000
      ? `${(value / 1000).toFixed(0)}K`
      : value.toString();
  const formatSize = (value) =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();

  const [activeKey, setActiveKey] = useState(["0"]); // default open

  const isOpen = activeKey.includes("1");

  return (
    <Card
      className={`mx-auto w-full mb-8 shadow-lg transition-all duration-300 ${
        !isOpen ? "zero-padding" : ""
      }`}
    >
      <Collapse
        activeKey={activeKey}
        onChange={setActiveKey}
        expandIconPosition="right"
        ghost
        className={
          !isOpen
            ? "zero-padding transition-all duration-300"
            : "transition-all duration-300"
        }
      >
        <Panel
          header={
            <div className="flex items-center gap-2">
              <FilterOutlined className="text-primary-brandColor1" />
              <Text
                className={`text-lg font-semibold transition-all duration-200 text-primary-heading dark:text-dark-heading ${
                  isOpen ? "hidden sm:block" : ""
                }`}
              >
                Filter Properties
              </Text>
            </div>
          }
          key="1"
          extra={
            isOpen && (
              <Button
                icon={<ClearOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="text-primary-subHeading hover:text-primary-brandColor1"
              >
                Clear All
              </Button>
            )
          }
        >
          <div className="space-y-6">
            {/* Inputs */}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Location
                </Text>
                <Input
                  value={inputs.location}
                  placeholder="Enter location"
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Property Type
                </Text>
                <Input
                  value={inputs.type}
                  placeholder="Enter type"
                  onChange={(e) => handleInputChange("type", e.target.value)}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Purpose
                </Text>
                <Select
                  value={inputs.purpose}
                  placeholder="Select purpose"
                  onChange={handlePurposeChange}
                  allowClear
                  className="w-full"
                >
                  <Option value="sale">Sale</Option>
                  <Option value="rent">Rent</Option>
                </Select>
              </Col>
              <Col xs={24} sm={8} md={8} lg={4}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Bedrooms
                </Text>
                <InputNumber
                  className="w-full"
                  min={0}
                  max={10}
                  value={inputs.bedrooms}
                  onChange={(v) => handleInputChange("bedrooms", v ?? null)}
                />
              </Col>
              <Col xs={24} sm={8} md={8} lg={4}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Bathrooms
                </Text>
                <InputNumber
                  className="w-full"
                  min={0}
                  max={10}
                  value={inputs.bathrooms}
                  onChange={(v) => handleInputChange("bathrooms", v ?? null)}
                />
              </Col>
              <Col xs={24} sm={8} md={8} lg={4}>
                <Text className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                  Floors
                </Text>
                <InputNumber
                  className="w-full"
                  min={0}
                  max={20}
                  value={inputs.floors}
                  onChange={(v) => handleInputChange("floors", v ?? null)}
                />
              </Col>
            </Row>

            {/* Sliders */}
            <Row gutter={[32, 16]}>
              <Col xs={24} md={12}>
                <Text className="text-sm  font-medium  text-primary-heading dark:text-dark-heading">
                  Price Range (PKR)
                </Text>
                <div className="flex mt-3 justify-between text-xs text-primary-subHeading dark:text-dark-subHeading">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <Slider
                  range
                  min={0}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onChange={handlePriceChange}
                />
              </Col>
              <Col xs={24} md={12}>
                <Text className="text-sm  font-medium text-primary-heading dark:text-dark-heading">
                  Size Range (sq ft)
                </Text>
                <div className="flex justify-between mt-3 text-xs text-primary-subHeading dark:text-dark-subHeading">
                  <span>{formatSize(sizeRange[0])}</span>
                  <span>{formatSize(sizeRange[1])} sq ft</span>
                </div>
                <Slider
                  range
                  min={0}
                  max={10000}
                  step={100}
                  value={sizeRange}
                  onChange={handleSizeChange}
                />
              </Col>
            </Row>

            {/* Checkboxes */}
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={checkboxStates.newConstruction === true}
                  onChange={(e) =>
                    handleCheckboxChange("newConstruction", e.target.checked)
                  }
                >
                  New Construction Only
                </Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={checkboxStates.petFriendly === true}
                  onChange={(e) =>
                    handleCheckboxChange("petFriendly", e.target.checked)
                  }
                >
                  Pet Friendly Only
                </Checkbox>
              </Col>
              <Col xs={24} sm={8}>
                <Checkbox
                  checked={checkboxStates.swimmingPool === true}
                  onChange={(e) =>
                    handleCheckboxChange("swimmingPool", e.target.checked)
                  }
                >
                  Swimming Pool Only
                </Checkbox>
              </Col>
            </Row>

            {/* Apply */}
            <div className="flex justify-center">
              <Button
                type="primary"
                size="large"
                onClick={applyFilters}
                icon={<FilterOutlined />}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default Filters;
