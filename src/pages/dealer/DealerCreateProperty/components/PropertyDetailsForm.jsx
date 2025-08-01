import React from "react";
import { Form, Input, InputNumber, Select } from "antd";
const { TextArea } = Input;

const PropertyDetailsForm = () => (
  <>
    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item
        label="Title"
        name="title"
        className="flex-1"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        className="flex-1"
        rules={[{ required: true, message: "Type is required" }]}
      >
        <Input placeholder="e.g., House, Flat, Plaza" />
      </Form.Item>
    </div>

    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: "Description is required" }]}
    >
      <TextArea rows={3} />
    </Form.Item>

    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item
        label="Price"
        name="price"
        className="flex-1"
        rules={[{ required: true, message: "Price is required" }]}
      >
        <InputNumber min={0} className="w-full" />
      </Form.Item>

      <Form.Item
        label="Purpose"
        name="purpose"
        className="flex-1"
        rules={[{ required: true, message: "Purpose is required" }]}
      >
        <Select>
          <Select.Option value="sale">Sale</Select.Option>
          <Select.Option value="rent">Rent</Select.Option>
        </Select>
      </Form.Item>
    </div>

    <div className="flex flex-col lg:flex-row gap-4">
      <Form.Item
        label="City"
        name="location"
        className="flex-1"
        rules={[{ required: true, message: "City is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        className="flex-1"
        rules={[{ required: true, message: "Address is required" }]}
      >
        <Input />
      </Form.Item>
    </div>
  </>
);

export default PropertyDetailsForm;
