import { useCallback } from "react";
import axiosInstance from "../api/axiosInstance"; // adjust the path if needed
import { message as antdMessage } from "antd";

const useContactUs = () => {
  const submitContactUs = useCallback(async (data) => {
    try {
      const response = await axiosInstance.post("/contact-us", data);
      console.log("response", response);

      return response.data.message; // this would be ContactUsMessageResponseDto
    } catch (error) {
      console.error("Failed to send contact message:", error);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to send your message. Please try again.";

      throw error; // optional: rethrow if the caller wants to handle it
    }
  }, []);

  return { submitContactUs };
};

export default useContactUs;
