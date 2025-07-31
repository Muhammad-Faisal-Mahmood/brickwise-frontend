// src/layouts/DealerLayout.jsx
import { Layout, Menu, Dropdown, Avatar, Button, Tooltip, message } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  IdcardOutlined,
  HomeOutlined,
  StarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../redux/features/themeSlice";
import { useAuth } from "../hooks/useAuth";

const { Header, Sider, Content } = Layout;

const DealerLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth(messageApi);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
      messageApi.open({ type: "error", content: "Logout failed" });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Sider
        className="dark:bg-dark-backDrop bg-slate-950"
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
      >
        <div className="text-center text-dark-logo text-xl font-bold py-4">
          {collapsed ? "BW" : "BRICKWISE"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          className="bg-slate-950 dark:bg-dark-backDrop"
          items={[
            {
              key: "/dealer-dashboard/profile",
              icon: <IdcardOutlined />,
              label: <Link to="/dealer-dashboard/profile">Profile</Link>,
            },
            {
              key: "/dealer-dashboard/properties",
              icon: <HomeOutlined />,
              label: (
                <Link to="/dealer-dashboard/created-properties">
                  My Properties
                </Link>
              ),
            },
            {
              key: "/dealer-dashboard/create-property",
              icon: <HomeOutlined />,
              label: (
                <Link to="/dealer-dashboard/create-property">
                  Create Property
                </Link>
              ),
            },
            {
              key: "/dealer-dashboard/inquires",
              icon: <StarOutlined />,
              label: <Link to="/dealer-dashboard/inquires">Inquires</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="flex justify-between items-center px-4 bg-primary-backDrop dark:bg-dark-accent shadow">
          <div className="flex items-center gap-2">
            <Button
              className="bg-neutral-300 dark:bg-neutral-700"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <span className="text-primary-heading dark:text-dark-heading text-lg font-semibold">
              Dealer Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip title="Toggle Dark Mode">
              <Button
                shape="circle"
                icon={<BulbOutlined />}
                onClick={() => dispatch(toggleDarkMode())}
              />
            </Tooltip>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
              <Avatar style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <UserOutlined />
                )}
              </Avatar>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-4 md:p-8 bg-primary-backDrop dark:bg-dark-accent">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DealerLayout;
