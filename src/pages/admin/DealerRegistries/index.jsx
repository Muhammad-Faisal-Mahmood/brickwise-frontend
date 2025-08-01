import React, { useState } from "react";
import {
  Table,
  Tag,
  Spin,
  Alert,
  Pagination,
  Button,
  message,
  Popconfirm,
} from "antd";
import useDealerRegistries from "../../../hooks/useDealerRegistries";
import {
  approveDealer,
  rejectDealer,
} from "../../../hooks/useApproveRejectDealer";
import SearchBar from "../../../components/SearchBar";
import DealerRegistryModal from "./components/DealerRegistryModal";

const DealerRegistriesPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  const [selectedRegistry, setSelectedRegistry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // to refresh list after action

  // new: message context
  const [messageApi, contextHolder] = message.useMessage();

  const { registries, totalElements, loading, error } = useDealerRegistries(
    page - 1,
    pageSize,
    keyword + refreshKey
  );

  const handleSearch = (value) => {
    setPage(1);
    setKeyword(value);
  };

  const handleApprove = async (id) => {
    try {
      await approveDealer(id);
      messageApi.open({
        type: "success",
        content: "Dealer approved",
      });
      setRefreshKey((prev) => prev + 1);
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Approval failed",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectDealer(id);
      messageApi.open({
        type: "success",
        content: "Dealer rejected",
      });
      setRefreshKey((prev) => prev + 1);
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Rejection failed",
      });
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "City", dataIndex: "city", key: "city", responsive: ["md"] },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "PENDING") color = "orange";
        else if (status === "APPROVED") color = "green";
        else if (status === "REJECTED") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => {
              setSelectedRegistry(record);
              setModalVisible(true);
            }}
          >
            View
          </Button>
          {record.status === "PENDING" && (
            <>
              <Popconfirm
                title="Approve this dealer?"
                onConfirm={() => handleApprove(record.id)}
              >
                <Button size="small" type="primary">
                  Approve
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Reject this dealer?"
                onConfirm={() => handleReject(record.id)}
              >
                <Button size="small" danger>
                  Reject
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl p-4 shadow-sm  border dark:border-neutral-800 border-neutral-200/80">
      {/* show message context */}
      {contextHolder}

      <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
        Dealer Applications
      </h2>
      <SearchBar
        alignment={"left"}
        onSearch={handleSearch}
        placeholder="Search by name, email, or city"
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
              rowKey="id"
              columns={columns}
              dataSource={registries}
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

      <DealerRegistryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        registry={selectedRegistry}
      />
    </div>
  );
};

export default DealerRegistriesPage;
