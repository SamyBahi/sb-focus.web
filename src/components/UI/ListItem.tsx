import { Link } from "react-router-dom";
import { listItemProps } from "../../types/componentProps";
import { useSelector } from "react-redux";

const ListItem = (props: listItemProps) => {
  const currentList = useSelector((state: any) => state.tasks.currentList);

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
          <div className="flex gap-4 items-center">{props.children}</div>
          <span className="text-sm">{props.amount}</span>
        </div>
      </li>
    </Link>
  );
};

export default ListItem;
