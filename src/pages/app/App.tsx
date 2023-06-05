import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/");
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

  return (
    <div className="w-screen flex items-center justify-center p-20 mt-16">
      <h1 className="text-5xl font-bold mb-10 tracking-wide leading-relaxed max-w-lg">
        Welcome back, {user?.name}
      </h1>
    </div>
  );
};

export default App;
