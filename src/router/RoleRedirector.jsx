import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoleRedirector() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if the user is on the root path ("/")
    // This prevents the redirect from happening when the user is already
    // navigating within their dashboard.
    if (location.pathname === "/") {
      if (user?.role === "DEALER") {
        navigate("/dealer-dashboard/created-properties");
      } else if (user?.role === "ADMIN") {
        navigate("/admin/users");
      }
    }
    // USER → do nothing
  }, [user, navigate, location]);

  return null; // nothing to render
}
