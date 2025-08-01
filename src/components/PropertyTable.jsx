// src/components/PropertyTablePage.jsx
import {
  Table,
  Spin,
  Alert,
  Pagination,
  Button,
  Switch,
  message,
  Select,
  Input,
} from "antd";
import { useState } from "react";
import PropertyEditModal from "../pages/admin/Properties/components/PropertyEditModal";
import {
  unlistProperty,
  listProperty,
  updateProperty,
} from "../hooks/usePropertyActions";
import usePaginatedProperties from "../hooks/usePaginatedProperties";

const { Option } = Select;

const PropertyTablePage = ({ apiEndpoint, showDealerColumn }) => {
  const [statusFilter, setStatusFilter] = useState(null);
  const [newConstructionFilter, setNewConstructionFilter] = useState(null);
  const [mostViewed, setMostViewed] = useState(false);
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [listedFilter, setListedFilter] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { properties, totalElements, loading, error } = usePaginatedProperties(
    apiEndpoint,
    page - 1,
    pageSize,
    {
      listed: listedFilter,
      keyword,
      status: statusFilter,
      newConstruction: newConstructionFilter,
      mostViewed,
    },
    refreshKey
  );

  const handleToggleListed = async (id, currentlyListed) => {
    try {
      if (currentlyListed) {
        await unlistProperty(id);
        messageApi.success("Property unlisted");
      } else {
        await listProperty(id);
        messageApi.success("Property listed");
      }
      setRefreshKey((prev) => prev + 1);
    } catch (e) {
      messageApi.error("Failed to update listing status");
    }
  };

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  const handleFilterChange = (value) => {
    setPage(1);
    setListedFilter(value === "all" ? null : value === "listed");
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", fixed: "left" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    showDealerColumn && {
      title: "Dealer",
      dataIndex: "dealerName",
      key: "dealerName",
    },
    { title: "City", dataIndex: "location", key: "location" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `PKR ${price.toLocaleString()}`,
    },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Purpose", dataIndex: "purpose", key: "purpose" },
    { title: "Bedrooms", dataIndex: "bedrooms", key: "bedrooms" },
    { title: "Bathrooms", dataIndex: "bathrooms", key: "bathrooms" },
    { title: "Floors", dataIndex: "floors", key: "floors" },
    { title: "Size (sq ft)", dataIndex: "size", key: "size" },
    {
      title: "New Construction",
      dataIndex: "newConstruction",
      key: "newConstruction",
      render: (v) => (v ? "Yes" : "No"),
    },
    {
      title: "Pet Friendly",
      dataIndex: "petFriendly",
      key: "petFriendly",
      render: (v) => (v ? "Yes" : "No"),
    },
    {
      title: "Swimming Pool",
      dataIndex: "swimmingPool",
      key: "swimmingPool",
      render: (v) => (v ? "Yes" : "No"),
    },
    { title: "Views", dataIndex: "views", key: "views" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Listed",
      dataIndex: "listed",
      key: "listed",
      render: (listed, record) => (
        <Switch
          checked={listed}
          onChange={() => handleToggleListed(record.id, listed)}
        />
      ),
    },
    {
      title: "Media",
      dataIndex: "media",
      key: "media",
      render: (media) => media?.length,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          size="small"
          onClick={() => {
            setSelectedProperty(record);
            setEditModalVisible(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="rounded-xl shadow p-4">
      {contextHolder}
      <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
        Properties
      </h2>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <Input.Search
          placeholder="Search..."
          onSearch={handleSearch}
          allowClear
        />

        <Select
          defaultValue="all"
          onChange={(value) => {
            setPage(1);
            setListedFilter(value === "all" ? null : value === "listed");
          }}
          style={{ width: 140 }}
        >
          <Option value="all">All</Option>
          <Option value="listed">Listed</Option>
          <Option value="unlisted">Unlisted</Option>
        </Select>

        <Select
          defaultValue="all"
          onChange={(value) => {
            setPage(1);
            setStatusFilter(value === "all" ? null : value);
          }}
          style={{ width: 150 }}
        >
          <Option value="all">All Statuses</Option>
          <Option value="available">Available</Option>
          <Option value="sold">Sold</Option>
          <Option value="pending">Pending</Option>
        </Select>

        <Select
          defaultValue="all"
          onChange={(value) => {
            setPage(1);
            setNewConstructionFilter(value === "all" ? null : value === "true");
          }}
          style={{ width: 150 }}
        >
          <Option value="all">All Constructions</Option>
          <Option value="true">New Construction</Option>
          <Option value="false">Old Construction</Option>
        </Select>

        <div className="flex items-center gap-1">
          <span className="w-full">Most Viewed</span>
          <Switch
            checked={mostViewed}
            onChange={(checked) => {
              setPage(1);
              setMostViewed(checked);
            }}
          />
        </div>
      </div>
      {error && <Alert message={error} type="error" className="mb-4" />}
      {loading ? (
        <div className="flex justify-center p-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={properties}
            pagination={false}
            bordered
            className="hide-scrollbar overflow-auto"
            scroll={{ x: "max-content" }}
          />
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

      <PropertyEditModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        property={selectedProperty}
        onUpdated={() => setRefreshKey((prev) => prev + 1)}
      />
    </div>
  );
};

export default PropertyTablePage;
