import { Link } from "react-router-dom";
import { listItemProps } from "../../types/componentProps";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { task } from "../../types/reduxStore";

const ListItem = (props: listItemProps) => {
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    switch (props.link.toString()) {
      case "myday":
        setAmount(
          tasks.filter((task: task) => task.myDay && !task.completed).length
        );
        break;
      case "important":
        setAmount(
          tasks.filter((task: task) => task.important && !task.completed).length
        );
        break;
      case "planned":
        setAmount(
          tasks.filter((task: task) => task.dueDate && !task.completed).length
        );
        break;
      case "inbox":
        setAmount(
          tasks.filter((task: task) => !task.listId && !task.completed).length
        );
        break;
      default:
        setAmount(
          tasks.filter(
            (task: task) =>
              task.listId === props.link.toString() && !task.completed
          ).length
        );
        break;
    }
  }, [tasks]);

  return (
    <Link to={props.link}>
      <li
        className={`py-3 px-6 cursor-pointer before:w-1 ${
          currentList.toLowerCase() === props.link.toString()
            ? "bg-indigo-50"
            : "hover:bg-slate-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">{props.name}</div>
          <span className="text-sm">{amount}</span>
        </div>
      </li>
    </Link>
  );
};

export default ListItem;
