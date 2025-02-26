import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/main/Home/Home";
import Shop from "../pages/main/Shop";
import ProductDetails from "../component/ProductDetails";
import About from "../pages/About";
import VerifyOrder from "../pages/VerifyOrder";
import Login from "../pages/Login";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes";
import Signup from "../pages/Signup";
import Categories from "../pages/main/Categories";

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
        path: "categories/:category",
        element: <Categories />,
      },

      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "verify",
        element: <VerifyOrder />,
      },

      //...userRoutes,
    ],
  },
  ...userRoutes,
  ...adminRoutes,
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
