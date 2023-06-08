import { SyntheticEvent, useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import BaseInput from "../../components/UI/BaseInput";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, authDispatch } = useContext(AuthContext);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    authDispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      );
      authDispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/app");
    } catch (error: any) {
      console.log(error.response);
      authDispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
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
          {error && <p className=" text-red-500">{error}</p>}
          <div className="w-1/3">
            <label htmlFor="email">Email</label>
            <BaseInput
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="email">Password</label>
            <BaseInput
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></BaseInput>
          </div>
          <div className="w-1/3 mt-5">
            <ButtonPrimary disabled={loading}>Sign in</ButtonPrimary>
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
