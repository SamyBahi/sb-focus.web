import DeleteTaskForm from "../Forms/DeleteTaskForm";
import TaskDueDateForm from "../Forms/TaskDueDateForm";
import TaskHeaderForm from "../Forms/TaskHeaderForm";
import TaskMyDayForm from "../Forms/TaskMyDayForm";
import TaskNoteForm from "../Forms/TaskNoteForm";

const DetailsSection = () => {
  return (
    <div
      id="taskListSection"
      className="w-80 bg-slate-50 drop-shadow-md p-3 flex flex-col justify-between"
    >
      <div>
        <TaskHeaderForm />
        <TaskMyDayForm />
        <TaskDueDateForm />
        <TaskNoteForm />
      </div>
      <div className="flex items-center justify-end">
        <DeleteTaskForm />
      </div>
    </div>
  );
};

export default DetailsSection;
