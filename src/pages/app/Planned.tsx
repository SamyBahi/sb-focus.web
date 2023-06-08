import TasksSection from "../../components/App/Sections/TaskSection";

const Planned = () => {
  return (
    <TasksSection
      title="Planned"
      url={"http://localhost:8080/tasks/getPlannedTasks"}
    />
  );
};

export default Planned;
