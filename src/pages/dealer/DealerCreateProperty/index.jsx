import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import propertyAxios from "../../../api/propertyAxios"; // adjust path if needed

const { TextArea } = Input;

const CreateProperty = () => {
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    if (!mainImage) {
      messageApi.open({
        type: "warning",
        content: "Please upload a main image",
      });
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("mainImage", mainImage);
    media.forEach((file) => formData.append("media", file));

    try {
      setLoading(true);
      await propertyAxios.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      messageApi.open({
        type: "success",
        content: "Property created successfully",
      });
      form.resetFields();
      setMainImage(null);
      setMedia([]);
    } catch (error) {
      console.error(error);
      messageApi.open({ type: "error", content: "Failed to create property" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {contextHolder}
      <Card className="shadow rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
          Create New Property
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ purpose: "sale" }}
        >
          {/* Row 1: Title + Type */}
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

          {/* Row 2: Description full width */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          {/* Row 3: Price + Purpose */}
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

          {/* Row 4: City + Address */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Form.Item
              label="City"
              name="location"
              className="flex-1"
              rules={[{ required: true, message: "Location is required" }]}
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

          {/* Row 5: Main Image + Additional Media */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Form.Item label="Main Image (required)" className="flex-1">
              <Upload
                beforeUpload={(file) => {
                  setMainImage(file);
                  return false;
                }}
                maxCount={1}
                showUploadList={mainImage ? [{ name: mainImage.name }] : []}
              >
                <Button icon={<UploadOutlined />}>Select Main Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Additional Media (max 20)" className="flex-1">
              <Upload
                multiple
                beforeUpload={(file) => {
                  if (media.length >= 20) {
                    messageApi.warning("You can upload up to 20 files only");
                    return false;
                  }
                  setMedia((prev) => [...prev, file]);
                  return false;
                }}
                showUploadList={{ showRemoveIcon: true }}
                onRemove={(file) =>
                  setMedia((prev) => prev.filter((f) => f.uid !== file.uid))
                }
                fileList={media.map((file) => ({
                  uid: file.uid,
                  name: file.name,
                  status: "done",
                }))}
              >
                <Button icon={<UploadOutlined />}>Add Media</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Property
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProperty;
