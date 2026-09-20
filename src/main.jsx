import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";

import router from "./routes/router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PropertyProvider>
      <RouterProvider router={router} />
    </PropertyProvider>
  </StrictMode>
);