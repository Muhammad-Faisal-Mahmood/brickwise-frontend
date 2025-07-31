import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./features/propertySlice";
import themeReducer from "./features/themeSlice";
import dealerReducer from "./features/dealerSlice";
import authReducer from "./features/authSlice";
import favoritesReducer from "./features/favoritesSlice";
import inquiryReducer from "./features/inquirySlice";
export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    theme: themeReducer,
    dealers: dealerReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    inquiries: inquiryReducer,
  },
});
