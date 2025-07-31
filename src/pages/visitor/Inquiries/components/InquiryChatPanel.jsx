import React, { useState } from "react";
import { Card, List, Avatar, Input, Button } from "antd";
import { motion } from "framer-motion";
import dayjs from "../../../../utils/dayjsConfig";

const { TextArea } = Input;

const InquiryChatPanel = ({ currentUser, inquiry, onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 h-full"
    >
      <Card className="flex-1 overflow-y-auto bg-white dark:bg-dark-accent shadow rounded-2xl">
        <List
          dataSource={inquiry.responses}
          renderItem={(response, idx) => {
            let senderLabel = "";

            if (currentUser?.role === "DEALER") {
              senderLabel = response.fromDealer ? "You" : "User";
            } else {
              senderLabel = response.fromDealer ? "Dealer" : "You";
            }

            return (
              <List.Item key={idx}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor:
                          senderLabel === "You" ? "#4f46e5" : "#8b5cf6",
                      }}
                    >
                      {senderLabel.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <div className="flex justify-between">
                      <span className="text-primary-heading dark:text-dark-heading">
                        {senderLabel}
                      </span>
                      <span className="text-xs text-gray-500">
                        {response.createdAt
                          ? dayjs(response.createdAt).fromNow()
                          : ""}
                      </span>
                    </div>
                  }
                  description={
                    <span className="text-primary-subHeading dark:text-dark-subHeading">
                      {response.message}
                    </span>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>
      <div className="flex gap-2">
        <TextArea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply..."
          className="flex-1"
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </motion.div>
  );
};

export default InquiryChatPanel;
