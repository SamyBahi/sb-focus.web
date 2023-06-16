import { BsList } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "../Forms/AddTaskForm";
import TaskListDraggable from "./TaskListDraggable";
import TaskList from "./TaskList";
import { MenusActions } from "../../../store/menusSlice/menusSlice";

const TasksSection = () => {
  const reduxDispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );
  const completedTasks = tasks.filter((task: any) => task.completed);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  const listTitleContent =
    currentList.toLowerCase() === "myday" ? (
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
            {currentList}
          </h1>
        </div>
      </>
    );

  return (
    <div className="w-full flex-1 flex-col p-5">
      {listTitleContent}
      <AddTaskForm
        properties={{
          myDay: currentList.toLowerCase() === "myday" ? true : false,
          important: currentList.toLowerCase() === "important" ? true : false,
        }}
      />
      {currentList.toLowerCase() !== "planned" &&
        currentList.toLowerCase() !== "important" && (
          <TaskListDraggable
            myDay={currentList.toLowerCase() === "myday" ? true : false}
            tasks={tasks.filter((task: any) => !task.completed)}
          />
        )}
      {currentList.toLowerCase() === "planned" && (
        <TaskList
          tasks={tasks.filter((task: any) => {
            return !task.completed;
          })}
        />
      )}
      {currentList.toLowerCase() === "important" && (
        <TaskList
          tasks={tasks.filter((task: any) => {
            return task.important && !task.completed;
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
