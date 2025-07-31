import React, { useState, useRef, useEffect } from "react";
import { Card, List, Avatar, Input, Button } from "antd";
import { motion } from "framer-motion";
import dayjs from "../../../../utils/dayjsConfig";
import useChatSocket from "../../../../hooks/useChatSocket";

const { TextArea } = Input;

const InquiryChatPanel = ({ currentUser, inquiry }) => {
  const listRef = useRef(null);
  const lastSeenResponseIdRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [message, setMessage] = useState("");
  const [newMessageArrived, setNewMessageArrived] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { sendChatMessage, sendSeenReceipt } = useChatSocket(inquiry.id);

  const youAreDealer = currentUser?.role === "DEALER";
  const viewerId = youAreDealer ? currentUser.dealerId : currentUser.id;

  // Handle new messages
  useEffect(() => {
    if (!inquiry?.responses?.length) return;

    const container = listRef.current;
    const lastResponse = inquiry.responses[inquiry.responses.length - 1];

    if (isAtBottom) {
      container.scrollTop = container.scrollHeight;
      if (lastSeenResponseIdRef.current !== lastResponse.id) {
        sendSeenReceipt({
          inquiryId: inquiry.id,
          lastSeenResponseId: lastResponse.id,
          viewerId,
          viewerIsDealer: youAreDealer,
        });
        lastSeenResponseIdRef.current = lastResponse.id;
      }
      setNewMessageArrived(false);
      setShowScrollButton(false);
    } else {
      if (lastResponse.id !== lastSeenResponseIdRef.current) {
        setNewMessageArrived(true);
        setShowScrollButton(true);
      }
    }
  }, [
    inquiry.responses?.length,
    isAtBottom,
    inquiry.id,
    viewerId,
    youAreDealer,
    sendSeenReceipt,
  ]);

  // Handle manual scroll
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => {
      const atBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      setIsAtBottom(atBottom);

      if (atBottom && inquiry.responses?.length) {
        const lastResponse = inquiry.responses[inquiry.responses.length - 1];
        if (lastResponse && lastSeenResponseIdRef.current !== lastResponse.id) {
          sendSeenReceipt({
            inquiryId: inquiry.id,
            lastSeenResponseId: lastResponse.id,
            viewerId,
            viewerIsDealer: youAreDealer,
          });
          lastSeenResponseIdRef.current = lastResponse.id;
        }
        setNewMessageArrived(false);
        setShowScrollButton(false);
      } else if (newMessageArrived) {
        setShowScrollButton(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [
    inquiry.responses,
    newMessageArrived,
    viewerId,
    youAreDealer,
    sendSeenReceipt,
  ]);

  const handleSend = () => {
    if (message.trim()) {
      sendChatMessage({
        inquiryId: inquiry.id,
        senderUserId: viewerId,
        message,
        fromDealer: youAreDealer,
      });
      setMessage("");
    }
  };

  const handleScrollToBottom = () => {
    const container = listRef.current;
    if (!container || !inquiry?.responses?.length) return;

    container.scrollTop = container.scrollHeight;

    const lastResponse = inquiry.responses[inquiry.responses.length - 1];

    sendSeenReceipt({
      inquiryId: inquiry.id,
      lastSeenResponseId: lastResponse.id,
      viewerId,
      viewerIsDealer: youAreDealer,
    });

    lastSeenResponseIdRef.current = lastResponse.id;
    setShowScrollButton(false);
  };

  const renderStatusIcon = (isSeen) => {
    if (isSeen) {
      return <span className="text-blue-500 text-sm">✓✓</span>;
    }
    return <span className="text-gray-500 text-sm">✓</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 h-full"
    >
      <Card
        ref={listRef}
        className="flex-1 max-h-[50vh] overflow-y-scroll bg-white dark:bg-dark-accent shadow rounded-2xl"
      >
        <List
          dataSource={inquiry.responses}
          renderItem={(response, idx) => {
            const youSentThis = youAreDealer
              ? response.fromDealer
              : !response.fromDealer;
            const senderLabel = youSentThis
              ? "You"
              : youAreDealer
              ? "User"
              : "Dealer";
            const isLast = idx === inquiry.responses.length - 1;
            const isSeen = youAreDealer
              ? response.seenByUser
              : response.seenByDealer;

            return (
              <List.Item key={response.id || idx}>
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
                    <div className="flex justify-between items-center">
                      <span>{senderLabel}</span>
                      <span className="text-xs flex flex-col items-end text-gray-500">
                        {response.createdAt
                          ? dayjs(response.createdAt).fromNow()
                          : ""}
                      </span>
                    </div>
                  }
                  description={
                    <div className="flex justify-between items-end mt-2">
                      <span
                        className={`flex-1 pr-4 ${
                          isLast && youSentThis ? "-mt-1" : ""
                        }`}
                      >
                        {response.message}
                      </span>
                      {isLast && youSentThis && renderStatusIcon(isSeen)}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>

      {showScrollButton && (
        <div className="flex justify-center">
          <Button size="small" type="primary" onClick={handleScrollToBottom}>
            New message ↓
          </Button>
        </div>
      )}

      <div className="flex gap-2">
        <TextArea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply..."
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </motion.div>
  );
};

export default InquiryChatPanel;
