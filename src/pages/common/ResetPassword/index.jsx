// src/pages/auth/ResetPasswordPage.jsx
import React from "react";
import { message, Typography } from "antd";
import ResetPasswordForm from "./components/ResetPasswordForm";
const { Title } = Typography;

const ResetPasswordPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-backDrop dark:bg-dark-accent py-12 px-4 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="max-w-md md:max-w-xl w-full space-y-8 p-10 bg-white dark:bg-dark-accent rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <Title
          level={3}
          className="text-center mb-4 text-primary-heading dark:text-dark-heading"
        >
          Reset Your Password
        </Title>
        <p className="mb-6 text-center text-sm text-primary-subHeading dark:text-dark-subHeading">
          Please enter your email, the OTP sent to you, and your new password.
        </p>
        <ResetPasswordForm messageApi={messageApi} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
