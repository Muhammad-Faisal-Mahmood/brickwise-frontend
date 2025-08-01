import React, { useState } from "react";
import { Form, Button, message, Card } from "antd";
import propertyAxios from "../../../api/propertyAxios";

import PropertyDetailsForm from "./components/PropertyDetailsForm";
import PropertyFeaturesForm from "./components/PropertyFeaturesForm";
import PropertyMediaForm from "./components/PropertyMediaForm";

const CreateProperty = () => {
  const [form] = Form.useForm();
  const [mainImage, setMainImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    if (!mainImage) {
      messageApi.warning("Please upload a main image");
      return;
    }

    const formData = new FormData();

    // Always append these fields safely
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("address", values.address);
    formData.append("price", values.price);
    formData.append("type", values.type);
    formData.append("purpose", values.purpose);
    formData.append("status", values.status);

    if (values.bedrooms !== undefined)
      formData.append("bedrooms", values.bedrooms);
    if (values.bathrooms !== undefined)
      formData.append("bathrooms", values.bathrooms);
    if (values.floors !== undefined) formData.append("floors", values.floors);
    if (values.size !== undefined) formData.append("size", values.size);

    // Boolean fields: always append "true" / "false"
    formData.append(
      "newConstruction",
      values.newConstruction ? "true" : "false"
    );
    formData.append("petFriendly", values.petFriendly ? "true" : "false");
    formData.append("swimmingPool", values.swimmingPool ? "true" : "false");

    formData.append("mainImage", mainImage);
    media.forEach((file) => formData.append("media", file));

    try {
      setLoading(true);
      await propertyAxios.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      messageApi.success("Property created successfully");
      form.resetFields();
      setMainImage([]);
      setMedia([]);
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to create property");
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
          initialValues={{ purpose: "sale", status: "available" }}
        >
          <PropertyDetailsForm />
          <PropertyFeaturesForm />
          <PropertyMediaForm
            mainImage={mainImage}
            setMainImage={setMainImage}
            media={media}
            setMedia={setMedia}
          />

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
