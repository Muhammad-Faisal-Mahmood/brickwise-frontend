import { useState } from "react";
import { message } from "antd";

const VITE_USER_SERVICE_BASE_URL = import.meta.env.VITE_USER_SERVICE_BASE_URL;

export const useDealerRegister = () => {
  const [loading, setLoading] = useState(false);

  const registerDealer = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${VITE_USER_SERVICE_BASE_URL}/dealer/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success(data.message || "Dealer registration successful!");
        return { success: true, data };
      } else {
        message.error(data.message || "Registration failed.");
        return { success: false, data };
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An error occurred during registration. Please try again.");
      return { success: false, data: null };
    } finally {
      setLoading(false);
    }
  };

  return { registerDealer, loading };
};
