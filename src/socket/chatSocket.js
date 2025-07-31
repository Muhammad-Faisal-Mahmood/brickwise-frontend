// src/socket/chatSocket.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectChatSocket = ({ inquiryId, onMessageReceived }) => {
  // Connect once per inquiryId
  stompClient = new Client({
    webSocketFactory: () => new SockJS("/ws"), // adjust if your backend ws endpoint is /ws
    onConnect: () => {
      console.log("WebSocket connected");

      stompClient.subscribe(`/topic/inquiries/${inquiryId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessageReceived(data);
      });
    },
    onDisconnect: () => {
      console.log("WebSocket disconnected");
    },
    debug: (str) => console.log(str),
  });

  stompClient.activate();
};

export const disconnectChatSocket = () => {
  if (stompClient) stompClient.deactivate();
};

export const sendChatMessage = (payload) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(payload),
    });
  }
};

export const sendSeenReceipt = (payload) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/chat.markAsSeen",
      body: JSON.stringify(payload),
    });
  }
};
