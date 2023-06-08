import ListItem from "../../UI/ListItem";
import { BsSun, BsBookmark, BsCalendar3, BsHouseDoor } from "react-icons/bs";

const ListsSection = () => {
  return (
    <div id="taskListSection" className="w-72 bg-white drop-shadow-md">
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
    </div>
  );
};

export default ListsSection;
