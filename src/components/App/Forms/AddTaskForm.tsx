import { MdRadioButtonUnchecked } from "react-icons/md";
import ButtonPrimary from "../../UI/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { SyntheticEvent, useState } from "react";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import axios from "axios";

interface addTaskProps {
  properties: {
    myDay?: boolean;
    important?: boolean;
  };
}

const AddTaskForm = (props: addTaskProps) => {
  const tasksDispatch = useDispatch();
  const existingTasks = useSelector((state: any) => state.tasks.tasks);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(title);

    try {
      const addedTask = await axios.post(
        "http://localhost:8080/tasks/postTask",
        { title, ...props.properties },
        { withCredentials: true }
      );
      await existingTasks.forEach(async (task: any) => {
        await axios.put(
          "http://localhost:8080/tasks/putTaskIndex/" + task._id,
          { index: task.index + 1 },
          { withCredentials: true }
        );
        console.log(task);
        tasksDispatch(
          tasksActions.updateIndex({
            oldIndex: task.index,
            newIndex: task.index + 1,
          })
        );
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
      className="flex flex-col h-24 bg-white mt-10 rounded-md drop-shadow-lg text-sm"
    >
      <div id="textinput" className="flex items-center basis-1/2">
        <MdRadioButtonUnchecked className="text-2xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
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
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
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
