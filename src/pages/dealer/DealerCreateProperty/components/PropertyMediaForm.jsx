import React from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const PropertyMediaForm = ({ mainImage, setMainImage, media, setMedia }) => {
  const [messageApi] = message.useMessage();

  return (
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
  );
};

export default PropertyMediaForm;
