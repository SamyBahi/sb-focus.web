import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import RootHeader from "../../components/Root/RootHeader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, []);

  const splitScreenColors =
    location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div
      className={`flex flex-col min-h-screen ${
        splitScreenColors && "split-background"
      }`}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RootHeader />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default RootLayout;
