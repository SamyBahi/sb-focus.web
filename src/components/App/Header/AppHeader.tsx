import { useState, useContext } from "react";
import logo from "../../../assets/logo.svg";
import { RxDotsVertical } from "react-icons/rx";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseInput from "../../UI/BaseInput";

const AppHeader = () => {
  const navigate = useNavigate();

  const [showDropDown, setShowDropDown] = useState(false);
  const { loading, error, authDispatch } = useContext(AuthContext);

  const handleMenuClick = () => {
    setShowDropDown((prevShow) => {
      return !prevShow;
    });
  };

  const handleLogOutClick = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        { withCredentials: true }
      );
      authDispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error: any) {
      authDispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <header className="flex p-2 w-full items-center place-content-between overflow-hidden border-b-2 border-b-indigo-500">
      <a href="/" className="flex items-center gap-3 cursor-pointer ">
        <img src={logo} alt="Logo" className="h-5" />
        <h1 className="text-xl font-medium antialiased">Smay Focus.</h1>
      </a>
      <div className="w-1/4">
        <BaseInput type="text" placeholder="Search" name="search" />
      </div>

      <RxDotsVertical
        className="text-xl cursor-pointer"
        onClick={handleMenuClick}
      />

      {showDropDown && (
        <div className="absolute right-5 top-10 mt-2 border-2 bg-white rounded-md shadow-lg overflow-hidden z-20 p-3 w-32">
          <p className="cursor-pointer text-sm" onClick={handleLogOutClick}>
            Logout
          </p>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
