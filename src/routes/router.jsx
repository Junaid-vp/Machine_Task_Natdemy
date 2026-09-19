import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyPage from "../pages/PropertyPage";
import NotFound from "../pages/NotFound";

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;