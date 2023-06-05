import logo from "../../assets/logo.svg";

const AppHeader = () => {
  return (
    <header className="flex p-4 w-full items-center place-content-between overflow-hidden">
      <a href="/" className="flex items-center gap-3 cursor-pointer">
        <img src={logo} alt="Logo" className="h-10" />
        <h1 className="text-4xl font-medium antialiased">Smay Focus.</h1>
      </a>
    </header>
  );
};

export default AppHeader;
