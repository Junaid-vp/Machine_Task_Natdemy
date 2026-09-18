import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";

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
        element: <div>Properties</div>,
      },
      {
        path: "property/:slug",
        element: <div>Property Details</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
]);

export default router;