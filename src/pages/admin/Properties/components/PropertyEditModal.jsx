import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { updateProperty } from "../../../../hooks/usePropertyActions";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const PropertyEditModal = ({ visible, onClose, property, onUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [removeMedia, setRemoveMedia] = useState([]);
  const [newMedia, setNewMedia] = useState([]);
  const [newMainImage, setNewMainImage] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleRemoveExistingMedia = (file) => {
    setRemoveMedia((prev) => [...prev, file]);
  };

  useEffect(() => {
    if (!visible) {
      // Modal is closing or already closed
      form.resetFields(); // Reset Ant Design form fields
      setRemoveMedia([]); // Reset media to be removed
      setNewMedia([]); // Reset newly added media
      setNewMainImage(null); // Reset new main image
      setLoading(false); // Ensure loading state is false
    } else {
      // Modal is opening or already open, set initial values
      // This is important if `property` can change while the modal is open
      form.setFieldsValue(property);
      // You might also want to clear any existing remove/new media if the property changes
      // without closing the modal, though less common for edit modals.
      setRemoveMedia([]);
      setNewMedia([]);
      setNewMainImage(null);
    }
  }, [visible, form, property]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value);
      });

      // Append files
      if (newMainImage) formData.append("mainImage", newMainImage);
      newMedia.forEach((file) => formData.append("media", file));

      if (removeMedia.length > 0) {
        removeMedia.forEach((url) => {
          formData.append("removeMedia", url);
        });
      }

      await updateProperty(property.id, formData);

      messageApi.success("Property updated");
      onClose();
      onUpdated();
    } catch (e) {
      messageApi.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return null;
  }

  return (
    <Modal
      open={visible}
      title="Edit Property"
      onCancel={onClose}
      okText="Update"
      onOk={() => form.submit()}
      confirmLoading={loading}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        initialValues={property}
        onFinish={handleSubmit}
      >
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="Purpose" name="purpose">
          <Select options={[{ value: "sale" }, { value: "rent" }]} />
        </Form.Item>
        <Form.Item label="Bedrooms" name="bedrooms">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Bathrooms" name="bathrooms">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Floors" name="floors">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Size (sq ft)" name="size">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
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
        <Form.Item label="Status" name="status">
          <Select options={[{ value: "available" }, { value: "sold" }]} />
        </Form.Item>
        <Form.Item label="City" name="location">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <div className="mb-4">
          <div>Main Image:</div>
          {property?.mainImage && (
            <img
              src={`${property.mainImage}`}
              alt="main"
              className="w-32 mb-2"
            />
          )}
          <Upload
            beforeUpload={(file) => {
              setNewMainImage(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Replace Main Image</Button>
          </Upload>
        </div>

        <div className="mb-4">
          <div>Existing Media:</div>
          <div className="flex flex-wrap gap-2">
            {property.media?.map((filename) => {
              const isRemoved = removeMedia.includes(filename);
              return (
                <div key={filename} className="relative w-24 h-16">
                  <img
                    src={filename}
                    alt="media"
                    className={`w-24 h-16 object-cover rounded ${
                      isRemoved ? "opacity-40 grayscale" : ""
                    }`}
                  />
                  {isRemoved && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center text-white text-sm">
                      Removed
                    </div>
                  )}
                  <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    className="absolute top-1 right-1 z-10"
                    onClick={() => handleRemoveExistingMedia(filename)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <Form.Item label="Add New Media">
          <Upload
            multiple
            beforeUpload={(file) => {
              setNewMedia((prev) => [...prev, file]);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PropertyEditModal;
