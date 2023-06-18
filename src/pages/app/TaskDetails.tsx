import { useSelector } from "react-redux";
import DetailsSection from "../../components/App/Sections/DetailsSection";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const TaskDetails = () => {
  const taskId = useParams().taskId;
  const currentList = useSelector((state: any) => state.tasks.currentList);
  const [content, setContent] = useState(<></>);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentList) {
      navigate("/app/myday");
    } else {
      setContent(<DetailsSection />);
    }
  }, [taskId]);
  return content;
};

export default TaskDetails;
