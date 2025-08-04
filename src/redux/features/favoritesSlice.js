// src/redux/features/favoritesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import propertyAxios from "../../api/propertyAxios";
import { logout } from "./authSlice";

// Fetch favorite property IDs from user service
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/user/favorites");
      return res.data.data; // [{ id: number }]
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch favorites"
      );
    }
  }
);

// Add favorite
export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (propertyId, thunkAPI) => {
    try {
      await axiosInstance.post("/user/favorites", { propertyId });
      return propertyId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add favorite"
      );
    }
  }
);

// Remove favorite
export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (propertyId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/user/favorites/${propertyId}`);
      return propertyId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to remove favorite"
      );
    }
  }
);

// Fetch detailed property data
export const fetchFavoritePropertiesDetails = createAsyncThunk(
  "favorites/fetchPropertiesByIds",
  async (ids, thunkAPI) => {
    try {
      const res = await propertyAxios.post("/properties/by-ids", ids);
      return res.data.data; // list of detailed properties
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch property details"
      );
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // [{ id }]
    propertyDetails: [], // [{ id, title, ... }]
    loading: false,
    error: null,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload.map((id) => ({ id }));
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        // when IDs change, clear stale propertyDetails so it can be refetched
        state.propertyDetails = state.propertyDetails.filter((detail) =>
          (action.payload || []).some((item) => item.id === detail.id)
        );
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add favorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push({ id: action.payload });
        // propertyDetails will be updated separately when fetchFavoritePropertiesDetails is called
      })

      // Remove favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const removedId = action.payload;
        state.items = state.items.filter((item) => item.id !== removedId);
        state.propertyDetails = state.propertyDetails.filter(
          (property) => property.id !== removedId
        );
      })

      // Fetch property details
      .addCase(fetchFavoritePropertiesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritePropertiesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyDetails = action.payload || [];
      })
      .addCase(fetchFavoritePropertiesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear on logout
      .addCase(logout, (state) => {
        state.items = [];
        state.propertyDetails = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
