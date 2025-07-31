import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import PortfolioUpload from "./PortfolioUpload";
import DocumentsUpload from "./DocumentsUpload";
import { useDealerRegister } from "../../../../hooks/useRegisterDealer";

const DealerRegisterForm = () => {
  const [form] = Form.useForm();
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [documentsFile, setDocumentsFile] = useState(null);
  const { registerDealer, loading } = useDealerRegister();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("city", values.city);
    if (values.socialLinks) formData.append("socialLinks", values.socialLinks);
    if (portfolioFile) formData.append("portfolio", portfolioFile);
    if (documentsFile) formData.append("documents", documentsFile);

    const res = await registerDealer(formData);
    form.resetFields();

    if (res.success) {
      messageApi.open({ type: "success", content: res?.data?.message });
      setPortfolioFile(null);
      setDocumentsFile(null);
    } else {
      messageApi.open({ type: "error", content: res?.data?.message });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="dealer_register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* Email - full width */}
        <Form.Item
          label={
            <span className="text-primary-subHeading dark:text-dark-subHeading">
              Email
            </span>
          }
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Invalid Email!" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="dark:bg-gray-800 dark:text-dark-heading"
          />
        </Form.Item>

        {/* Name & Phone - side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <span className="text-primary-subHeading dark:text-dark-subHeading">
                Name
              </span>
            }
            name="name"
            className="md:w-1/2"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input
              placeholder="Enter your full name"
              className="dark:bg-gray-800 dark:text-dark-heading"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-primary-subHeading dark:text-dark-subHeading">
                Phone Number
              </span>
            }
            name="phone"
            className="md:w-1/2"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
              {
                pattern: /^\+?[0-9\s-()]{7,20}$/,
                message: "Enter a valid phone number.",
              },
            ]}
          >
            <Input
              placeholder="e.g., +1234567890 or 03XX-XXXXXXX"
              className="dark:bg-gray-800 dark:text-dark-heading"
            />
          </Form.Item>
        </div>

        {/* City & Social Links - side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <Form.Item
            label={
              <span className="text-primary-subHeading dark:text-dark-subHeading">
                City
              </span>
            }
            name="city"
            className="md:w-1/2"
            rules={[{ required: true, message: "Please input your City!" }]}
          >
            <Input
              placeholder="e.g., Lahore, Karachi"
              className="dark:bg-gray-800 dark:text-dark-heading"
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-primary-subHeading dark:text-dark-subHeading">
                Social Links (Optional)
              </span>
            }
            name="socialLinks"
            className="md:w-1/2"
          >
            <Input
              placeholder="e.g., LinkedIn profile, website"
              className="dark:bg-gray-800 dark:text-dark-heading"
            />
          </Form.Item>
        </div>

        {/* Attachments - side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <PortfolioUpload file={portfolioFile} setFile={setPortfolioFile} />
          </div>
          <div className="md:w-1/2">
            <DocumentsUpload file={documentsFile} setFile={setDocumentsFile} />
          </div>
        </div>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full bg-primary-brandColor1 hover:bg-primary-brandColor1Hover text-white font-bold py-2 px-4 rounded-md"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DealerRegisterForm;
