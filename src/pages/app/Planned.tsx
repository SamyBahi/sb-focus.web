import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { taskState } from "../../types/reduxStore";

const Planned = () => {
  const tasks = useLoaderData() as taskState["tasks"];
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.setTasks(tasks));
    reduxDispatch(tasksActions.updateCurrentList("Planned"));
  });

  return null;
};

export const plannedLoader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/tasks/getPlannedTasks",
      {
        withCredentials: true,
      }
    );
    return response.data.tasks;
  } catch (error: any) {
    throw error;
  }
};

export default Planned;
