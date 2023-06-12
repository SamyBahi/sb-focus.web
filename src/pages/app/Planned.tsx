import TasksSection from "../../components/App/Sections/TaskSection";

const Planned = () => {
  return (
    <TasksSection
      title="Planned"
      draggable={false}
      dueDate={new Date().toISOString().slice(0, 10)}
      url={"http://localhost:8080/tasks/getPlannedTasks"}
    />
  );
};

export default Planned;
