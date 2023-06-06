import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AddTaskForm from "../../components/App/Forms/AddTaskForm";
import { MdRadioButtonUnchecked } from "react-icons/md";

const App = () => {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/tasks/getTasks",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.tasks);
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch({ type: "LOGOUT" });
          navigate("/signin");
        }
      }
    })();
  }, []);

  if (!user) {
    return;
  }

  return (
    <div id="app-container" className="w-screen flex flex-1 bg-slate-100">
      <div className="w-full flex-1 flex-col p-5">
        <h1 className="text-xl font-bold tracking-wide leading-relaxed mt-5">
          Hello, {user?.name}
        </h1>
        <AddTaskForm />
        <div
          id="task-card"
          className="flex h-12 bg-white mt-2 rounded-md drop-shadow-lg"
        >
          <div id="textinput" className="flex items-center basis-1/2 text-sm">
            <MdRadioButtonUnchecked className="text-2xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
            <p>Salut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
