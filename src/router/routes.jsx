import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Listing from "../pages/visitor/Listing";
import Home from "../pages/visitor/Home";
import Dealers from "../pages/visitor/Dealer";
import ListingDetails from "../pages/visitor/ListingDetails";
import ScrollToTop from "../utils/ScrollToTop";
import DealerRegister from "../pages/dealer/DealerRegister";
import Profile from "../pages/visitor/Profile";
import ResetPasswordPage from "../pages/common/ResetPassword";
import DealerProfile from "../pages/visitor/DealerProfile";
import VisitorLayout from "../layouts/PublicLayout";
import Users from "../pages/admin/Users";
import ApprovedDealers from "../pages/admin/ApprovedDealers";
import ProtectedRouteWrapper from "./protectedRouteWrapper";
import DealerRegistries from "../pages/admin/DealerRegistries";
import AdminLayout from "../layouts/AdminLayout";
import Properties from "../pages/admin/Properties";
import Inquiries from "../pages/visitor/Inquiries";
import HomeCostEstimator from "../pages/visitor/CostEstimator";
import DealerLayout from "../layouts/DealerLayout";
import DealerDashboardProfile from "../pages/dealer/DealerDashboardProfile";
import DealerCreatedProperties from "../pages/dealer/DealerCreatedProperties";
import CreateProperty from "../pages/dealer/DealerCreateProperty";
import ContactUs from "../pages/visitor/ContactUs";
import ContactMessages from "../pages/admin/ContactMessages";
import BlacklistedDealers from "../pages/admin/BlacklistedDealers";
import RoleRedirector from "./RoleRedirector";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop>
        <RoleRedirector />
        <Routes>
          <Route path="/" element={<VisitorLayout />}>
            <Route index element={<Home />} />
            <Route path="listings" element={<Listing />} />
            <Route path="listings/:id" element={<ListingDetails />} />
            <Route path="dealers" element={<Dealers />} />
            <Route path="dealers/:id" element={<DealerProfile />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route
              path="profile"
              element={
                <ProtectedRouteWrapper allowedRoles={["USER"]}>
                  <Profile />
                </ProtectedRouteWrapper>
              }
            />

            <Route
              path="inquires"
              element={
                <ProtectedRouteWrapper allowedRoles={["USER"]}>
                  <Inquiries />
                </ProtectedRouteWrapper>
              }
            />

            <Route path="cost-estimator" element={<HomeCostEstimator />} />
          </Route>
          <Route path="/register-dealer" element={<DealerRegister />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRouteWrapper allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </ProtectedRouteWrapper>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="dealers" element={<ApprovedDealers />} />
            <Route path="dealer-registries" element={<DealerRegistries />} />
            <Route path="profile" element={<Profile />} />
            <Route path="properties" element={<Properties />} />
            <Route path="contact-messages" element={<ContactMessages />} />
            <Route
              path="blacklisted-dealers"
              element={<BlacklistedDealers />}
            />
          </Route>

          <Route
            path="/dealer-dashboard"
            element={
              <ProtectedRouteWrapper allowedRoles={["DEALER"]}>
                <DealerLayout />
              </ProtectedRouteWrapper>
            }
          >
            <Route path="profile" element={<DealerDashboardProfile />} />
            <Route
              path="created-properties"
              element={<DealerCreatedProperties />}
            />
            <Route path="create-property" element={<CreateProperty />} />
            <Route path="inquires" element={<Inquiries />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default AppRoutes;
