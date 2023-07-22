import { BsList } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "../Forms/AddTaskForm";
import TaskList from "./TaskList";
import { MenusActions } from "../../../store/menusSlice/menusSlice";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";

const TasksSection = () => {
  const reduxDispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const tasks = useSelector((state: any) => state.tasks.currentTasks);
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );
  const currentListTitle: string = useSelector(
    (state: any) => state.tasks.currentListTitle
  );
  const completedTasks = tasks.filter((task: any) => task.completed);

  useEffect(() => {
    reduxDispatch(tasksActions.setCurrentTasks(currentList));
  }, [currentList]);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  const listTitleContent =
    currentList.toLowerCase() === "myday" ? (
      <>
        <div className="flex items-center m-5">
          <BsList
            className="text-2xl cursor-pointer mr-3"
            onClick={handleLeftMenuClick}
          />
          <h1 className="text-xl font-bold tracking-wide leading-relaxed">
            Hello, {user?.name}
          </h1>
        </div>
        <p className="opacity-50 ml-5">Here are your tasks for the day</p>
      </>
    ) : (
      <>
        <div className="flex items-center m-5">
          <BsList
            className="text-2xl cursor-pointer mr-3"
            onClick={handleLeftMenuClick}
          />
          <h1 className="text-xl font-bold tracking-wide leading-relaxed">
            {currentListTitle}
          </h1>
        </div>
      </>
    );

  return (
    <div className="flex flex-col w-full h-full">
      {listTitleContent}
      <AddTaskForm
        properties={{
          myDay: currentList.toLowerCase() === "myday" ? true : false,
          important: currentList.toLowerCase() === "important" ? true : false,
          listId: currentList.toLowerCase() || undefined,
        }}
      />
      <div className="p-5 h-full overflow-y-auto">
        {tasks.length === 0 && <h6>Found no tasks.</h6>}
        {currentList.toLowerCase() !== "planned" &&
          currentList.toLowerCase() !== "important" && (
            <TaskList
              myDay={currentList.toLowerCase() === "myday" ? true : false}
              tasks={tasks.filter((task: any) => !task.completed)}
              draggable={true}
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
            draggable={false}
          />
        )}
        {completedTasks.length > 0 && (
          <>
            <h6 className="mt-10 ml-5">Completed</h6>
            <TaskList
              tasks={tasks.filter((task: any) => task.completed)}
              draggable={false}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default TasksSection;
