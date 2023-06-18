import { SyntheticEvent, useContext, useState } from "react";
import logo from "../../assets/logo.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseInput from "../../components/UI/BaseInput";
import { toast } from "react-toastify";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  name: z.string().min(2, { message: "Please enter a valid name." }),
  password: z.string().min(6, { message: "Please enter a valid password" }),
});

type User = z.infer<typeof UserSchema>;

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const userInfo: User = {
        email,
        name,
        password,
      };

      const validationResult = UserSchema.safeParse(userInfo);

      if (!validationResult.success) {
        toast.error(validationResult.error.issues[0].message);
        return;
      }

      await axios.post("http://localhost:8080/auth/signup", userInfo, {
        withCredentials: true,
      });
      navigate("/signin");
    } catch (error: any) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-1 w-screen">
      <div className="basis-1/2 flex items-center justify-center">
        <form
          action=""
          method="POST"
          className="w-full flex flex-col items-center gap-3"
          onSubmit={handleSignupSubmit}
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
            <ButtonPrimary
              type="submit"
              disabled={
                email.length === 0 || password.length === 0 || name.length === 0
              }
            >
              Sign up
            </ButtonPrimary>
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
