import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Divider, Card } from "antd";
import { useUserProfileApi } from "../../../hooks/useUserProfile";
import { updateUserName } from "../../../redux/features/authSlice";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { changePassword, changeName, contextHolder } = useUserProfileApi();

  const [nameForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const handleNameChange = async (values) => {
    const updatedName = await changeName(values.newName);
    if (updatedName) {
      dispatch(updateUserName(updatedName));
    }
  };

  const handlePasswordChange = async (values) => {
    await changePassword(values.oldPassword, values.newPassword);
    passwordForm.resetFields();
  };

  return (
    <div className="max-w-2xl mx-auto ">
      {contextHolder}

      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>

      <Card title="Profile Information" className="mb-6">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
      </Card>

      <Card title="Change Name" className="mb-6">
        <Form form={nameForm} onFinish={handleNameChange} layout="vertical">
          <Form.Item
            name="newName"
            label="New Name"
            rules={[{ required: true, message: "Please enter your new name" }]}
          >
            <Input placeholder="Enter new name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Name
            </Button>
          </Form.Item>
        </Form>
      </Card>

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
    </div>
  );
};

export default Profile;
