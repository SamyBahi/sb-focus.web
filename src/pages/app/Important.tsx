import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
const Important = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.updateCurrentList("Important"));
  });

  return null;
};
export default Important;
