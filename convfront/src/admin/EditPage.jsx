import { useEffect } from "react";
import listBots from "./list-bots";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const { flow } = useParams();

  useEffect(() => {
    console.log("edit timee");
    listBots(flow).then((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2>Edit Page</h2>
      <div>{flow}</div>
    </div>
  );
};

export default EditPage;
