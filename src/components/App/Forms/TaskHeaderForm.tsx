import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsCircle,
  BsCheckCircleFill,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const TaskHeaderForm = () => {
  const taskId = useParams().taskId;
  const [taskTitle, setTaskTitle] = useState("");
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );
  const taskDetails = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === taskId)
  );

  useEffect(() => {
    setTaskTitle(taskDetails.title);
  }, [taskId]);

  const handleTitleBlur = async () => {
    if (taskTitle.length < 1) {
      return setTaskTitle(taskDetails.title);
    }
    if (!taskId) {
      return;
    }
    try {
      await axios.put(
        "/tasks/putTaskTitle/" + taskId,
        { title: taskTitle },
        { withCredentials: true }
      );
      reduxDispatch(
        tasksActions.updateTaskTitle({ id: taskId, newTitle: taskTitle })
      );
    } catch (error: any) {
      if (error.response.status === 401) {
        return authDispatch({ type: "LOGOUT" });
      }
      toast.error(
        error.response.status +
          " Something went wrong ! Please try again later."
      );
      return setTaskTitle(taskDetails.title);
    }
  };

  const handleCheckClick = async () => {
    if (!taskId) {
      return;
    }
    try {
      await axios.put(
        "/tasks/putTaskCompleted/" + taskId,
        {
          completed: !taskDetails.completed,
        },
        { withCredentials: true }
      );
      reduxDispatch(tasksActions.updateCompleted({ id: taskId }));
      reduxDispatch(tasksActions.setCurrentTasks(currentList));
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

  const handleBookmarkClick = async () => {
    if (!taskId) {
      return;
    }
    try {
      await axios.put(
        "/tasks/putTaskImportant/" + taskId,
        {
          important: !taskDetails.important,
        },
        { withCredentials: true }
      );
      reduxDispatch(tasksActions.updateImportant({ id: taskId }));
      reduxDispatch(tasksActions.setCurrentTasks(currentList));
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

  return (
    <div className="flex h-12 bg-white mt-2 rounded-sm items-center justify-between">
      <div className="flex flex-1 h-full items-center text-sm">
        <div>
          {!taskDetails.completed && (
            <BsCircle
              className="text-xl ml-5 mr-5 fill-indigo-500 cursor-pointer"
              onClick={handleCheckClick}
            />
          )}
          {taskDetails.completed && (
            <BsCheckCircleFill
              className="text-xl ml-5 mr-5 fill-indigo-500 cursor-pointer"
              onClick={handleCheckClick}
            />
          )}
        </div>
        <div className="w-full h-full flex items-center">
          <input
            type="text"
            className={`${
              taskDetails.completed && "line-through"
            } focus:outline-none`}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={handleTitleBlur}
          ></input>
        </div>
      </div>
      {!taskDetails.important && (
        <BsBookmark
          className="mr-3 fill-indigo-500 cursor-pointer"
          onClick={handleBookmarkClick}
        />
      )}
      {taskDetails.important && (
        <BsBookmarkFill
          className="mr-3 fill-indigo-500 cursor-pointer"
          onClick={handleBookmarkClick}
        />
      )}
    </div>
  );
};

export default TaskHeaderForm;
