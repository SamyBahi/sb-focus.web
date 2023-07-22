import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tasksActions } from "../../store/taskSlice/tasksSlice";
import { useParams } from "react-router-dom";
import { listsState } from "../../types/reduxStore";
import { list } from "../../types/reduxStore";
const CustomList = () => {
  const reduxDispatch = useDispatch();
  const lists: listsState = useSelector((state: any) => state.lists);
  const currentListId = useParams().listId;

  useEffect(() => {
    if (!currentListId) {
      return;
    }
    if (lists.customLists.length === 0) {
      return;
    }
    reduxDispatch(
      tasksActions.updateCurrentList(
        lists.customLists[
          lists.customLists.map((list: list) => list.id).indexOf(currentListId)
        ].id
      )
    );
    reduxDispatch(
      tasksActions.updateCurrentListTitle(
        lists.customLists[
          lists.customLists.map((list: list) => list.id).indexOf(currentListId)
        ].title
      )
    );
  }, []);

  return null;
};
export default CustomList;
