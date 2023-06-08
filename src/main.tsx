import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/root/Home";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root/Root";
import Signup from "./pages/root/Signup";
import Signin from "./pages/root/Signin";
import { AuthContextProvider } from "./context/AuthContext";
import AppLayout from "./pages/app/AppLayout";
import store from "./store";
import { Provider } from "react-redux";
import MyDay from "./pages/app/MyDay";
import Important from "./pages/app/Important";
import Planned from "./pages/app/Planned";
import Inbox from "./pages/app/Inbox";

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
    children: [
      { path: "myday", element: <MyDay /> },
      { path: "important", element: <Important /> },
      { path: "planned", element: <Planned /> },
      { path: "inbox", element: <Inbox /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);
