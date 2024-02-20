import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import myRequest from "../myRequest";

const EditPage = () => {
  const { flow } = useParams();
  const [flow_name, setFlowName] = useState(flow);

  useEffect(() => {
    myRequest("/proof", { flow: flow }).then((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2>Edit Page</h2>
      <div>{flow}</div>
    </div>
  );
};

export default EditPage;
