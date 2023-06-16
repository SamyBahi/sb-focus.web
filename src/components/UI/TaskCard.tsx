import {
  BsCircle,
  BsCheckCircleFill,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs/index";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import axios from "axios";
import { taskCardProps } from "../../types/componentProps";
import { useNavigate } from "react-router-dom";

const TaskCard = (props: taskCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckClick = () => {
    dispatch(tasksActions.updateCompleted({ id: props.task.id }));
    axios.put(
      "http://localhost:8080/tasks/putTaskCompleted/" + props.task.id,
      {
        completed: !props.task.completed,
      },
      { withCredentials: true }
    );
  };

  const handleBookmarkClick = () => {
    dispatch(tasksActions.updateImportant({ id: props.task.id }));
    axios.put(
      "http://localhost:8080/tasks/putTaskImportant/" + props.task.id,
      {
        important: !props.task.important,
      },
      { withCredentials: true }
    );
  };

  const handleTaskClick = () => {
    navigate("id/" + props.task.id);
  };

  return (
    <div className="flex h-12 bg-white mt-2 rounded-md drop-shadow-md items-center justify-between">
      <div className="flex flex-1 h-full items-center  text-sm">
        <div>
          {!props.task.completed && (
            <BsCircle
              className="text-xl ml-5 mr-5 fill-indigo-500 cursor-pointer"
              onClick={handleCheckClick}
            />
          )}
          {props.task.completed && (
            <BsCheckCircleFill
              className="text-xl ml-5 mr-5 fill-indigo-500 cursor-pointer"
              onClick={handleCheckClick}
            />
          )}
        </div>
        <div
          className="w-full h-full hover:cursor-pointer flex items-center"
          onClick={handleTaskClick}
        >
          <div>
            <p className={`${props.task.completed && "line-through"}`}>
              {props.task.title}
            </p>
            {props.task.dueDate && (
              <p className="flex gap-2 text-xs opacity-80">
                <BsCalendar3 /> Due {props.task.dueDate}
              </p>
            )}
          </div>
        </div>
      </div>
      {!props.task.important && (
        <BsBookmark
          className="mr-3 fill-indigo-500 cursor-pointer"
          onClick={handleBookmarkClick}
        />
      )}
      {props.task.important && (
        <BsBookmarkFill
          className="mr-3 fill-indigo-500 cursor-pointer"
          onClick={handleBookmarkClick}
        />
      )}
    </div>
  );
};

export default TaskCard;
