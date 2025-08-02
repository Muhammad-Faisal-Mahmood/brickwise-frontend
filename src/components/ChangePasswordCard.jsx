import { Button, Card, Form, Input } from "antd";
import React from "react";

const ChangePasswordCard = ({ passwordForm, handlePasswordChange }) => {
  return (
    <Card title="Change Password">
      <Form
        form={passwordForm}
        onFinish={handlePasswordChange}
        layout="vertical"
      >
        <Form.Item
          name="oldPassword"
          label="Current Password"
          rules={[
            { required: true, message: "Please enter your current password" },
          ]}
        >
          <Input.Password placeholder="Current password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="New password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordCard;
