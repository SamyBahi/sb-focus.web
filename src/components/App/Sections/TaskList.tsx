import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../../UI/TaskCard";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const TaskList = (props: any) => {
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );
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

    if (active.id !== over?.id) {
      const activeIndex = tasks.map((task: any) => task._id).indexOf(active.id);
      const overIndex = tasks.map((task: any) => task._id).indexOf(over?.id);
      const newTasks = arrayMove(tasks, activeIndex, overIndex);
      newTasks.forEach(async (task: any, index) => {
        try {
          if (props.myDay) {
            reduxDispatch(
              tasksActions.updateIndexMyDay({
                id: task._id,
                newIndex: index + 1,
              })
            );
            reduxDispatch(tasksActions.setCurrentTasks(currentList));
            await axios.put(
              "http://localhost:8080/tasks/putTaskIndexMyDay/" + task._id,
              { index: index + 1 },
              { withCredentials: true }
            );
          } else {
            reduxDispatch(
              tasksActions.updateIndexList({
                id: task._id,
                newIndex: index + 1,
              })
            );
            reduxDispatch(tasksActions.setCurrentTasks(currentList));
            await axios.put(
              "http://localhost:8080/tasks/putTaskIndexList/" + task._id,
              { index: index + 1 },
              { withCredentials: true }
            );
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            return authDispatch({ type: "LOGOUT" });
          }
          toast.error(
            error.response.status +
              " Something went wrong ! Please try again later."
          );
        }
      });
    }
  };

  return (
    <>
      {props.draggable && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task: any) => (
              <TaskCard key={task._id} taskId={task._id} draggable={true} />
            ))}
          </SortableContext>
        </DndContext>
      )}
      {!props.draggable &&
        tasks.map((task: any) => (
          <TaskCard key={task._id} taskId={task._id} draggable={false} />
        ))}
    </>
  );
};

export default TaskList;
