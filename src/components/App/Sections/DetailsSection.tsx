import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailsSection = () => {
  const taskId = useParams().taskId;

  const TaskDetails = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === taskId)
  );

  console.log(TaskDetails);

  return (
    <div id="taskListSection" className="w-72 bg-white drop-shadow-md"></div>
  );
};

export default DetailsSection;
