// /* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Badge, Button, Menu, Space, Dropdown } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import Search from "../Search";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { AppDispatch, RootState } from "../../redux/store";
import {
  logOut,
  selectCurrentUser,
  TUser,
} from "../../redux/features/auth/authSlice";

// Constants
const navLinks = [
  { key: "home", label: "Home", path: "/" },
  { key: "shop", label: "Shop", path: "/shop" },
  {
    key: "categories",
    label: "Categories",
    children: [
      { key: "writing", label: "Writing", path: "categories/writing" },
      {
        key: "office supplies",
        label: "Office Supplies",
        path: "categories/office-supplies",
      },
      {
        key: "art Supplies",
        label: "Art Supplies",
        path: "categories/art-supplies",
      },
      {
        key: "educational",
        label: "Educational",
        path: "categories/educational",
      },
      { key: "technology", label: "Technology", path: "categories/technology" },
    ],
  },
  { key: "about", label: "About", path: "/about" },
];

const categoryKeys = [
  "writing",
  "office supplies",
  "art Supplies",
  "educational",
  "technology",
];

// Types
type TNavLinkItem = {
  key: string;
  label: string;
  path?: string;
  children?: TNavLinkItem[];
};

type TMenuItem = {
  key: string;
  label: React.ReactNode;
  children?: TMenuItem[];
  onClick?: () => void;
};

type TProfileMenuItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: (
    dispatch: AppDispatch,
    navigate: ReturnType<typeof useNavigate>
  ) => void;
};

// Helper Functions
const generateMenuItems = (navLinks: TNavLinkItem[]): TMenuItem[] =>
  navLinks.map(({ key, label, path, children }) => ({
    key,
    label: (
      <NavLink
        to={path || "#"}
        style={({ isActive }) => ({
          fontWeight: isActive ? "bold" : "normal",
          color: "white",
        })}
        end
      >
        {label}
      </NavLink>
    ),
    children: children?.map(({ key, label, path }) => ({
      key,
      label: path ? (
        <NavLink
          to={path}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
          })}
          end
        >
          {label}
        </NavLink>
      ) : (
        <span>{label}</span>
      ),
    })),
  }));

const profileMenuItems = (user: TUser | null): TProfileMenuItem[] => {
  if (user) {
    // User is authenticated
    return [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/user/dashboard",
      },
      {
        key: "logout",
        label: "Logout",
        icon: <LoginOutlined />,
        onClick: (dispatch, navigate) => {
          dispatch(logOut());
          navigate("/");
        },
      },
    ];
  } else {
    // User is not authenticated
    return [
      { key: "login", label: "Login", icon: <LoginOutlined />, path: "/login" },
      {
        key: "signup",
        label: "Signup",
        icon: <UserAddOutlined />,
        path: "/signup",
      },
    ];
  }
};

const generateProfileItems = (
  user: TUser | null,
  dispatch: AppDispatch,
  navigate: ReturnType<typeof useNavigate>
): TMenuItem[] =>
  profileMenuItems(user).map(({ key, label, icon, path, onClick }) => ({
    key,
    label: (
      <Space>
        {icon}
        {label}
      </Space>
    ),
    onClick: () => {
      if (onClick) {
        onClick(dispatch, navigate);
      } else if (path) {
        navigate(path);
      }
    },
  }));

// Main Component
const NavbarItems = () => {
  const { items } = useAppSelector((state: RootState) => state.carts);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/user/carts");
    }
  };

  const handleCategories = (key: string) => {
    if (categoryKeys.includes(key)) {
      const formattedValue = key.replace(/\s+/g, "-");
      navigate(`/categories/${formattedValue}`);
    }
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "100px",
        background: "#001529",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left Section: Logo */}
      <img
        src="/src/assets/logo/st-logo.png"
        alt="Stationery Haven Logo"
        style={{ height: "90px", marginRight: "16px" }}
      />

      {/* Middle Section: Navigation Menu */}
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={generateMenuItems(navLinks)}
        style={{
          flex: 1,
          justifyContent: "center",
          borderBottom: "none",
          background: "transparent",
        }}
        onClick={({ key }) => handleCategories(key)}
      />

      {/* Right Section: Search, Cart, and Login */}
      <Space size="middle">
        <Search />

        {/* Cart Button */}
        <Badge count={user ? items.length : 0} showZero>
          <Button
            type="text"
            icon={
              <ShoppingCartOutlined
                style={{ fontSize: "24px", color: "white" }}
              />
            }
            onClick={handleCartClick}
          />
        </Badge>

        {/* Profile Dropdown */}
        <Dropdown
          menu={{ items: generateProfileItems(user, dispatch, navigate) }}
          trigger={["click"]}
        >
          <Button
            type="default"
            shape="round"
            icon={<UserOutlined />}
            size="large"
            style={{ padding: "0 16px" }}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default NavbarItems;
