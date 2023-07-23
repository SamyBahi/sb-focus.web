import { BsList, BsTrash } from "react-icons/bs";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "../Forms/AddTaskForm";
import TaskList from "./TaskList";
import { MenusActions } from "../../../store/menusSlice/menusSlice";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { list, listsState } from "../../../types/reduxStore";
import axios from "axios";
import { toast } from "react-toastify";
import { listsActions } from "../../../store/listsSlice/listsSlice";
import { useNavigate } from "react-router-dom";

const TasksSection = () => {
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const tasks = useSelector((state: any) => state.tasks.currentTasks);
  const navigate = useNavigate();
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );
  const currentListTitle: string = useSelector(
    (state: any) => state.tasks.currentListTitle
  );
  const completedTasks = tasks.filter((task: any) => task.completed);
  const lists: listsState = useSelector((state: any) => state.lists);

  useEffect(() => {
    reduxDispatch(tasksActions.setCurrentTasks(currentList));
  }, [currentList]);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  const handleListTitleBlur = async () => {
    try {
      await axios.put(
        "/lists/putList/" + currentList,
        {
          title: currentListTitle,
        },
        { withCredentials: true }
      );
      reduxDispatch(
        listsActions.updateListTitle({
          id: currentList,
          title: currentListTitle,
        })
      );
    } catch (error: any) {
      if (error.response.status === 401) {
        return authDispatch({ type: "LOGOUT" });
      }
      toast.error(
        error.response.status +
          " Something went wrong ! Please try again later."
      );
    }
  };

  const handleDeleteListClick = async () => {
    try {
      await axios.delete("/lists/deleteList/" + currentList, {
        withCredentials: true,
      });
      navigate("/app/deleteList/" + currentList);
    } catch (error: any) {
      if (error.response.status === 401) {
        return authDispatch({ type: "LOGOUT" });
      }
      toast.error(
        error.response.status +
          " Something went wrong ! Please try again later."
      );
    }
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
        <div className="flex items-center m-5 justify-between">
          {lists.customLists
            .map((list: list) => list.id)
            .includes(currentList) ? (
            <>
              <div className="flex items-center">
                <BsList
                  className="text-2xl cursor-pointer mr-3"
                  onClick={handleLeftMenuClick}
                />
                <input
                  type="text"
                  className="text-xl font-bold tracking-wide leading-relaxed bg-transparent focus:outline-none"
                  value={currentListTitle}
                  onChange={(e) =>
                    reduxDispatch(
                      tasksActions.updateCurrentListTitle(e.target.value)
                    )
                  }
                  onBlur={handleListTitleBlur}
                />
              </div>
              <BsTrash
                className="text-lg cursor-pointer"
                onClick={handleDeleteListClick}
              />
            </>
          ) : (
            <div className="flex items-center">
              <BsList
                className="text-2xl cursor-pointer mr-3"
                onClick={handleLeftMenuClick}
              />
              <h1 className="text-xl font-bold tracking-wide leading-relaxed">
                {currentListTitle}
              </h1>
            </div>
          )}
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
