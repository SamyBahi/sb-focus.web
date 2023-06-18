import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
const MyDay = () => {
  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(tasksActions.updateCurrentList("myday"));
  });

  return null;
};
export default MyDay;
