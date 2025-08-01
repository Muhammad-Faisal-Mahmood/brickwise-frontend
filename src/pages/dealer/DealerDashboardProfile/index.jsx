// src/pages/dealer/DealerProfile.jsx
import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  Avatar,
  Form,
  Input,
  Button,
  Upload,
  message,
  Spin,
} from "antd";
import { EditOutlined, UploadOutlined, SaveOutlined } from "@ant-design/icons";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../../../redux/features/authSlice";

const { Title, Text, Paragraph } = Typography;

const DealerDashboardProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(
          `/dealer/profile/${user?.dealerId}`
        );
        setProfile(res.data.data);
        form.setFieldsValue(res.data.data); // prefill form fields
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch profile.");
      }
    };
    if (user?.dealerId) fetchProfile();
  }, [user, form]);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bio", values.bio || "");
      formData.append("phone", values.phone || "");
      formData.append("socialLinks", values.socialLinks || "");
      formData.append("city", values.city || "");
      formData.append("name", values.name || "");
      if (values.profileImage && values.profileImage.file) {
        formData.append("profileImage", values.profileImage.file);
      }

      const res = await axiosInstance.post("/dealer/profile/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data.data);
      if (res.data.data?.name) {
        dispatch(updateUserName(res.data.data.name));
      }
      message.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card
        className="shadow-sm"
        title={
          <Title level={4} className="!mb-0">
            Dealer Profile
          </Title>
        }
        extra={
          editing ? null : (
            <Button icon={<EditOutlined />} onClick={() => setEditing(true)}>
              Edit
            </Button>
          )
        }
      >
        {editing ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            initialValues={profile}
          >
            <Form.Item name="profileImage" label="Profile Image">
              <Upload
                listType="picture"
                beforeUpload={() => false} // stop auto upload
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="name" label="Name">
              <Input placeholder="Your name" />
            </Form.Item>
            <Form.Item name="bio" label="Bio">
              <Input.TextArea rows={3} placeholder="Short bio" />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item name="city" label="City">
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item name="socialLinks" label="Social Links">
              <Input placeholder="e.g. https://linkedin.com/..." />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setEditing(false);
                  form.setFieldsValue(profile); // reset form
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Save
              </Button>
            </div>
          </Form>
        ) : (
          <div className="flex gap-4">
            <Avatar size={80} src={profile.profileImageUrl} />
            <div>
              <Title level={5}>{profile.name}</Title>
              <Text>Email: {profile.email}</Text>
              <br />
              <Text>City: {profile.city}</Text>
              <br />
              <Text>Phone: {profile.phone}</Text>
              <br />
              <Text>
                Rating: {profile.rating} ⭐ ({profile.reviewsCount} reviews)
              </Text>
              <br />
              <Paragraph className="!mt-2">{profile.bio}</Paragraph>
              {profile.socialLinks && (
                <a
                  href={profile.socialLinks}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Social Link
                </a>
              )}
            </div>
          </div>
        )}
      </Card>

      <Card title="Created Properties">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ...profile.createdProperties,
            ...profile.createdProperties,
            ...profile.createdProperties,
          ].map((item, index) => (
            <Card
              key={index}
              hoverable
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              cover={
                <img
                  alt={item.title}
                  src={item.mainImage}
                  className="h-48 w-full object-cover"
                />
              }
            >
              <Title level={5} className="!mb-1">
                {item.title}
              </Title>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.type}
                </span>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full font-medium">
                  {item.purpose}
                </span>
              </div>
              <Text strong className="text-primary-brandColor1">
                Price:
              </Text>{" "}
              <span className="font-semibold text-lg">
                PKR {item.price.toLocaleString()}
              </span>
              <br />
              <Text type="secondary" className="flex items-center gap-1 mt-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item.location}
              </Text>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DealerDashboardProfile;
