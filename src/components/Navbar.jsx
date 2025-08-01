import { Avatar, Button, Drawer, Dropdown, Menu, message, Tooltip } from "antd";
import { motion } from "framer-motion";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../redux/features/themeSlice";
import { BulbOutlined } from "@ant-design/icons";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";
import { fetchFavoritePropertiesDetails } from "../redux/features/favoritesSlice";
import FavoriteDropdown from "./FavoriteDropDown";

const Navbar = ({ navItems, drawerVisible, setDrawerVisible }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [authOpen, setAuthOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const items = useSelector((state) => state.favorites.items);
  useEffect(() => {
    if (items.length) {
      dispatch(fetchFavoritePropertiesDetails(items.map((item) => item.id)));
    }
  }, [items, dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      messageApi.open({ type: "success", content: "Logged out successfully" });
    } catch (error) {
      messageApi.open({ type: "error", content: "Logout failed" });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="inquires">
        <Link to="/inquires">Inquries</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  // Determine active tab based on current route
  const activeTab =
    navItems.find(
      (item) =>
        location.pathname === item.url ||
        location.pathname.startsWith(`${item.url}/`)
    )?.name || "";

  // Reset layoutId when route changes to prevent animation issues
  const [layoutKey, setLayoutKey] = useState(0);

  useEffect(() => {
    // Force re-render of the motion component when route changes
    setLayoutKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <>
      {contextHolder}
      <nav className="hidden lg:flex relative space-x-4 z-50 h-full items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <div key={item.name} className="relative h-full flex items-center">
              <Link
                to={item.url}
                className={`px-4 py-2 font-medium transition-colors relative block ${
                  isActive
                    ? "text-primary-heading dark:text-dark-heading"
                    : "text-gray-700 hover:text-primary-brandColor1"
                }`}
              >
                <span className="relative block">
                  {item.name}
                  {isActive && (
                    <motion.div
                      key={layoutKey} // Force remount on route change
                      className="absolute -bottom-2 left-0 w-full h-1 bg-primary-brandColor1 rounded-full"
                      layoutId={`header-underline-${layoutKey}`} // Dynamic layoutId
                      transition={{
                        type: "spring",
                        stiffness: 800,
                        damping: 50,
                      }}
                      initial={{ opacity: 0, scaleX: 0 }} // Start from center
                      animate={{ opacity: 1, scaleX: 1 }}
                      style={{ transformOrigin: "center" }}
                    />
                  )}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden">
        <MenuOutlined
          onClick={() => setDrawerVisible(true)}
          style={{ fontSize: "24px", color: "#1f2937" }}
        />
      </div>

      {/* Login */}
      <div className="hidden lg:flex items-center gap-2">
        {auth.isAuthenticated && auth.user ? (
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar
              size={30}
              style={{
                backgroundColor: "#1890ff",
                cursor: "pointer",
              }}
            >
              {auth.user.name ? (
                auth.user.name.charAt(0).toUpperCase()
              ) : (
                <UserOutlined />
              )}
            </Avatar>
          </Dropdown>
        ) : (
          <Button
            className="px-8"
            type="default"
            onClick={() => setAuthOpen(true)}
          >
            Login
          </Button>
        )}

        {auth.isAuthenticated && <FavoriteDropdown />}

        <Tooltip placement="top" title={"Theme switch"} arrow={true}>
          <Button
            shape="circle"
            icon={<BulbOutlined />}
            onClick={() => dispatch(toggleDarkMode())}
            title="Toggle Dark Mode"
          />
        </Tooltip>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={<Logo />}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className="flex flex-col  space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setDrawerVisible(false)}
              className={`block px-2 py-2 text-lg font-medium ${
                activeTab === item.name
                  ? "text-primary-brandColor1"
                  : "text-gray-700 hover:text-primary-brandColor1Hover"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex gap-2 items-center">
            {auth.isAuthenticated && auth.user ? (
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Avatar
                  style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
                  size={30}
                >
                  {auth.user.name ? (
                    auth.user.name.charAt(0).toUpperCase()
                  ) : (
                    <UserOutlined />
                  )}
                </Avatar>
              </Dropdown>
            ) : (
              <Button onClick={() => setAuthOpen(true)} type="primary">
                Login
              </Button>
            )}

            {auth.isAuthenticated && <FavoriteDropdown />}
            <Tooltip placement="top" title={"Theme switch"} arrow={true}>
              <Button
                shape="circle"
                icon={<BulbOutlined />}
                onClick={() => dispatch(toggleDarkMode())}
                title="Toggle Dark Mode"
              />
            </Tooltip>
          </div>
        </div>
      </Drawer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Navbar;
