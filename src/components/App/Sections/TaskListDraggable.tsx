import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import TaskCardDraggable from "../../UI/TaskCardDraggable";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";

const TaskListDraggable = (props: any) => {
  const tasksDispatch = useDispatch();
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

  const taskIds = tasks.map((task: any) => task._id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(active.id, over?.id);

    if (active.id !== over?.id) {
      const activeIndex = tasks.map((task: any) => task._id).indexOf(active.id);
      const overIndex = tasks.map((task: any) => task._id).indexOf(over?.id);
      const newTasks = arrayMove(tasks, activeIndex, overIndex);
      newTasks.forEach(async (task: any, index) => {
        try {
          if (props.myDay) {
            tasksDispatch(
              tasksActions.updateIndexMyDay({
                id: task._id,
                newIndex: index + 1,
              })
            );
            await axios.put(
              "http://localhost:8080/tasks/putTaskIndexMyDay/" + task._id,
              { index: index + 1 },
              { withCredentials: true }
            );
          } else {
            tasksDispatch(
              tasksActions.updateIndexList({
                id: task._id,
                newIndex: index + 1,
              })
            );
            await axios.put(
              "http://localhost:8080/tasks/putTaskIndexList/" + task._id,
              { index: index + 1 },
              { withCredentials: true }
            );
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        {tasks.map((task: any) => (
          <TaskCardDraggable
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
      </SortableContext>
    </DndContext>
  );
};

export default TaskListDraggable;
