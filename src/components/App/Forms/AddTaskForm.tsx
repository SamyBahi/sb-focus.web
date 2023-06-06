import {
  MdRadioButtonUnchecked,
  MdOutlineCheckCircleOutline,
} from "react-icons/md";
import ButtonPrimary from "../../UI/ButtonPrimary";

const AddTaskForm = () => {
  return (
    <form className="flex flex-col h-24 bg-white mt-10 rounded-md drop-shadow-lg text-sm">
      <div id="textinput" className="flex items-center basis-1/2">
        <MdRadioButtonUnchecked className="text-2xl ml-5 mr-5 fill-indigo-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Add a task"
          className="w-11/12 focus:border-indigo-500 focus:outline-none"
          name="title"
          // onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div
        id="otherinputs"
        className="flex w-full justify-end mr-5 bg-slate-100 rounded-b-md basis-1/2 items-center pr-5 border-t-2"
      >
        <div className="flex items-center w-14 text-xs">
          <ButtonPrimary type="submit">Add</ButtonPrimary>
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
