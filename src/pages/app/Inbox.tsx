import TasksSection from "../../components/App/Sections/TaskSection";

const Inbox = () => {
  return (
    <TasksSection
      title="Tasks"
      draggable={true}
      url={"http://localhost:8080/tasks/getInboxTasks"}
    />
  );
};

export default Inbox;
