import { Outlet, useNavigate, useParams } from "react-router-dom";
import MainFooter from "../../components/MainFooter";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AppHeader from "../../components/App/Header/AppHeader";
import ListsSection from "../../components/App/Sections/ListsSection";
import { useDispatch, useSelector } from "react-redux";
import TasksSection from "../../components/App/Sections/TaskSection";
import DetailsSection from "../../components/App/Sections/DetailsSection";
import { useLoaderData } from "react-router-dom";
import { taskState } from "../../types/reduxStore";
import axios from "axios";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const tasks = useLoaderData() as taskState["tasks"];
  const { showLeftMenu, showRightMenu } = useSelector(
    (state: any) => state.menus
  );

  useEffect(() => {
    if (!user) {
      return navigate("/signin");
    }

    reduxDispatch(tasksActions.setTasks(tasks));

    navigate("myday");
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <div className="h-full">
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
      <AppHeader />
      <main className="flex h-[calc(100%-5rem)] w-screen bg-slate-100">
        {showLeftMenu && <ListsSection />}
        <TasksSection />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

export const AppLoader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/tasks/getAllTasks",
      {
        withCredentials: true,
      }
    );
    return response.data.tasks;
  } catch (error: any) {
    throw error.response;
  }
};
