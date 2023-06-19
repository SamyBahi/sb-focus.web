import { BsCircle } from "react-icons/bs/index";
import ButtonPrimary from "../../UI/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import axios from "axios";
import { addTaskProps } from "../../../types/componentProps";
import { z } from "zod";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const TaskSchema = z.object({
  title: z.string().nonempty({ message: "Please enter a valid task title." }),
});

type Task = z.infer<typeof TaskSchema>;

const AddTaskForm = (props: addTaskProps) => {
  const tasksDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const existingTasks = useSelector((state: any) => state.tasks.currentTasks);
  const currentList: string = useSelector(
    (state: any) => state.tasks.currentList
  );

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setDueDate(
      currentList.toLowerCase() === "planned"
        ? new Date().toISOString().slice(0, 10)
        : ""
    );
  }, [currentList]);

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const taskInfos: Task = {
        title,
      };

      const validationResult = TaskSchema.safeParse(taskInfos);

      if (!validationResult.success) {
        toast.error(validationResult.error.issues[0].message);
        return;
      }

      const addedTask = await axios.post(
        "http://localhost:8080/tasks/postTask",
        {
          title,
          ...props.properties,
          ...(dueDate && { dueDate }),
        },
        { withCredentials: true }
      );
      await existingTasks.forEach(async (task: any) => {
        if (props.properties.myDay && !props.properties.listId) {
          await axios.put(
            "http://localhost:8080/tasks/putTaskIndexMyDay/" + task._id,
            { index: task.index.myDay + 1 },
            { withCredentials: true }
          );
          tasksDispatch(
            tasksActions.updateIndexMyDay({
              id: task._id,
              newIndex: task.index.myDay + 1,
            })
          );
          await axios.put(
            "http://localhost:8080/tasks/putTaskIndexList/" + task._id,
            { index: task.index.list + 1 },
            { withCredentials: true }
          );
          tasksDispatch(
            tasksActions.updateIndexList({
              id: task._id,
              newIndex: task.index.list + 1,
            })
          );
        } else {
          // await axios.put(
          //   "http://localhost:8080/tasks/putTaskIndexList/" + task._id,
          //   { index: task.index.list + 1 },
          //   { withCredentials: true }
          // );
          // tasksDispatch(
          //   tasksActions.updateIndexList({
          //     id: task._id,
          //     newIndex: task.index.list + 1,
          //   })
          // );
        }
      });
      tasksDispatch(tasksActions.addTask(addedTask.data.task));
      tasksDispatch(tasksActions.setCurrentTasks(currentList));
      setTitle("");
    } catch (error: any) {
      if (error.response.status === 401) {
        return authDispatch({ type: "LOGOUT" });
      }
      toast.error(
        error.response.status +
          " Something went wrong ! Please try again later."
      );
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col h-32 bg-white mt-10 rounded-md drop-shadow-md text-sm mx-5 z-10"
    >
      <div id="textinput" className="flex items-center basis-1/2">
        <BsCircle className="text-xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Add a task"
          className="w-11/12 focus:border-indigo-500 focus:outline-none"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div
        id="otherinputs"
        className="flex w-full justify-between mr-5 bg-slate-100 rounded-b-md basis-1/2 items-center px-5 border-t-2"
      >
        <div className="flex items-center text-xs">
          <input
            type="date"
            className="bg-slate-100"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex items-center w-14 text-xs">
          <ButtonPrimary type="submit" disabled={title.length === 0}>
            Add
          </ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
