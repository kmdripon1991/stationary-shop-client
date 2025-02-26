import ProtectedRoutes from "../component/layout/ProtectedRoutes";
import AdminLayout from "../component/layout/AdminLayout";
import Shop from "../pages/main/Shop";
import CreateProduct from "../pages/admin/CreateProduct";
import Dashboard from "../component/Dashboard";
import Order from "../pages/main/Orders";

const adminRoutes = [
  {
    path: "/admin",
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
        path: "products",
        element: <Shop />,
      },
      {
        path: "orders",
        element: <Order />,
      },
      {
        path: "products/create-product",
        element: <CreateProduct />,
      },
    ],
  },
];

export default adminRoutes;
