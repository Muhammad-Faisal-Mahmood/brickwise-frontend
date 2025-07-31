import React, { useState } from "react";
import { Table, Tag, Spin, Alert, Pagination } from "antd";
import useApprovedDealers from "../../../hooks/useApprovedDealers";
import SearchBar from "../../../components/SearchBar";

const index = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;

  const { dealers, totalElements, loading, error } = useApprovedDealers(
    page - 1,
    pageSize,
    keyword
  );

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "profileId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text || "-",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
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
      render: (createdProperties) => createdProperties.length,
    },
  ];

  return (
    <div className=" rounded-xl shadow-sm border p-4 dark:border-neutral-800 border-neutral-200/80">
      <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
        Approved Dealers
      </h2>

      <SearchBar
        onSearch={handleSearch}
        alignment={"left"}
        placeholder="Search dealers by name or email"
      />

      {error && <Alert message={error} type="error" className="mb-4" />}
      {loading ? (
        <div className="flex justify-center p-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
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

export default index;
