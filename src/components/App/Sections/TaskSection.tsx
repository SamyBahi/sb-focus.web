import { BsList } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "../Forms/AddTaskForm";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { useNavigate, useOutletContext } from "react-router-dom";
import TaskListDraggable from "./TaskListDraggable";
import TaskList from "./TaskList";
import { MenusActions } from "../../../store/menusSlice/menusSlice";
import { taskSectionProps } from "../../../types/componentProps";

const TasksSection = (props: taskSectionProps) => {
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const { user, authDispatch } = useContext(AuthContext);
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const completedTasks = tasks.filter((task: any) => task.completed);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(props.url, {
          withCredentials: true,
        });
        reduxDispatch(tasksActions.setTasks(response.data.tasks));
      } catch (error: any) {
        if (error.response.status === 401) {
          authDispatch({ type: "LOGOUT" });
          navigate("/signin");
        }
      }
    })();
  }, []);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  return (
    <div className="w-full flex-1 flex-col p-5">
      {props.myDay ? (
        <>
          <div className="flex items-center mt-5">
            <BsList
              className="text-2xl cursor-pointer mr-3"
              onClick={handleLeftMenuClick}
            />
            <h1 className="text-xl font-bold tracking-wide leading-relaxed">
              Hello, {user?.name}
            </h1>
          </div>
          <p className="opacity-50">Here are your tasks for the day</p>
        </>
      ) : (
        <>
          <div className="flex items-center mt-5">
            <BsList
              className="text-2xl cursor-pointer mr-3"
              onClick={handleLeftMenuClick}
            />
            <h1 className="text-xl font-bold tracking-wide leading-relaxed">
              {props.title}
            </h1>
          </div>
          <p></p>
        </>
      )}
      <AddTaskForm
        properties={{
          myDay: props.myDay,
          important: props.important,
        }}
        dueDate={props.dueDate}
      />
      {props.draggable && (
        <TaskListDraggable
          myDay={props.myDay}
          tasks={tasks.filter((task: any) => !task.completed)}
        />
      )}
      {!props.draggable && (
        <TaskList
          tasks={tasks.filter((task: any) => {
            if (props.important) {
              return task.important && !task.completed;
            }
            return !task.completed;
          })}
        />
      )}
      {completedTasks.length > 0 && (
        <>
          <h6 className="mt-10">Completed</h6>
          <TaskList tasks={tasks.filter((task: any) => task.completed)} />
        </>
      )}
    </div>
  );
};
export default TasksSection;
