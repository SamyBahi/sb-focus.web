import TasksSection from "../../components/App/Sections/TaskSection";
import axios from "axios";

const MyDay = () => {
  return (
    <TasksSection
      title="MyDay"
      myDay={true}
      draggable={true}
      url={"http://localhost:8080/tasks/getMyDayTasks"}
    />
  );
};

export default MyDay;
