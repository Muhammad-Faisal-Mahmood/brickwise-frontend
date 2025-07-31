import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
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

      removeMedia.forEach((filename) =>
        formData.append("removeMedia", filename)
      );

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
        <Form.Item label="Location" name="location">
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
            {property.media?.map((filename) => (
              <div key={filename} className="relative">
                <img
                  src={`${filename}`}
                  alt="media"
                  className="w-24 h-16 object-cover"
                />
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={() => handleRemoveExistingMedia(filename)}
                />
              </div>
            ))}
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
