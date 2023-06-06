import { SyntheticEvent, useState } from "react";
import logo from "../../assets/logo.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseInput from "../../components/UI/BaseInput";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        { email, name, password },
        { withCredentials: true }
      );
      navigate("/signin");
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex flex-1 w-screen">
      <div className="basis-1/2 flex items-center justify-center">
        <form
          action=""
          method="POST"
          className="w-full flex flex-col items-center gap-3"
        >
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
            <label htmlFor="name">Name</label>
            <BaseInput
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="email">Password</label>
            <BaseInput
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-1/3 mt-5">
            <ButtonPrimary onClick={handleSignupClick}>Sign up</ButtonPrimary>
          </div>
        </form>
      </div>
      <div className="basis-1/2 flex items-center justify-center">
        <img src={logo} alt="big logo" className="h-80" />
      </div>
    </div>
  );
};

export default Signup;
