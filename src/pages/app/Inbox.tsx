import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
const Inbox = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.updateCurrentList("Inbox"));
  });

  return null;
};
export default Inbox;
