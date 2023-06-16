import { Outlet, useNavigate } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppHeader from "../../components/App/Header/AppHeader";
import ListsSection from "../../components/App/Sections/ListsSection";
import { useSelector } from "react-redux";
import TasksSection from "../../components/App/Sections/TaskSection";
import DetailsSection from "../../components/App/Sections/DetailsSection";

const AppLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showLeftMenu, showRightMenu } = useSelector(
    (state: any) => state.menus
  );

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
          {showLeftMenu && <ListsSection />}
          <TasksSection />
          <DetailsSection />
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default AppLayout;
