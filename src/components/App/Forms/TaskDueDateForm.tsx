import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { BsCalendar3, BsX } from "react-icons/bs";
import { task } from "../../../types/reduxStore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const TaskDueDateForm = () => {
  const taskId = useParams().taskId;
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const [dueDate, setDueDate] = useState("");
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const taskDetails: task = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === taskId)
  );

  useEffect(() => {
    taskDetails.dueDate
      ? setDueDate(taskDetails.dueDate.toString().slice(0, 10))
      : setDueDate("");
  }, [taskDetails]);

  const handleDateBlur = async () => {
    if (!dueDate || !taskId) {
      return;
    }

    try {
      await axios.put(
        "/tasks/putTaskDueDate/" + taskId,
        { dueDate: dueDate },
        { withCredentials: true }
      );
      reduxDispatch(
        tasksActions.updateTaskDueDate({
          id: taskId,
          dueDate: new Date(dueDate).toISOString(),
        })
      );
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

  const handleCrossClick = async () => {
    if (!taskId) {
      return;
    }
    try {
      await axios.put(
        "/tasks/putTaskDueDate/" + taskId,
        { dueDate: null },
        { withCredentials: true }
      );
      reduxDispatch(
        tasksActions.updateTaskDueDate({
          id: taskId,
          dueDate: null,
        })
      );
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
    <div className="flex h-12 bg-white mt-2 rounded-sm items-center">
      <div className="flex flex-1 h-full items-center text-sm justify-between">
        {taskDetails.dueDate && (
          <>
            <div className="flex">
              <BsCalendar3 className="text-xl ml-5 mr-5 cursor-pointer fill-indigo-500" />

              <input
                type="date"
                className="text-indigo-500 fill-indigo-500"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
                onBlur={handleDateBlur}
              ></input>
            </div>
            <BsX
              className="text-xl hover:cursor-pointer"
              onClick={handleCrossClick}
            />
          </>
        )}
        {!taskDetails.dueDate && (
          <div className="flex">
            <BsCalendar3 className="text-xl ml-5 mr-5 cursor-pointer" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              onBlur={handleDateBlur}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDueDateForm;
