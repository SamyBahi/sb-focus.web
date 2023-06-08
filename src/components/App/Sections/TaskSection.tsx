import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../../UI/TaskCard";
import AddTaskForm from "../Forms/AddTaskForm";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { useNavigate } from "react-router-dom";

interface testProps {
  title: string;
  url: string;
  myDay?: boolean;
  important?: boolean;
}

const TasksSection = (props: testProps) => {
  const navigate = useNavigate();
  const tasksDispatch = useDispatch();
  const tasks = useSelector((state: any) =>
    state.tasks.tasks.map((task: any) => (
      <TaskCard
        task={{
          title: task.title,
          completed: task.completed,
        }}
        key={task._id}
      />
    ))
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(props.url, {
          withCredentials: true,
        });
        tasksDispatch(tasksActions.setTasks(response.data.tasks));
        console.log(response.data.tasks);
      } catch (error: any) {
        if (error.response.status === 401) {
          authDispatch({ type: "LOGOUT" });
          navigate("/signin");
        }
      }
    })();
  }, []);

  const { user, authDispatch } = useContext(AuthContext);

  return (
    <div className="w-full flex-1 flex-col p-5">
      {props.myDay ? (
        <>
          <h1 className="text-xl font-bold tracking-wide leading-relaxed mt-5">
            Hello, {user?.name}
          </h1>
          <p className="opacity-50">Here are your tasks for the day</p>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold tracking-wide leading-relaxed mt-5">
            {props.title}
          </h1>
          <p></p>
        </>
      )}
      <AddTaskForm
        properties={{ myDay: props.myDay, important: props.important }}
      />
      {tasks}
    </div>
  );
};
export default TasksSection;
