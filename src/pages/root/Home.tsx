import illustration from "../../assets/illustration.svg";
import ButtonPrimary from "../../components/UI/ButtonPrimary";

const Home = () => {
  return (
    <div className="w-screen flex items-center justify-center p-20 mt-16">
      <div className="basis-2/5">
        <h1 className="text-5xl font-bold mb-10 tracking-wide leading-relaxed max-w-lg">
          A Handy tool for your productivity.
        </h1>
        <div className="w-1/4">
          <ButtonPrimary>Learn more</ButtonPrimary>
        </div>
      </div>
      <img
        src={illustration}
        alt="illustration"
        className="basis-3/5 max-w-6xl"
      />
    </div>
  );
};

export default Home;
