import TasksSection from "../../components/App/Sections/TaskSection";

const Important = () => {
  return (
    <TasksSection
      title="Important"
      important={true}
      draggable={false}
      url={"http://localhost:8080/tasks/getImportantTasks"}
    />
  );
};

export default Important;
