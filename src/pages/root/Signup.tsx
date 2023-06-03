import logo from "../../assets/logo.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";

const Signup = () => {
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
            <input
              type="text"
              placeholder="Enter your email"
              className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
              name="email"
            ></input>
          </div>
          <div className="w-1/3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
              name="name"
            ></input>
          </div>
          <div className="w-1/3">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
              name="password"
            ></input>
          </div>
          <div className="w-1/3 mt-5">
            <ButtonPrimary>Sign up</ButtonPrimary>
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
