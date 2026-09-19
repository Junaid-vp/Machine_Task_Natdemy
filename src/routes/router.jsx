import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyPage from "../pages/PropertyPage";
import NotFound from "../pages/NotFound";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminAddProperty from "../pages/admin/AdminAddProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "property/:slug",
        element: <PropertyPage />,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "add-property",
            element: <AdminAddProperty />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;