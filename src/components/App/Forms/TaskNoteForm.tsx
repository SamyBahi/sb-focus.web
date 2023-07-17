import axios from "axios";
import { useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";
import he from "he";

const TaskNoteForm = () => {
  const taskId = useParams().taskId;
  const divRef = useRef(null);
  const { authDispatch } = useContext(AuthContext);
  const reduxDispatch = useDispatch();
  const [placeHolderVisible, setPlaceholderVisible] = useState(true);
  const [content, setContent] = useState("");
  const taskDetails = useSelector((state: any) =>
    state.tasks.tasks.find((task: any) => task._id === taskId)
  );

  useEffect(() => {
    if (taskDetails.note && taskDetails.note !== "") {
      setContent(taskDetails.note);
      setPlaceholderVisible(false);
    } else {
      setContent("");
      setPlaceholderVisible(true);
    }
  }, [taskDetails]);

  const handleFocus = () => {
    setPlaceholderVisible(false);
  };

  const handleBlur = async () => {
    const div: any = divRef.current;
    const content = he.encode(div.innerHTML.trim());

    if (!div || !taskId) {
      return;
    }
    if (content === "") {
      setPlaceholderVisible(true);
    }

    try {
      await axios.put(
        "/tasks/putTaskNote/" + taskId,
        {
          note: content,
        },
        { withCredentials: true }
      );
      reduxDispatch(
        tasksActions.updateTaskNote({ id: taskId, newNote: content })
      );
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

  const handlePlaceholderClick = () => {
    const div: any = divRef.current;
    div.focus();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault(); // Empêche le comportement de collage par défaut

    const clipboardData = event.clipboardData || event.clipboardData;
    const plainText = clipboardData.getData("text/plain"); // Obtient uniquement le texte sans formatage

    const div = divRef.current;
    if (div) {
      // Insérez le texte sans balises HTML ni style dans la div éditable
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        range.deleteContents();
        const textNode = document.createTextNode(plainText);
        range.insertNode(textNode);
        range.selectNodeContents(div);
        range.collapse();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <div className="min-h-12 p-5 max-w-full bg-white mt-2 rounded-sm items-center text-sm relative">
      {placeHolderVisible && (
        <div className=" opacity-60 absolute" onClick={handlePlaceholderClick}>
          Add Note
        </div>
      )}
      <div
        contentEditable
        ref={divRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="focus:outline-none"
        dangerouslySetInnerHTML={{ __html: content }}
        onPaste={handlePaste}
      ></div>
    </div>
  );
};

export default TaskNoteForm;
