import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import ProtectedRoutes from "../component/layout/ProtectedRoutes";
import Orders from "../pages/main/Orders";
import Cart from "../pages/main/Cart";
import App from "../App";
import Shop from "../pages/main/Shop";
import Home from "../pages/main/Home/Home";
import ProductDetails from "../component/ProductDetails";
import VerifyOrder from "../pages/VerifyOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "my-orders",
        element: (
          <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        ),
      },
      {
        path: "carts",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/verify",
        element: <VerifyOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
