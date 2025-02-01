import MainLayout from "../component/layout/MainLayout";
import Navbar1 from "../pages/main/Navbar1";
import Navbar2 from "../pages/main/Navbar2";

export const UserPaths = [
  { path: "home", name: "Home" },
  { path: "shop", name: "Shop" },
  { path: "orders", name: "My Orders" },
  { path: "profile", name: "Profile" },
  { path: "wishlist", name: "Wishlist" },
  { path: "contact", name: "Contact Us" },
  { path: "about", name: "About Us" },
];

export const itemsDummy = [
  {
    name: "Home",
    path: "home",
    element: <MainLayout />,
  },
  {
    path: "shop",
    element: <Navbar1 />,
  },
  {
    path: "orders",
    element: <Navbar2 />,
  },
];
