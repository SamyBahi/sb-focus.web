import TaskCard from "../../UI/TaskCard";

const TaskList = (props: any) => {
  let tasks: [];

  if (props.myDay) {
    tasks = props.tasks
      .slice()
      .sort((a: any, b: any) => a.index.myDay - b.index.myDay);
  } else {
    tasks = props.tasks
      .slice()
      .sort((a: any, b: any) => a.index.list - b.index.list);
  }

  return (
    <>
      {tasks.map((task: any) => (
        <TaskCard
          key={task._id}
          task={{
            id: task._id,
            title: task.title,
            important: task.important,
            completed: task.completed,
            index: task.index.list,
            ...(task.dueDate && {
              dueDate: new Date(task.dueDate).toDateString(),
            }),
          }}
        />
      ))}
    </>
  );
};

export default TaskList;
