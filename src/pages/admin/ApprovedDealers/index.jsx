import React, { useState } from "react";
import {
  Table,
  Tag,
  Spin,
  Alert,
  Pagination,
  Button,
  message,
  Modal,
  Rate,
  Card,
  Image,
} from "antd";
import useApprovedDealers from "../../../hooks/useApprovedDealers";
import SearchBar from "../../../components/SearchBar";
import axiosInstance from "../../../api/axiosInstance";
import Papa from "papaparse";

const Index = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const pageSize = 10;

  // Modal states
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
  const [propertiesModalVisible, setPropertiesModalVisible] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedDealerName, setSelectedDealerName] = useState("");

  const { dealers, totalElements, loading, error } = useApprovedDealers(
    page - 1,
    pageSize,
    keyword,
    refreshKey
  );

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  const handleBlacklist = async (userId) => {
    try {
      await axiosInstance.post(`/admin/blacklist-dealer/${userId}`);
      messageApi.success("Dealer blacklisted successfully");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      messageApi.error(
        error.response?.data?.message || "Failed to blacklist dealer"
      );
    }
  };

  const handleViewReviews = (reviews, dealerName) => {
    setSelectedReviews(reviews);
    setSelectedDealerName(dealerName);
    setReviewsModalVisible(true);
  };

  const handleViewProperties = (properties, dealerName) => {
    setSelectedProperties(properties);
    setSelectedDealerName(dealerName);
    setPropertiesModalVisible(true);
  };

  const handleExportCSV = () => {
    if (!dealers || dealers.length === 0) return;

    const exportData = dealers.map((dealer) => ({
      ID: dealer.profileId,
      Name: dealer.name || "-",
      Email: dealer.email,
      City: dealer.city || "-",
      Rating: dealer.rating?.toFixed(1) || "-",
      "Total Reviews": dealer.reviewsCount || 0,
      Role: dealer.role,
      "Properties Created": dealer.createdProperties?.length || 0,
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "approved_dealers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { title: "ID", dataIndex: "profileId", key: "userId" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text || "-",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (city) => city || "-",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => rating?.toFixed(1) || "-",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews, record) => (
        <div className="flex items-center gap-2">
          <span>{reviews?.length || 0}</span>
          {reviews && reviews.length > 0 && (
            <Button
              size="small"
              type="link"
              onClick={() => handleViewReviews(reviews, record.name)}
            >
              View
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="green">{role}</Tag>,
    },
    {
      title: "Properties",
      dataIndex: "createdProperties",
      key: "createdProperties",
      render: (properties, record) => (
        <div className="flex items-center gap-2">
          <span>{properties?.length || 0}</span>
          {properties && properties.length > 0 && (
            <Button
              size="small"
              type="link"
              onClick={() => handleViewProperties(properties, record.name)}
            >
              View
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, dealer) => (
        <Button
          size="small"
          danger
          onClick={() => handleBlacklist(dealer.userId)}
        >
          Blacklist
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-xl shadow-sm border p-4 dark:border-neutral-800 border-neutral-200/80">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary-heading dark:text-dark-heading">
          Approved Dealers
        </h2>
        <Button type="primary" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </div>

      <SearchBar
        onSearch={handleSearch}
        alignment="left"
        placeholder="Search dealers by name or email"
      />

      {error && <Alert message={error} type="error" className="mb-4" />}

      {loading ? (
        <div className="flex justify-center p-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto hide-scrollbar">
            <Table
              rowKey="userId"
              columns={columns}
              dataSource={dealers}
              pagination={false}
              bordered
            />
          </div>
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalElements}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      {/* Reviews Modal */}
      <Modal
        title={`Reviews for ${selectedDealerName}`}
        open={reviewsModalVisible}
        onCancel={() => setReviewsModalVisible(false)}
        footer={null}
        width={600}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
      >
        <div className="space-y-4">
          {selectedReviews.map((review) => (
            <Card key={review.id} size="small" className="border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-medium">{review.reviewerName}</div>
                  <Rate disabled defaultValue={review.rating} />
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </Card>
          ))}
          {selectedReviews.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reviews available
            </div>
          )}
        </div>
      </Modal>

      {/* Properties Modal */}
      <Modal
        title={`Properties by ${selectedDealerName}`}
        open={propertiesModalVisible}
        onCancel={() => setPropertiesModalVisible(false)}
        footer={null}
        width={800}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="space-y-4">
          {selectedProperties.map((property) => (
            <Card key={property.id} size="small" className="border">
              <div className="flex gap-4">
                {property.mainImage && (
                  <div className="flex-shrink-0">
                    <Image
                      width={120}
                      height={80}
                      src={property.mainImage}
                      alt={property.title}
                      className="rounded object-cover"
                      fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1xkE8A8HfQyMABaHYDHKTRyALfqhIhAhtyACkQx5OExYBZBZlSBBhhJU6lI6IWn"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {property.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {property.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        PKR {property.price?.toLocaleString()}
                      </div>
                      <Tag color={property.listed ? "green" : "red"}>
                        {property.listed ? "Listed" : "Unlisted"}
                      </Tag>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
                    <div>
                      <strong>Location:</strong> {property.location}
                    </div>
                    <div>
                      <strong>Address:</strong> {property.address}
                    </div>
                    <div>
                      <strong>Type:</strong> {property.type}
                    </div>
                    <div>
                      <strong>Purpose:</strong> {property.purpose}
                    </div>
                  </div>

                  {property.media && property.media.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-blue-600">
                        {property.media.length} media file(s) available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
          {selectedProperties.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No properties created yet
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Index;
