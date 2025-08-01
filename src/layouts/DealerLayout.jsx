// src/layouts/DealerLayout.jsx
import { Layout, Menu, Dropdown, Avatar, Button, Tooltip, message } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  IdcardOutlined,
  HomeOutlined,
  StarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  UserOutlined,
  PlusSquareOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../redux/features/themeSlice";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider, Content } = Layout;

const DealerLayout = () => {
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
      await logout();
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
      key: "/dealer-dashboard/profile",
      icon: <IdcardOutlined />,
      label: <Link to="/dealer-dashboard/profile">Profile</Link>,
      title: "Profile",
    },
    {
      key: "/dealer-dashboard/created-properties",

      icon: <HomeOutlined />,
      label: (
        <Link to="/dealer-dashboard/created-properties">My Properties</Link>
      ),
      title: "My Properties",
    },
    {
      key: "/dealer-dashboard/create-property",
      icon: <PlusCircleOutlined />,
      label: (
        <Link to="/dealer-dashboard/create-property">Create Property</Link>
      ),
      title: "Create Property",
    },
    {
      key: "/dealer-dashboard/inquires",
      icon: <StarOutlined />,
      label: <Link to="/dealer-dashboard/inquires">Inquires</Link>,
      title: "Inquires",
    },
  ];

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Sider
        className="dark:bg-dark-backDrop bg-slate-950"
        collapsed={collapsed}
        collapsible={!isMobile}
        trigger={null}
        width={isMobile ? 60 : 250}
        collapsedWidth={isMobile ? 60 : 80}
        breakpoint="md"
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
          mode="inline"
          selectedKeys={[location.pathname]}
          className="bg-slate-950 dark:bg-dark-backDrop"
          onClick={isMobile && collapsed ? handleMenuClick : undefined}
          items={menuItems.map((item) => ({
            ...item,
            // For mobile collapsed, remove the Link wrapper but keep the item clickable
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
              Dealer Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip title="Toggle Dark Mode">
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
                style={{ cursor: "pointer" }}
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

export default DealerLayout;
