import { BsSun } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const TaskMyDayForm = () => {
  const taskId = useParams().taskId;
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const currentList = useSelector((state: any) => state.tasks.currentList);

  const taskDetails = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === taskId)
  );

  const handleMyDayClick = async () => {
    if (!taskId) {
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/tasks/putTaskMyDay/" + taskId,
        {
          myDay: !taskDetails.myDay,
        },
        { withCredentials: true }
      );
      reduxDispatch(
        tasksActions.updateTaskMyDay({ id: taskId, myDay: !taskDetails.myDay })
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
      <div
        className="flex flex-1 h-full items-center text-sm hover:cursor-pointer"
        onClick={handleMyDayClick}
      >
        {!taskDetails.myDay && (
          <>
            <BsSun className="text-xl ml-5 mr-5 cursor-pointer" />
            <p className="text-sm">Add to My Day</p>
          </>
        )}
        {taskDetails.myDay && (
          <>
            <BsSun className="text-xl ml-5 mr-5 cursor-pointer fill-indigo-500" />
            <p className="text-sm text-indigo-500">Added to My Day</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskMyDayForm;
