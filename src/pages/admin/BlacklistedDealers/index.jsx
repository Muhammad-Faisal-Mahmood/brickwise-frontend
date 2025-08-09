import React, { useState } from "react";
import { Table, Spin, Alert, Pagination, Button, message, Input } from "antd";
import useAdminBlacklistedDealers from "../../../hooks/useAdminBlacklistedDealers";
import axiosInstance from "../../../api/axiosInstance";
import Papa from "papaparse";

const { Search } = Input;

const BlacklistedDealers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const pageSize = 10;
  const [messageApi, contextHolder] = message.useMessage();

  const { dealers, totalElements, loading, error } = useAdminBlacklistedDealers(
    page - 1,
    pageSize,
    search,
    refreshKey
  );

  const reinstateDealer = async (userId) => {
    try {
      await axiosInstance.post(`/admin/reinstate-dealer/${userId}`);
      messageApi.success("Dealer reinstated successfully");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      messageApi.error(
        err.response?.data?.message || "Failed to reinstate dealer"
      );
    }
  };

  // CSV Export Function
  const handleExportCSV = () => {
    if (!dealers || dealers.length === 0) {
      messageApi.warning("No data to export");
      return;
    }

    const csvData = dealers.map((dealer) => ({
      ID: dealer.id || "-",
      Name: dealer.name || "-",
      Email: dealer.email || "-",
      Phone: dealer.phone ? `'${dealer.phone}` : "-", // prevent Excel scientific notation
      City: dealer.city || "-",
      Status: dealer.status || "-",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "blacklisted_dealers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, dealer) => (
        <Button size="small" onClick={() => reinstateDealer(dealer.id)}>
          Reinstate
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-xl shadow-sm border p-4 dark:border-neutral-800 border-neutral-200/80">
      {contextHolder}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary-heading dark:text-dark-heading">
          Blacklisted Dealers
        </h2>
        <Button type="primary" onClick={handleExportCSV}>
          Export CSV
        </Button>
      </div>
      <div className="mb-4">
        <Search
          placeholder="Search by name or email"
          onSearch={(val) => {
            setPage(1);
            setSearch(val);
          }}
          allowClear
          style={{ width: 300 }}
        />
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
            dataSource={dealers}
            pagination={false}
            bordered
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
    </div>
  );
};

export default BlacklistedDealers;
