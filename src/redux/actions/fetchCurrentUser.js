import axiosInstance from "../../api/axiosInstance";
import { loginStart, loginSuccess, loginFailure } from "../features/authSlice";
import { setFavorites } from "../features/favoritesSlice";

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.get("/auth/me");
    dispatch(loginSuccess(res.data));

    // hydrate favorite IDs into favorites slice
    dispatch(setFavorites(res.data.favoritePropertyIds || []));

    console.log("res", res);
    return res;
  } catch (error) {
    dispatch(
      loginFailure(error.response?.data?.message || "Not authenticated")
    );
  }
};
