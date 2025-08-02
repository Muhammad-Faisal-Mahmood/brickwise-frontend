// features/properties/propertySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  filters: {
    location: null,
    type: null,
    minPrice: null,
    maxPrice: null,
    minSize: null,
    maxSize: null,
    bedrooms: null,
    bathrooms: null,
    floors: null,
    newConstruction: null,
    petFriendly: null,
    swimmingPool: null,
    searchQuery: "",
    purpose: null,
  },
  page: 0,
  hasMore: true,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setPropertyFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 0;
      state.hasMore = true;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 0;
      state.hasMore = true;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    appendProperties: (state, action) => {
      state.properties = [...state.properties, ...action.payload];
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
  setPropertyFilters,
  setFilters,
  resetFilters,
  setProperties,
  appendProperties,
  setLoading,
  setHasMore,
  setPage,
  setError,
} = propertySlice.actions;

// Selector for filtered properties (frontend filtering for search only)
export const selectFilteredProperties = (state) => {
  const { properties, filters } = state.properties;

  return properties.filter((property) => {
    // Only apply searchQuery on frontend
    const matchesQuery =
      !filters.searchQuery ||
      property.title
        ?.toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      property.description
        ?.toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      property.location
        ?.toLowerCase()
        .includes(filters.searchQuery.toLowerCase()) ||
      property.address
        ?.toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

    return matchesQuery;
  });
};

export default propertySlice.reducer;
