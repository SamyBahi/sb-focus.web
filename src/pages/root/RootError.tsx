import { useContext, useEffect, useState } from "react";
import MainFooter from "../../components/MainFooter";
import RootHeader from "../../components/Root/RootHeader";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RootError = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  const [content, setContent] = useState(<></>);
  const { authDispatch } = useContext(AuthContext);

  useEffect(() => {
    if (error.status === 404) {
      setContent(
        <h1 className="mt-10">404 error. Couldn't find this page.</h1>
      );
    }
    if (error.status === 401) {
      authDispatch({ type: "LOGOUT" });
      setContent(
        <h1 className="mt-10">
          401 error. You are not Authorized to do this operation.
        </h1>
      );
      navigate("/");
    }
  }, [error]);

  return (
    <div className={`flex flex-col min-h-screen`}>
      <RootHeader />
      <main className="flex flex-col flex-1 items-center">
        <h1 className="text-3xl">Something went wrong !</h1>
        {content}
      </main>
      <MainFooter />
    </div>
  );
};

export default RootError;
