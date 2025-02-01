import { Button, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";

const items: MenuProps["items"] = [
  {
    key: "home",
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: "shop",
    label: <NavLink to="/shop">Shop</NavLink>,
  },
  {
    key: "category",
    label: "Category",
    children: [
      {
        key: "category1",
        label: <NavLink to="/category1">Category 1</NavLink>,
      },
      {
        key: "category2",
        label: <NavLink to="/category2">Category 2</NavLink>,
      },
      {
        key: "category3",
        label: <NavLink to="/category3">Category 3</NavLink>,
      },
    ],
  },
  {
    key: "orders",
    label: <NavLink to="/my-orders">My Orders</NavLink>,
  },
  {
    key: "carts",
    label: <NavLink to="/carts">My carts</NavLink>,
  },
  {
    key: "about",
    label: <NavLink to="/about">About</NavLink>,
  },
];

const NavbarItems = () => {
  // const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = () => {
    dispatch(logOut());
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
        justifyItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: "100px",
      }}
    >
      <img
        src="/src/assets/logo/st-logo.png"
        alt="Stationery Haven Logo"
        style={{
          height: "90px",
          marginRight: "16px",
        }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{
          flex: 1,
          justifyContent: "center", // Center menu items
          display: "flex", // Flex display to center the menu
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        {user ? (
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button type="primary" shape="round" size="large">
            <Link to="/login">Login</Link>
          </Button>
        )}

        {!user && (
          <Button type="default" shape="round" size="large">
            <Link to="/signup">Signup</Link>
          </Button>
        )}
      </div>
    </Header>
  );
};

export default NavbarItems;
