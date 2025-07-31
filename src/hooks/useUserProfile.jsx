import { message } from "antd";
import axiosInstance from "../api/axiosInstance"; // your configured axios with baseURL

export const useUserProfileApi = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const res = await axiosInstance.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      messageApi.open({ type: "success", content: res?.data?.message });
    } catch (error) {
      console.error("Change password error:", error);
      const msg = error.response?.data?.message || "Failed to change password";
      messageApi.open({ type: "error", content: msg });
    }
  };

  const changeName = async (newName) => {
    try {
      const res = await axiosInstance.post("/auth/change-name", {
        newName,
      });
      messageApi.success(res.data.message || "Name changed successfully");
      return newName; // so caller can update Redux
    } catch (error) {
      console.error("Change name error:", error);
      const msg = error.response?.data?.message || "Failed to change name";
      messageApi.error(msg);
    }
  };

  return { changePassword, changeName, contextHolder };
};
