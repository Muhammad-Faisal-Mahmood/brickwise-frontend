import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function RoleRedirector() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const isAdminPath = path.startsWith("/admin");
    const isDealerPath = path.startsWith("/dealer-dashboard");

    if (!isAdminPath && !isDealerPath) {
      if (user?.role === "DEALER") {
        navigate("/dealer-dashboard/created-properties");
      } else if (user?.role === "ADMIN") {
        navigate("/admin/users");
      }
      // USER → do nothing
    }
  }, [user, navigate, location]);

  return null;
}
