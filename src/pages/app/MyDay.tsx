import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { taskState } from "../../types/reduxStore";

const MyDay = () => {
  const tasks = useLoaderData() as taskState["tasks"];
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.setTasks(tasks));
    reduxDispatch(tasksActions.updateCurrentList("myday"));
  });

  return null;
};

export const myDayLoader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/tasks/getMyDayTasks",
      {
        withCredentials: true,
      }
    );
    return response.data.tasks;
  } catch (error: any) {
    throw error;
  }
};

export default MyDay;
