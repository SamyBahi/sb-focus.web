import TasksSection from "../../components/App/Sections/TaskSection";

const MyDay = () => {
  return (
    <TasksSection
      title="MyDay"
      myDay={true}
      url={"http://localhost:8080/tasks/getMyDayTasks"}
    />
  );
};

export default MyDay;
