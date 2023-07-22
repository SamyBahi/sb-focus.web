import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../UI/ListItem";
import { BsChevronBarLeft } from "react-icons/bs";
import { MenusActions } from "../../../store/menusSlice/menusSlice";
import { list, listsState } from "../../../types/reduxStore";
import AddListForm from "../Forms/AddListForm";
import { useEffect } from "react";
import axios from "axios";
import { listsActions } from "../../../store/listsSlice/listsSlice";

const ListsSection = () => {
  const reduxDispatch = useDispatch();
  const lists: listsState = useSelector((state: any) => state.lists);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  useEffect(() => {
    const fetchLists = async () => {
      const fetchedLists = await axios.get("/lists/getLists", {
        withCredentials: true,
      });

      reduxDispatch(
        listsActions.setCustomLists({
          customLists: fetchedLists.data.lists.map((list: any) => {
            return { id: list._id, title: list.title };
          }),
        })
      );
    };
    fetchLists();
  }, []);

  return (
    <div
      id="taskListSection"
      className="absolute top-20 h-[calc(100%-5rem)] w-full  z-20 md:w-96 md:static md:h-auto bg-white drop-shadow-md flex flex-col justify-between"
    >
      <nav>
        <ul className="display flex flex-col">
          {lists.baseLists.map((list: list) => (
            <ListItem link={list.id} title={list.title} key={list.id} />
          ))}
          <li>
            <hr className="w-4/5 mx-auto my-3 border-indigo-300" />
          </li>
          {lists.customLists.length > 0 &&
            lists.customLists.map((list: list) => (
              <ListItem link={list.id} title={list.title} key={list.id} />
            ))}
          <AddListForm />
        </ul>
      </nav>
      <div className="flex justify-end p-3 items-center">
        <BsChevronBarLeft
          className="hover:cursor-pointer"
          onClick={handleLeftMenuClick}
        />
      </div>
    </div>
  );
};

export default ListsSection;
