import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

interface taskCardProps {
  task: {
    title: String;
    completed: boolean;
  };
}

const TaskCard = (props: taskCardProps) => {
  return (
    <div
      id="task-card"
      className="flex h-12 bg-white mt-2 rounded-md drop-shadow-lg transition-all"
    >
      <div id="textinput" className="flex items-center basis-1/2 text-sm">
        {!props.task.completed && (
          <MdRadioButtonUnchecked className="text-2xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
        )}
        {props.task.completed && (
          <MdRadioButtonChecked className="text-2xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
        )}
        <p>{props.task.title}</p>
      </div>
    </div>
  );
};

export default TaskCard;
