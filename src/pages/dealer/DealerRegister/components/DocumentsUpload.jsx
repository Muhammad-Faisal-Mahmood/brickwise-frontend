import React from "react";
import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DocumentsUpload = ({ file, setFile }) => {
  const customRequest = ({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0);

  const uploadProps = {
    name: "documents",
    maxCount: 1,
    customRequest,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
      return true;
    },
    fileList: file ? [{ uid: "-1", name: file.name, status: "done" }] : [],
  };

  return (
    <Form.Item
      label={
        <span className="text-primary-subHeading dark:text-dark-subHeading">
          Supporting Documents (Optional)
        </span>
      }
    >
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} type="primary">
          Upload Documents
        </Button>
      </Upload>
      {file && (
        <div className="mt-2 text-primary-subHeading dark:text-dark-subHeading">
          Selected: {file.name}
        </div>
      )}
    </Form.Item>
  );
};

export default DocumentsUpload;
