import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { listItemProps } from "../../types/componentProps";

const ListItem = (props: listItemProps) => {
  const location = useLocation();

  return (
    <Link to={props.link}>
      <li
        className={`py-3 px-6 cursor-pointer before:w-1 ${
          location.pathname.includes(props.link.toString())
            ? "bg-indigo-50"
            : "hover:bg-slate-200"
        }`}
      >
        <h5 className="flex items-center gap-4">{props.children}</h5>
      </li>
    </Link>
  );
};

export default ListItem;
