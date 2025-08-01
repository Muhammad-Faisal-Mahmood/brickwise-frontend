import React from "react";
import { Form, InputNumber, Select, Switch } from "antd";

const PropertyFeaturesForm = () => (
  <>
    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item label="Bedrooms" name="bedrooms" className="flex-1">
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Bathrooms" name="bathrooms" className="flex-1">
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Floors" name="floors" className="flex-1">
        <InputNumber min={0} className="w-full" />
      </Form.Item>
    </div>

    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item label="Size (sq ft)" name="size" className="flex-1">
        <InputNumber min={0} className="w-full" />
      </Form.Item>
      <Form.Item label="Status" name="status" className="flex-1">
        <Select>
          <Select.Option value="available">Available</Select.Option>
          <Select.Option value="sold">Sold</Select.Option>
        </Select>
      </Form.Item>
    </div>

    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item
        label="New Construction"
        name="newConstruction"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="Pet Friendly"
        name="petFriendly"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="Swimming Pool"
        name="swimmingPool"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </div>
  </>
);

export default PropertyFeaturesForm;
