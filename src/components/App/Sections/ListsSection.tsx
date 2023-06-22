import { useDispatch, useSelector } from "react-redux";
import ListItem from "../../UI/ListItem";
import {
  BsSun,
  BsBookmark,
  BsCalendar3,
  BsHouseDoor,
  BsChevronBarLeft,
} from "react-icons/bs/index";
import { MenusActions } from "../../../store/menusSlice/menusSlice";

const ListsSection = () => {
  const reduxDispatch = useDispatch();

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  return (
    <div
      id="taskListSection"
      className="w-72 bg-white drop-shadow-md flex flex-col justify-between"
    >
      <nav>
        <ul className="display flex flex-col">
          <ListItem link="myday">
            <BsSun className="text-lg" />
            My Day
          </ListItem>
          <ListItem link="important">
            <BsBookmark className="text-lg" />
            Important
          </ListItem>
          <ListItem link="planned">
            <BsCalendar3 className="text-lg" />
            Planned
          </ListItem>
          <ListItem link="inbox">
            <BsHouseDoor className="text-lg" />
            Tasks
          </ListItem>
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
