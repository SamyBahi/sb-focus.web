import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/UI/ButtonPrimary";

const Home = () => {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate("/about");
  };
  return (
    <div className="w-screen flex flex-col items-center justify-center p-20 mt-16 xl:flex-row">
      <div className="basis-2/5">
        <h1 className="text-3xl font-bold mb-10 tracking-wide leading-relaxed max-w-lg md:text-5xl">
          A Handy tool for your productivity.
        </h1>
        <div className="w-3/4 md:w-1/4">
          <ButtonPrimary onClick={handleAboutClick}>Learn more</ButtonPrimary>
        </div>
      </div>
      <img
        src="illustration.svg"
        alt="illustration"
        className="basis-3/5 max-w-xs  md:max-w-6xl"
      />
    </div>
  );
};

export default Home;
