import { SyntheticEvent, useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/app");
    } catch (error: any) {
      dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message });
    }
  };

  return (
    <div className="flex flex-1 w-screen">
      <div className="basis-1/2 flex items-center justify-center">
        <form
          action=""
          method="POST"
          className="w-full flex flex-col items-center gap-3"
          onSubmit={submit}
        >
          <div className="w-1/3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="w-1/3">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="w-1/3 mt-5">
            <ButtonPrimary>Sign in</ButtonPrimary>
          </div>
        </form>
      </div>
      <div className="basis-1/2 flex items-center justify-center">
        <img src={logo} alt="big logo" className="h-80" />
      </div>
    </div>
  );
};

export default Signin;
