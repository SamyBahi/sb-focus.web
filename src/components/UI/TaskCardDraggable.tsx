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

const TaskCardDraggable = (props: taskCardProps) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
      transition: {
        duration: 150, // milliseconds
        easing: "ease-in",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex h-12 bg-white mt-2 rounded-md drop-shadow-md items-center justify-between">
        <div id="textinput" className="flex items-center basis-1/2 text-sm">
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
        <div className="flex">
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
          <LuGripVertical
            {...attributes}
            {...listeners}
            className="focus:outline-none opacity-60 mr-3"
          >
            Salut !
          </LuGripVertical>
        </div>
      </div>
    </div>
  );
};

export default TaskCardDraggable;
