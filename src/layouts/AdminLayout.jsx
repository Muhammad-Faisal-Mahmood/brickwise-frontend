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
  const { logout } = useAuth(messageApi);

  const handleLogout = async () => {
    try {
      const logoutData = await logout();
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
        width={300}
      >
        <div className="text-center text-dark-logo text-xl font-bold py-4">
          {collapsed ? "BW" : "BRICKWISE"}
        </div>
        <Menu
          theme="dark"
          className="bg-slate-950 dark:bg-dark-backDrop"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/admin/users",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Users</Link>,
            },
            {
              key: "/admin/blacklisted-dealers",
              icon: <LockOutlined />,
              label: (
                <Link to="/admin/blacklisted-dealers">Blacklisted Dealers</Link>
              ),
            },
            {
              key: "/admin/dealers",
              icon: <ShopOutlined />,
              label: <Link to="/admin/dealers">Approved Dealers</Link>,
            },
            {
              key: "/admin/dealer-registries",
              icon: <SolutionOutlined />,
              label: (
                <Link to="/admin/dealer-registries">Dealer Applications</Link>
              ),
            },
            {
              key: "/admin/properties",
              icon: <HomeOutlined />, // add: import { HomeOutlined } from "@ant-design/icons"
              label: <Link to="/admin/properties">Properties</Link>,
            },
            {
              key: "/admin/contact-messages",
              icon: <MessageOutlined />,
              label: <Link to="/admin/contact-messages">Contact Messages</Link>,
            },
            {
              key: "/admin/profile",
              icon: <IdcardOutlined />,
              label: <Link to="/admin/profile">Profile</Link>,
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
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip placement="bottom" title="Toggle Dark Mode">
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

export default AdminLayout;
