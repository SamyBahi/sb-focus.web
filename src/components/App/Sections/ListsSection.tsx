import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../UI/ListItem";
import {
  BsSun,
  BsBookmark,
  BsCalendar3,
  BsHouseDoor,
  BsChevronBarLeft,
} from "react-icons/bs";
import { MenusActions } from "../../../store/menusSlice/menusSlice";
import { list, listsState } from "../../../types/reduxStore";

const ListsSection = () => {
  const reduxDispatch = useDispatch();
  const lists: listsState = useSelector((state: any) => state.lists);

  console.log(lists);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  return (
    <div
      id="taskListSection"
      className="absolute top-20 h-[calc(100%-5rem)] w-full  z-20 md:w-96 md:static md:h-auto bg-white drop-shadow-md flex flex-col justify-between"
    >
      <nav>
        <ul className="display flex flex-col">
          {lists.baseLists.map((list: list) => (
            <ListItem link={list.id} name={list.name} key={list.id} />
          ))}
          <li>
            <hr className="w-4/5 mx-auto mt-3 border-indigo-300" />
          </li>
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
