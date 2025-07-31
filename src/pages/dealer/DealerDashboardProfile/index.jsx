// src/pages/dealer/DealerProfile.jsx
import { Card, Typography, List, Avatar } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance"; // adjust import to your axios
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const DealerDashboardProfile = () => {
  const [profile, setProfile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(
          "/dealer/profile/" + user?.dealerId
        ); // adjust endpoint
        setProfile(res.data.data); // your ApiResponse.data
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className=" mx-auto">
      <Card className="mb-4">
        <div className="flex items-center gap-4">
          <Avatar size={64} src={profile.profileImageUrl} />
          <div>
            <Title level={4}>{profile.name}</Title>
            <Text>Email: {profile.email}</Text>
            <br />
            <Text>City: {profile.city}</Text>
            <br />
            <Text>Phone: {profile.phone}</Text>
            <br />
            <Text>
              Rating: {profile.rating} ⭐ ({profile.reviewsCount} reviews)
            </Text>
          </div>
        </div>
        <p className="mt-4">{profile.bio}</p>
      </Card>

      <Card title="Created Properties">
        <List
          dataSource={profile.createdProperties}
          renderItem={(item) => (
            <List.Item>
              <div>
                <Text strong>{item.title}</Text> — {item.location}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default DealerDashboardProfile;
