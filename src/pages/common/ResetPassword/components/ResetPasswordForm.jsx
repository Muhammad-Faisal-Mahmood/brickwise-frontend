// src/pages/auth/ResetPasswordForm.jsx
import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth"; // adjust path as needed

const ResetPasswordForm = ({ messageApi }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { resetPassword } = useAuth(messageApi);
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  useEffect(() => {
    if (initialEmail) form.setFieldsValue({ email: initialEmail });
  }, [initialEmail, form]);

  const handleSubmit = async (values) => {
    const { email, otp: resetToken, newPassword } = values;
    const success = await resetPassword(email, newPassword, resetToken);

    if (success) {
      // Wait 1–2 seconds before redirecting to home
      setTimeout(() => {
        navigate("/");
      }, 1500); // 1500ms = 1.5 seconds
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label={
          <span className="text-primary-subHeading dark:text-dark-subHeading">
            Email
          </span>
        }
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input
          placeholder="you@example.com"
          disabled={!!initialEmail}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-brandColor1 focus:border-primary-brandColor1 dark:bg-gray-800 dark:text-dark-heading dark:border-gray-600"
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="text-primary-subHeading dark:text-dark-subHeading">
            OTP
          </span>
        }
        name="otp"
        rules={[{ required: true, message: "Please enter the OTP" }]}
      >
        <Input.OTP
          separator={
            <span className="text-primary-heading dark:text-dark-heading">
              -
            </span>
          }
          length={6}
          className="ant-input-otp  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-brandColor1 focus:border-primary-brandColor1 dark:bg-gray-800 dark:text-dark-heading dark:border-gray-600"
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="text-primary-subHeading dark:text-dark-subHeading">
            New Password
          </span>
        }
        name="newPassword"
        rules={[
          { required: true, message: "Please input your new password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password
          placeholder="Enter new password"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-brandColor1 focus:border-primary-brandColor1 dark:bg-gray-800 dark:text-dark-heading dark:border-gray-600"
        />
      </Form.Item>

      <Form.Item
        label={
          <span className="text-primary-subHeading dark:text-dark-subHeading">
            Confirm New Password
          </span>
        }
        name="confirmNewPassword"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your new password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm new password"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-brandColor1 focus:border-primary-brandColor1 dark:bg-gray-800 dark:text-dark-heading dark:border-gray-600"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          className="w-full bg-primary-brandColor1 hover:bg-primary-brandColor1Hover text-white font-bold py-2 px-4 rounded-md shadow-lg transition duration-300 ease-in-out dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
