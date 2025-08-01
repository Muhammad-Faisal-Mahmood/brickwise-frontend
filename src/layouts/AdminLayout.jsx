// src/layouts/AdminLayout.jsx
import { Layout, Menu, Dropdown, Avatar, Button, Tooltip, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShopOutlined,
  SolutionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  IdcardOutlined,
  HomeOutlined,
  LockOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../redux/features/themeSlice";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth(messageApi);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);

      // Force collapse on mobile
      if (mobile) {
        setCollapsed(true);
      }
    };

    // Check on mount
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleCollapse = () => {
    // Don't allow expanding on mobile
    if (isMobile) {
      return;
    }
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      const logoutData = await logout();
    } catch (error) {
      console.error(error);
      messageApi.open({ type: "error", content: "Logout failed" });
    }
  };

  // Handle menu item clicks for mobile navigation
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Menu items configuration
  const menuItems = [
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Users</Link>,
      title: "Users",
    },
    {
      key: "/admin/blacklisted-dealers",
      icon: <LockOutlined />,
      label: <Link to="/admin/blacklisted-dealers">Blacklisted Dealers</Link>,
      title: "Blacklisted Dealers",
    },
    {
      key: "/admin/dealers",
      icon: <ShopOutlined />,
      label: <Link to="/admin/dealers">Approved Dealers</Link>,
      title: "Approved Dealers",
    },
    {
      key: "/admin/dealer-registries",
      icon: <SolutionOutlined />,
      label: <Link to="/admin/dealer-registries">Dealer Applications</Link>,
      title: "Dealer Applications",
    },
    {
      key: "/admin/properties",
      icon: <HomeOutlined />,
      label: <Link to="/admin/properties">Properties</Link>,
      title: "Properties",
    },
    {
      key: "/admin/contact-messages",
      icon: <MessageOutlined />,
      label: <Link to="/admin/contact-messages">Contact Messages</Link>,
      title: "Contact Messages",
    },
    {
      key: "/admin/profile",
      icon: <IdcardOutlined />,
      label: <Link to="/admin/profile">Profile</Link>,
      title: "Profile",
    },
  ];

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Sider
        className="dark:bg-dark-backDrop bg-slate-950"
        collapsed={collapsed}
        collapsible={!isMobile} // Disable collapse button on mobile
        trigger={null} // We'll use our custom trigger
        width={isMobile ? 60 : 300} // Smaller width on mobile
        collapsedWidth={isMobile ? 60 : 80} // Consistent mobile width
        breakpoint="md" // This helps with responsive behavior
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
      >
        <div className="text-center text-dark-logo text-xl font-bold py-4">
          {collapsed ? "BW" : "BRICKWISE"}
        </div>
        <Menu
          theme="dark"
          className="bg-slate-950 dark:bg-dark-backDrop"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={isMobile && collapsed ? handleMenuClick : undefined}
          items={menuItems.map((item) => ({
            ...item,
            // For mobile collapsed, show title text instead of Link to maintain clickability
            label: isMobile && collapsed ? item.title : item.label,
          }))}
        />
      </Sider>
      <Layout>
        <Header className="flex justify-between items-center px-4 bg-primary-backDrop dark:bg-dark-accent shadow">
          <div className="flex items-center gap-2">
            {/* Only show toggle button on desktop */}
            {!isMobile && (
              <Button
                className="bg-neutral-300 dark:bg-neutral-700"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleToggleCollapse}
              />
            )}
            <span className="text-primary-heading dark:text-dark-heading text-lg font-semibold">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip placement="bottom" title="Toggle Dark Mode">
              <Button
                shape="circle"
                size={isMobile ? "small" : "middle"}
                icon={<BulbOutlined />}
                onClick={() => dispatch(toggleDarkMode())}
              />
            </Tooltip>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Avatar
                size={isMobile ? "small" : "default"}
                style={{ backgroundColor: "#10b981", cursor: "pointer" }}
              >
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <UserOutlined />
                )}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-2 md:p-4 lg:p-8 bg-primary-backDrop dark:bg-dark-accent">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
