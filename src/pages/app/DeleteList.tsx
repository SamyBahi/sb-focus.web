import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";
import { listsActions } from "../../store/listsSlice/listsSlice";
import { task } from "../../types/reduxStore";
const DeleteList = () => {
  const listId = useParams().listId;
  const navigate = useNavigate();
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const reduxDispatch = useDispatch();
  const allTasks = useSelector((state: any) => state.tasks.tasks);

  useEffect(() => {
    if (listId) {
      reduxDispatch(listsActions.deleteLists({ id: currentList }));
      reduxDispatch(
        tasksActions.setTasks(
          allTasks.filter(
            (task: task) => task.listId?.toString() !== currentList
          )
        )
      );
      reduxDispatch(tasksActions.setCurrentTasks("myday"));
      reduxDispatch(tasksActions.updateCurrentList("myday"));
      reduxDispatch(tasksActions.updateCurrentListTitle("My day"));
      navigate("/app/myday");
    }
  }, []);

  return null;
};
export default DeleteList;
