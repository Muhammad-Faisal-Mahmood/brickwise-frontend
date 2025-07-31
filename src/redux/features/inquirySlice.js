import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// POST /api/inquiries
export const createInquiry = createAsyncThunk(
  "inquiries/createInquiry",
  async ({ propertyId, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/inquiries", {
        propertyId,
        message,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create inquiry"
      );
    }
  }
);

// GET /api/inquiries/user
export const fetchUserInquiries = createAsyncThunk(
  "inquiries/fetchUserInquiries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/inquiries/user");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user inquiries"
      );
    }
  }
);

// GET /api/inquiries/dealer
export const fetchDealerInquiries = createAsyncThunk(
  "inquiries/fetchDealerInquiries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/inquiries/dealer");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch dealer inquiries"
      );
    }
  }
);

// GET /api/inquiries/{id}
export const getInquiryById = createAsyncThunk(
  "inquiries/getInquiryById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/inquiries/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch inquiry details"
      );
    }
  }
);

// POST /api/inquiries/{id}/responses
export const addResponse = createAsyncThunk(
  "inquiries/addResponse",
  async ({ inquiryId, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/inquiries/${inquiryId}/responses`,
        { message }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add response"
      );
    }
  }
);

const inquirySlice = createSlice({
  name: "inquiries",
  initialState: {
    inquiries: [], // list of all inquiries
    selectedInquiry: null, // single inquiry details for chat
    loadingList: false,
    loadingDetail: false,
    addingResponse: false,
    errorList: null,
    errorDetail: null,
  },
  reducers: {
    clearInquiryErrors(state) {
      state.errorList = null;
      state.errorDetail = null;
    },
    clearSelectedInquiry(state) {
      state.selectedInquiry = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Inquiry
      .addCase(createInquiry.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.loadingList = false;
        state.inquiries.push(action.payload);
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Fetch User Inquiries
      .addCase(fetchUserInquiries.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchUserInquiries.fulfilled, (state, action) => {
        state.loadingList = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchUserInquiries.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Fetch Dealer Inquiries
      .addCase(fetchDealerInquiries.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchDealerInquiries.fulfilled, (state, action) => {
        state.loadingList = false;
        state.inquiries = action.payload;
      })
      .addCase(fetchDealerInquiries.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Get Inquiry by ID
      .addCase(getInquiryById.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(getInquiryById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.selectedInquiry = action.payload;
      })
      .addCase(getInquiryById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      })

      // Add Response
      .addCase(addResponse.pending, (state) => {
        state.addingResponse = true;
        state.errorDetail = null;
      })
      .addCase(addResponse.fulfilled, (state, action) => {
        state.addingResponse = false;
        state.selectedInquiry = action.payload; // updated inquiry from backend
      })
      .addCase(addResponse.rejected, (state, action) => {
        state.addingResponse = false;
        state.errorDetail = action.payload;
      });
  },
});

export const { clearInquiryErrors, clearSelectedInquiry } =
  inquirySlice.actions;
export default inquirySlice.reducer;
