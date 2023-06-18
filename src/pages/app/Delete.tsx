import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
const Delete = () => {
  const taskId = useParams().taskId;
  const navigate = useNavigate();
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      reduxDispatch(tasksActions.deleteTask({ id: taskId }));
      navigate("/app/" + currentList.toLowerCase());
    }
  });

  return null;
};
export default Delete;
