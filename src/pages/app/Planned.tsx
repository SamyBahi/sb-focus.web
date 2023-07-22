import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
const Planned = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.updateCurrentList("planned"));
    reduxDispatch(tasksActions.updateCurrentListTitle("Planned"));
  }, []);

  return null;
};
export default Planned;
