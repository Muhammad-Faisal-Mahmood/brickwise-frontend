import React, { useState } from "react";
import {
  Table,
  Spin,
  Alert,
  Pagination,
  Tag,
  Button,
  message,
  Modal,
  Input,
  Select,
  Descriptions,
} from "antd";
import useAdminContactMessages from "../../../hooks/useAdminContactMessages";
import axiosInstance from "../../../api/axiosInstance";
import SearchBar from "../../../components/SearchBar";

const { TextArea } = Input;

const ContactMessages = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [detailsModal, setDetailsModal] = useState({
    open: false,
    message: null,
  });
  const [queryType, setQueryType] = useState(""); // dealer, property, other, or empty
  const [replyModal, setReplyModal] = useState({
    open: false,
    messageId: null,
    replyingTo: null,
    content: "",
  });
  const [sending, setSending] = useState(false);
  const pageSize = 10;

  const [refreshKey, setRefreshKey] = useState(0);

  const { messages, totalElements, loading, error } = useAdminContactMessages(
    page - 1,
    pageSize,
    search,
    queryType,
    refreshKey // add this
  );

  const [messageApi, contextHolder] = message.useMessage();

  const openDetailsModal = (msg) => {
    setDetailsModal({
      open: true,
      message: msg,
    });
  };

  const openReplyModal = (msg) => {
    setReplyModal({
      open: true,
      messageId: msg.id,
      replyingTo: msg,
      content: "",
    });
  };

  const sendReply = async () => {
    setSending(true);
    try {
      await axiosInstance.post(`/contact-us/${replyModal.messageId}/reply`, {
        replyContent: replyModal.content,
      });
      messageApi.success("Reply sent successfully");
      setReplyModal({
        open: false,
        messageId: null,
        replyingTo: null,
        content: "",
      });
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const markAsResponded = async (id) => {
    try {
      await axiosInstance.put(`/contact-us/${id}/responded`);
      messageApi.success("Marked as responded");
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      messageApi.error(
        err.response?.data?.message || "Failed to update status"
      );
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    {
      title: "Query Type",
      dataIndex: "queryType",
      key: "queryType",
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: "Responded",
      dataIndex: "responded",
      key: "responded",
      render: (r) =>
        r ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, msg) => (
        <div className="flex gap-2">
          <Button size="small" onClick={() => openDetailsModal(msg)}>
            View
          </Button>
          <Button size="small" onClick={() => openReplyModal(msg)}>
            Reply
          </Button>
          {!msg.responded && (
            <Button size="small" onClick={() => markAsResponded(msg.id)}>
              Mark as Responded
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl shadow-sm border p-4 dark:border-neutral-800 border-neutral-200/80">
      {contextHolder}
      <h2 className="text-xl font-semibold mb-4 text-primary-heading dark:text-dark-heading">
        Contact Messages
      </h2>

      <div className="flex gap-4 mb-4">
        <div className="w-full">
          <SearchBar
            onSearch={(val) => {
              setPage(1);
              setSearch(val);
            }}
            alignment="left"
            placeholder="Search by subject or name"
          />
        </div>
        <Select
          allowClear
          placeholder="Filter by query type"
          onChange={(val) => {
            setPage(1);
            setQueryType(val || "");
          }}
          style={{ width: 200 }}
          options={[
            { label: "Dealer", value: "dealer" },
            { label: "Property", value: "property" },
            { label: "Other", value: "other" },
          ]}
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
            dataSource={messages}
            pagination={false}
            bordered
            className="overflow-auto"
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

      <Modal
        title={`Reply to: ${replyModal.replyingTo?.subject}`}
        open={replyModal.open}
        onCancel={() =>
          setReplyModal({
            open: false,
            messageId: null,
            replyingTo: null,
            content: "",
          })
        }
        onOk={sendReply}
        confirmLoading={sending}
      >
        <p>
          <strong>Message:</strong> {replyModal.replyingTo?.message}
        </p>
        <TextArea
          rows={4}
          value={replyModal.content}
          onChange={(e) =>
            setReplyModal({ ...replyModal, content: e.target.value })
          }
          placeholder="Write your reply here"
        />
      </Modal>

      <Modal
        title={`Message Details`}
        open={detailsModal.open}
        onCancel={() => setDetailsModal({ open: false, message: null })}
        footer={null}
      >
        {detailsModal.message && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">
              {detailsModal.message.id}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {detailsModal.message.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {detailsModal.message.email}
            </Descriptions.Item>
            <Descriptions.Item label="Subject">
              {detailsModal.message.subject}
            </Descriptions.Item>
            <Descriptions.Item label="Query Type">
              {detailsModal.message.queryType}
            </Descriptions.Item>
            <Descriptions.Item label="Responded">
              {detailsModal.message.responded ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Message">
              {detailsModal.message.message}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ContactMessages;
