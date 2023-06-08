import { Outlet, useNavigate } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppHeader from "../../components/App/Header/AppHeader";
import ListsSection from "../../components/App/Sections/ListsSection";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    navigate("myday");
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <div className={`flex flex-col min-h-screen`}>
      <AppHeader />
      <main className="flex flex-col flex-1">
        <div id="app-container" className="w-screen flex flex-1 bg-slate-100">
          <ListsSection />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
