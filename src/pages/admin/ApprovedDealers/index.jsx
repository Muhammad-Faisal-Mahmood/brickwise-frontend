import React, { useState } from "react";
import { Table, Tag, Spin, Alert, Pagination, Button, message } from "antd";
import useApprovedDealers from "../../../hooks/useApprovedDealers";
import SearchBar from "../../../components/SearchBar";
import axiosInstance from "../../../api/axiosInstance";
import Papa from "papaparse";

const Index = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // 🆕 force refetch after action
  const pageSize = 10;

  const { dealers, totalElements, loading, error } = useApprovedDealers(
    page - 1,
    pageSize,
    keyword,
    refreshKey // pass as dependency to refetch
  );

  const [messageApi, contextHolder] = message.useMessage();

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  // 🆕 Blacklist dealer handler
  const handleBlacklist = async (userId) => {
    try {
      await axiosInstance.post(`/admin/blacklist-dealer/${userId}`);
      messageApi.success("Dealer blacklisted successfully");
      setRefreshKey((prev) => prev + 1); // trigger refresh
    } catch (error) {
      messageApi.error(
        error.response?.data?.message || "Failed to blacklist dealer"
      );
    }
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
      title: "Total Reviews",
      dataIndex: "reviewsCount",
      key: "reviewsCount",
      render: (count) => count || 0,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="green">{role}</Tag>,
    },
    {
      title: "Properties Created",
      dataIndex: "createdProperties",
      key: "createdProperties",
      render: (props) => props.length,
    },
    // 🆕 Actions column
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
          <div className="overflow-x-auto hide-scrollbar ">
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
    </div>
  );
};

export default Index;
