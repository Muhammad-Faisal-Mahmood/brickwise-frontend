import axiosInstance from "../../api/axiosInstance";
import { loginStart, loginSuccess, loginFailure } from "../features/authSlice";

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.get("/auth/me"); // your backend endpoint
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "Not authenticated")
    );
  }
};
