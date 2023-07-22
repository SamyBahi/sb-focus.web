import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
const MyDay = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.updateCurrentList("myday"));
    reduxDispatch(tasksActions.updateCurrentListTitle("My Day"));
  }, []);

  return null;
};
export default MyDay;
