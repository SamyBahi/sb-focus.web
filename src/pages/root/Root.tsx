import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import RootHeader from "../../components/Root/RootHeader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

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
      <RootHeader />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default RootLayout;
