// src/components/VisitorOnlyWrapper.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const VisitorOnlyWrapper = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // If user is authenticated and has DEALER or ADMIN role, redirect them
  if (isAuthenticated && user?.role) {
    if (user.role === "DEALER") {
      return <Navigate to="/dealer-dashboard/created-properties" replace />;
    }
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/users" replace />;
    }
  }

  // Allow access for:
  // 1. Non-authenticated users
  // 2. Authenticated users with USER role
  return children;
};

export default VisitorOnlyWrapper;
