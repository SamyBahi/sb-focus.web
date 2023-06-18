import { BsTrash3 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DeleteTaskForm = () => {
  const taskId = useParams().taskId;
  const navigate = useNavigate();
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);

  const handleTrashClick = async () => {
    if (!taskId) {
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:8080/tasks/deleteTask/" + taskId,
        { withCredentials: true }
      );
      navigate("/app/delete/" + taskId);
    } catch (error: any) {
      if (error.response.status === 401) {
        return authDispatch({ type: "LOGOUT" });
      }
      toast.error(
        error.response.status +
          " Something went wrong ! Please try again later."
      );
    }
  };

  return (
    <BsTrash3
      className="text-xl hover:cursor-pointer"
      onClick={handleTrashClick}
    />
  );
};

export default DeleteTaskForm;
