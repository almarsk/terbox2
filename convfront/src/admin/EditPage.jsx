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

  const handleCreate = (e) => {
    e.preventDefault();
    myRequest("/create", {
      item_type: "flow",
      name: flow_name,
      flow: {},
    }).then((e) => console.log(e));
    console.log("new flow will be called:", flow_name);
  };

  return (
    <div>
      <h2>Edit Page</h2>
      <div>{flow}</div>
      <form
        onSubmit={(e) => handleCreate(e)}
        onChange={(e) => setFlowName(e.target.value)}
      >
        <input name="flow-name" className="input-field content" required />
        <button className="submit">↵</button>
      </form>
    </div>
  );
};

export default EditPage;
