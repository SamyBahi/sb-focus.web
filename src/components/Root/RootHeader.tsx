import ButtonPrimary from "../UI/ButtonPrimary";
import ButtonSecondary from "../UI/ButtonSecondary";
import logo from "../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RootHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showButtons =
    location.pathname !== "/signin" && location.pathname !== "/signup";

  const signupClickHandler = () => {
    navigate("/signup");
  };

  const signinClickHandler = () => {
    navigate("/signin");
  };

  return (
    <header className="flex p-4 w-full items-center place-content-between overflow-hidden">
      <a href="/" className="flex items-center gap-3 cursor-pointer">
        <img src={logo} alt="Logo" className="h-12 md:h-20" />
        <h1 className="text-sm md:text-4xl font-medium antialiased">
          Smay Focus.
        </h1>
      </a>
      {showButtons && (
        <nav className="justify-self-end">
          <ul className="flex w-64 place-content-evenly items-center">
            <li>
              <ButtonSecondary onClick={signupClickHandler}>
                Sign up
              </ButtonSecondary>
            </li>
            <li>
              <ButtonPrimary onClick={signinClickHandler}>
                Sign in
              </ButtonPrimary>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default RootHeader;
