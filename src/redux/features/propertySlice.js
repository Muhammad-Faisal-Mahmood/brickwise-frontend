// features/properties/propertySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  filters: {
    location: null,
    type: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: "",
    purpose: null,
  },
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setProperties } =
  propertySlice.actions;

export const selectFilteredProperties = (state) => {
  const properties = state.properties.properties;
  const { location, type, minPrice, maxPrice, searchQuery, purpose } =
    state.properties.filters;

  return properties.filter((property) => {
    const matchesLocation = !location || property.location.includes(location);
    const matchesType = !type || property.type === type;
    const matchesMinPrice = !minPrice || property.price >= minPrice;
    const matchesMaxPrice = !maxPrice || property.price <= maxPrice;
    const matchesPurpose = !purpose || property.purpose === purpose;
    const matchesSearch =
      !searchQuery ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesLocation &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesPurpose &&
      matchesSearch
    );
  });
};

export default propertySlice.reducer;
