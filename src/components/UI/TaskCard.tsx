import {
  BsCircle,
  BsCheckCircleFill,
  BsCalendar3,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs/";
import { LuGripVertical } from "react-icons/lu/index";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import axios from "axios";
import { taskCardProps } from "../../types/componentProps";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TaskCard = (props: taskCardProps) => {
  const dispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const taskDetails = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === props.taskId)
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.taskId,
      transition: {
        duration: 150, // milliseconds
        easing: "ease-in",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckClick = async () => {
    try {
      await axios.put(
        "http://localhost:8080/tasks/putTaskCompleted/" + props.taskId,
        {
          completed: !taskDetails.completed,
        },
        { withCredentials: true }
      );
      dispatch(tasksActions.updateCompleted({ id: props.taskId }));
      dispatch(tasksActions.setCurrentTasks(currentList));
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
    try {
      await axios.put(
        "http://localhost:8080/tasks/putTaskImportant/" + props.taskId,
        {
          important: !taskDetails.important,
        },
        { withCredentials: true }
      );
      dispatch(tasksActions.updateImportant({ id: props.taskId }));
      dispatch(tasksActions.setCurrentTasks(currentList));
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

  const handleTaskClick = () => {
    navigate("id/" + props.taskId);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex h-12 bg-white mt-2 mx-5 rounded-md drop-shadow-md items-center justify-between">
        <div id="textinput" className="flex flex-1 h-full items-center text-sm">
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
          <div
            className="w-full h-full hover:cursor-pointer flex items-center"
            onClick={handleTaskClick}
          >
            <div>
              <p className={`${taskDetails.completed && "line-through"}`}>
                {taskDetails.title}
              </p>
              {taskDetails.dueDate && (
                <p className="flex gap-2 text-xs opacity-80">
                  <BsCalendar3 /> Due {taskDetails.dueDate}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex">
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
          {props.draggable && (
            <LuGripVertical
              {...attributes}
              {...listeners}
              className="focus:outline-none opacity-60 mr-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
