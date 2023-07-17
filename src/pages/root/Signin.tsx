import { SyntheticEvent, useContext, useState } from "react";
import ButtonPrimary from "../../components/UI/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import BaseInput from "../../components/UI/BaseInput";
import { z } from "zod";
import { toast } from "react-toastify";

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().nonempty({ message: "Please enter a valid password." }),
});

type Login = z.infer<typeof LoginSchema>;

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, authDispatch } = useContext(AuthContext);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    authDispatch({ type: "LOGIN_START" });
    try {
      const loginInfo: Login = {
        email,
        password,
      };

      const validationResult = LoginSchema.safeParse(loginInfo);

      if (!validationResult.success) {
        authDispatch({
          type: "LOGIN_ERROR",
          payload: validationResult.error.issues[0].message,
        });
        toast.error(validationResult.error.issues[0].message);
        return;
      }

      const response = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );
      authDispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
      navigate("/app");
    } catch (error: any) {
      authDispatch({
        type: "LOGIN_ERROR",
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-1 w-screen">
      <div className="flex-1 xl:basis-1/2 flex items-center justify-center">
        <form
          action=""
          method="POST"
          className="w-full flex flex-col items-center gap-3"
          onSubmit={submit}
        >
          <div className="w-3/4 md:w-1/3">
            <label htmlFor="email">Email</label>
            <BaseInput
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-3/4 md:w-1/3">
            <label htmlFor="email">Password</label>
            <BaseInput
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></BaseInput>
          </div>
          <div className="w-3/4 md:w-1/3 mt-5">
            <ButtonPrimary
              disabled={loading || email.length === 0 || password.length === 0}
            >
              Sign in
            </ButtonPrimary>
          </div>
        </form>
      </div>
      <div className="hidden xl:basis-1/2 xl:flex xl:items-center xl:justify-center">
        <img src="logo.svg" alt="big logo" className="h-80" />
      </div>
    </div>
  );
};

export default Signin;
