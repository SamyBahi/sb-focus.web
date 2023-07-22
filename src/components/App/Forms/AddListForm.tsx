import axios from "axios";
import { SyntheticEvent, useContext, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import { listsActions } from "../../../store/listsSlice/listsSlice";
import { AuthContext } from "../../../context/AuthContext";

const ListSchema = z.object({
  title: z.string().nonempty({ message: "Please enter a valid task title." }),
});

type List = z.infer<typeof ListSchema>;

const AddListForm = () => {
  const reduxDispatch = useDispatch();
  const { authDispatch } = useContext(AuthContext);
  const [ListTitle, setListTitle] = useState("");

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const listInfos: List = {
        title: ListTitle,
      };

      const validationResult = ListSchema.safeParse(listInfos);

      if (!validationResult.success) {
        toast.error(validationResult.error.issues[0].message);
        return;
      }

      const addedList = await axios.post(
        "/lists/postList",
        {
          title: ListTitle,
        },
        { withCredentials: true }
      );
      reduxDispatch(
        listsActions.addCustomLists({
          list: {
            id: addedList.data.result._id,
            title: addedList.data.result.title,
          },
        })
      );
      setListTitle("");
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
    <li className={`py-3 px-6 before:w-1 hover:bg-slate-200 mt-3`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center grow">
          <form className="flex space-x-3" onSubmit={handleFormSubmit}>
            <button type="submit">
              <BsPlusLg className="text-xl fill-black" />
            </button>
            <input
              type="text"
              placeholder="New List"
              className="bg-transparent focus:outline-none w-full"
              value={ListTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
          </form>
        </div>
      </div>
    </li>
  );
};

export default AddListForm;
