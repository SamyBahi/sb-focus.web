import { BsTrash3 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DeleteTaskForm = () => {
  const taskId = useParams().taskId;
  const navigate = useNavigate();
  const { authDispatch } = useContext(AuthContext);

  const handleTrashClick = async () => {
    if (!taskId) {
      return;
    }

    try {
      await axios.delete("/tasks/deleteTask/" + taskId, {
        withCredentials: true,
      });
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
