import { useSelector } from "react-redux";
import DeleteTaskForm from "../Forms/DeleteTaskForm";
import TaskDueDateForm from "../Forms/TaskDueDateForm";
import TaskHeaderForm from "../Forms/TaskHeaderForm";
import TaskMyDayForm from "../Forms/TaskMyDayForm";
import TaskNoteForm from "../Forms/TaskNoteForm";
import { BsChevronBarRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const DetailsSection = () => {
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const navigate = useNavigate();

  const handleCloseSectionClick = () => {
    navigate("/app/" + currentList);
  };

  return (
    <div
      id="taskListSection"
      className="w-full md:w-80 bg-slate-50 drop-shadow-md p-3 flex flex-col justify-between absolute top-20 h-[calc(100%-5rem)]  z-20 right-0 md:bg-slate-50/80 xl:static xl:h-auto xl:bg-slate-50"
    >
      <div>
        <TaskHeaderForm />
        <TaskMyDayForm />
        <TaskDueDateForm />
        <TaskNoteForm />
      </div>
      <div className="flex items-center justify-between">
        <BsChevronBarRight
          className="hover:cursor-pointer"
          onClick={handleCloseSectionClick}
        />
        <DeleteTaskForm />
      </div>
    </div>
  );
};

export default DetailsSection;
