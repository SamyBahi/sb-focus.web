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
import { task } from "../../../types/reduxStore";
import { useEffect, useState } from "react";

const ListsSection = () => {
  const reduxDispatch = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const [amountMyDay, setAmountMyDay] = useState(0);
  const [amountImportant, setAmountImportant] = useState(0);
  const [amountPlanned, setAmountPlanned] = useState(0);
  const [amountInbox, setAmountInbox] = useState(0);

  useEffect(() => {
    setAmountMyDay(tasks.filter((task: task) => task.myDay).length);
    setAmountImportant(tasks.filter((task: task) => task.important).length);
    setAmountPlanned(tasks.filter((task: task) => task.dueDate).length);
    setAmountInbox(tasks.filter((task: task) => !task.listId).length);
  }, [tasks]);

  const handleLeftMenuClick = () => {
    reduxDispatch(MenusActions.setLeftMenu());
  };

  return (
    <div
      id="taskListSection"
      className="absolute top-20 h-[calc(100%-5rem)]  z-20 w-72 md:static md:h-auto bg-white drop-shadow-md flex flex-col justify-between"
    >
      <nav>
        <ul className="display flex flex-col">
          <ListItem link="myday" amount={amountMyDay}>
            <BsSun className="text-lg" />
            My Day
          </ListItem>
          <ListItem link="important" amount={amountImportant}>
            <BsBookmark className="text-lg" />
            Important
          </ListItem>
          <ListItem link="planned" amount={amountPlanned}>
            <BsCalendar3 className="text-lg" />
            Planned
          </ListItem>
          <ListItem link="inbox" amount={amountInbox}>
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
