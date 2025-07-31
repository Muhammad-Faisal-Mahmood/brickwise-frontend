import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // Store the user data received from the backend
      state.error = null;
      // You might also want to store a token in localStorage here if your backend returns one
      // localStorage.setItem('authToken', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    updateUserName: (state, action) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    // You can add similar reducers for registration if needed
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserName,
} = authSlice.actions;
export default authSlice.reducer;
