import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/root/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root/Root";
import Signup from "./pages/root/Signup";
import Signin from "./pages/root/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      { path: "/about" },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
