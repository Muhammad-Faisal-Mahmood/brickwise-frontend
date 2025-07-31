// src/hooks/useChatSocket.js
import { useEffect } from "react";
import {
  connectChatSocket,
  disconnectChatSocket,
  sendChatMessage,
  sendSeenReceipt,
} from "../socket/chatSocket";
import { useDispatch } from "react-redux";
import { setSelectedInquiryFromSocket } from "../redux/features/inquirySlice";

export default function useChatSocket(inquiryId) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inquiryId) return;

    connectChatSocket({
      inquiryId,
      onMessageReceived: (data) => {
        dispatch(setSelectedInquiryFromSocket(data));
      },
    });

    return () => {
      disconnectChatSocket();
    };
  }, [inquiryId, dispatch]);

  return { sendChatMessage, sendSeenReceipt };
}
