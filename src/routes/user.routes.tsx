import Orders from "../pages/main/Orders";
import ProtectedRoutes from "../component/layout/ProtectedRoutes";
import AdminLayout from "../component/layout/AdminLayout";
import Dashboard from "../component/Dashboard";
import Cart from "../pages/main/Cart";
// import Cart from "../pages/main/Cart";

const userRoutes = [
 
  {
    path: "/user",
    element: (
      <ProtectedRoutes>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "my-orders",
        element: <Orders />,
      },
      {
        path: "carts",
        element: <Cart />,
      }
    ],
  },
];

export default userRoutes;
