import { Outlet, useNavigate } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppHeader from "../../components/App/AppHeader";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className={`flex flex-col min-h-screen`}>
      <AppHeader />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default AppLayout;
