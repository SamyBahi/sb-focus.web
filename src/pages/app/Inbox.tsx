import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { taskState } from "../../types/reduxStore";

const Inbox = () => {
  const tasks = useLoaderData() as taskState["tasks"];
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.setTasks(tasks));
    reduxDispatch(tasksActions.updateCurrentList("Tasks"));
  });

  return null;
};

export const inboxLoader = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/tasks/getInboxTasks",
      {
        withCredentials: true,
      }
    );
    return response.data.tasks;
  } catch (error: any) {
    throw error;
  }
};

export default Inbox;
