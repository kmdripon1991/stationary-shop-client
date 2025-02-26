import { Layout, Menu } from "antd";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Header } from "antd/es/layout/layout";
import NavbarItems from "../../component/layout/NavbarItems";

const { Content, Sider } = Layout;

const AdminDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };

  const menuItemsAdmin = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Products",
      children: [
        {
          key: "/admin/products",
          icon: <AppstoreOutlined />,
          label: <NavLink to="/admin/products">View Products</NavLink>,
        },
        {
          key: "/admin/products/create-product",
          icon: <AppstoreAddOutlined />,
          label: (
            <NavLink to="/admin/products/create-product">Add Product</NavLink>
          ),
        },
      ],
    },
    {
      key: "/admin/orders",
      icon: <ShoppingCartOutlined />,
      label: <NavLink to="/admin/orders">Orders</NavLink>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const menuItemsUser = [
    {
      key: "/user/dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="/user/dashboard">Dashboard</NavLink>,
    },
    {
      key: "/user/my-orders",
      icon: <ShoppingCartOutlined />,
      label: <NavLink to="/user/my-orders">Orders</NavLink>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const menuItems = user?.role === "admin" ? menuItemsAdmin : menuItemsUser;

  return (
    <Layout>
      {user && user.role === "admin" ? (
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            height: "6rem",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <img
            src="https://i.ibb.co.com/QBHX70Y/st-logo.png"
            alt="Stationery Haven Logo"
            style={{
              height: "90px",
              marginRight: "16px",
            }}
          />
        </Header>
      ) : (
        <NavbarItems />
      )}

      <Layout>
        <Sider
          style={{
            height: "calc(100vh - 6rem)",
            position: "sticky",
            top: "6rem",
            left: 0,
            zIndex: 1,
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]} // Set active menu dynamically
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content
            style={{ margin: "24px 16px 0", padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
