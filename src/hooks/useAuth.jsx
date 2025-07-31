import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { logout as logoutAction } from "../redux/features/authSlice";
import { message } from "antd";

export const useAuth = (messageApi) => {
  const dispatch = useDispatch();
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(
        `/auth/login`, // Note: BaseURL is already configured, so just the endpoint path
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axiosInstance.post(
        `/auth/register`, // Note: BaseURL is already configured
        {
          name,
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  };

  const logout = async () => {
    try {
      // Make API call to backend logout endpoint
      const logoutData = await axiosInstance.post("/auth/logout");
      // Dispatch the Redux logout action
      dispatch(logoutAction()); // Use the aliased action
      return logoutData?.data?.message;
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Even if API call fails, we still want to clear client-side state for UX
      dispatch(logoutAction()); // Force client-side logout
      // Optionally, show a toast/notification about the API error
      throw new Error(
        "Logout failed on the server. Your local session has been cleared."
      );
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });

      // **Important**: Check the structure of `res.data` here.
      // If your backend `ApiResponse` serializes like `{ message: "...", data: null }`
      // then `res.data.message` is correct.
      // If it's just a raw string like "OTP sent!" then `res.data` is the string itself.
      // For now, let's assume `res.data` is an object with a `message` property.

      if (res.status === 200) {
        // Do NOT call messageApi.success here.
        // Instead, just return true and let AuthModal handle success messaging.
        console.log("Forgot password API success, response:", res.data); // Debugging
        return true; // Indicate success
      } else {
        // This 'else' block is still theoretically unreachable for typical axios behavior
        // on a 200-level status that isn't truly successful.
        // If it somehow gets here, it's an unexpected success structure.
        messageApi.error(
          res.data?.message || "An unexpected success response occurred."
        );
        return false;
      }
    } catch (error) {
      console.error("Forgot password error caught:", error); // Debugging
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send OTP. Please check your email and try again.";
      messageApi.error(errorMessage); // Still show error messages using the passed messageApi
      return false;
    }
  };

  const resetPassword = async (email, newPassword, resetToken) => {
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword,
        resetToken,
      });

      messageApi.open({
        type: "success",
        content: res.data?.message + ", you can now login",
      });
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      const msg = error.response?.data?.message || "Failed to reset password";
      messageApi.open({ type: "error", content: msg });
      return false;
    }
  };

  return { login, register, logout, forgotPassword, resetPassword };
};
