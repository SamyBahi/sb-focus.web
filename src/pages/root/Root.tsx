import { Outlet, useLocation } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import RootHeader from "../../components/Root/RootHeader";

const RootLayout = () => {
  const location = useLocation();

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
