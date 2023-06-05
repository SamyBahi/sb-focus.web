import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/root/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root/Root";
import Signup from "./pages/root/Signup";
import Signin from "./pages/root/Signin";
import App from "./pages/app/App";
import { AuthContextProvider } from "./context/AuthContext";
import AppLayout from "./pages/app/AppLayout";

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
  {
    path: "/app",
    element: <AppLayout />,
    children: [{ path: "", element: <App /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
