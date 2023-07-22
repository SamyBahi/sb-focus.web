import { useState, useContext, useEffect } from "react";
import { RxDotsVertical } from "react-icons/rx/index";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseInput from "../../UI/BaseInput";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../../store/taskSlice/tasksSlice";

const AppHeader = () => {
  const navigate = useNavigate();
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const reduxDispatch = useDispatch();

  const [showDropDown, setShowDropDown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { authDispatch } = useContext(AuthContext);

  const handleMenuClick = () => {
    setShowDropDown((prevShow) => {
      return !prevShow;
    });
  };

  const handleLogOutClick = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      authDispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error: any) {
      authDispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    if (searchValue !== "") {
      reduxDispatch(tasksActions.searchTask(searchValue));
      return;
    } else {
      reduxDispatch(tasksActions.setCurrentTasks(currentList));
      return;
    }
  }, [searchValue]);

  return (
    <header className="flex h-20 p-2 w-full items-center place-content-between border-b-2 border-b-indigo-500">
      <a href="/" className="flex items-center gap-3 cursor-pointer ">
        <img src="/logo.svg" alt="Logo" className="h-5" />
        <h1 className="text-xl font-medium antialiased">SB Focus.</h1>
      </a>
      <div className="w-1/4">
        <BaseInput
          type="text"
          placeholder="Search"
          name="search"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <RxDotsVertical
        className="text-xl cursor-pointer"
        onClick={handleMenuClick}
      />

      {showDropDown && (
        <div className="absolute right-5 top-10 mt-2 border-2 bg-white rounded-md shadow-lg overflow-hidden z-30 p-3 w-32">
          <p className="cursor-pointer text-sm" onClick={handleLogOutClick}>
            Logout
          </p>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
