import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealers: [],
  filters: {
    searchQuery: "",
    minRating: null,
    maxReviews: null,
    city: "",
  },
  page: 0,
  hasMore: true,
  loading: false,
  error: null,
};

export const dealerSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    setDealerFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 0;
      state.hasMore = true;
    },
    setDealers: (state, action) => {
      state.dealers = action.payload;
    },
    appendDealers: (state, action) => {
      state.dealers = [...state.dealers, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDealerFilters,
  setDealers,
  appendDealers,
  setLoading,
  setHasMore,
  setPage,
  setError,
} = dealerSlice.actions;

// selector for filtered dealers
export const selectFilteredDealers = (state) => {
  const { dealers, filters } = state.dealers;

  return dealers.filter((dealer) => {
    // Only apply searchQuery on frontend
    const matchesQuery = dealer.name
      ?.toLowerCase()
      .includes((filters.searchQuery || "").toLowerCase());

    return matchesQuery;
  });
};

export default dealerSlice.reducer;
