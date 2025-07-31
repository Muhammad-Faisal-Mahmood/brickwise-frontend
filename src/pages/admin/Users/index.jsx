import React, { useState } from "react";
import { Table, Spin, Alert, Pagination, Tag } from "antd";
import useAdminUsers from "../../../hooks/useAdminUsers";
import SearchBar from "../../../components/SearchBar";

const index = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;

  const { users, totalElements, loading, error } = useAdminUsers(
    page - 1,
    pageSize,
    keyword
  );

  const handleSearch = (value) => {
    setPage(1); // Reset to first page
    setKeyword(value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "default";
        if (role === "ADMIN") color = "geekblue";
        else if (role === "DEALER") color = "green";
        else color = "volcano";
        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => (verified ? "✅" : "❌"),
      responsive: ["md"],
    },
    {
      title: "Favorites",
      dataIndex: "favoritePropertyIds",
      key: "favoritePropertyIds",
      render: (arr) => arr?.length || 0,
      responsive: ["md"],
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        new Date(createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  return (
    <div className=" rounded-xl shadow-sm p-4 border dark:border-neutral-800 border-neutral-200/80">
      <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
        Users
      </h2>

      <SearchBar
        alignment={"left"}
        onSearch={handleSearch}
        placeholder="Search by name or email"
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
              rowKey="id"
              columns={columns}
              dataSource={users}
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
