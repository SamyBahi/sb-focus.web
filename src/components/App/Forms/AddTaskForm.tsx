import { BsCircle } from "react-icons/bs/index";
import ButtonPrimary from "../../UI/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useEffect, useState } from "react";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import axios from "axios";
import { addTaskProps } from "../../../types/componentProps";

const AddTaskForm = (props: addTaskProps) => {
  const tasksDispatch = useDispatch();
  const existingTasks = useSelector((state: any) => state.tasks.tasks);
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
    console.log(title);
    try {
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
      setTitle("");
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col h-24 bg-white mt-10 rounded-md drop-shadow-md text-sm"
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
          <ButtonPrimary type="submit">Add</ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
