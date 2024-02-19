import { useEffect } from "react";
import proof from "./proof";
import create from "./create";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EditPage = () => {
  const { flow } = useParams();
  const [flow_name, setFlowName] = useState(flow);

  useEffect(() => {
    proof(flow).then((e) => console.log(e));
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    create(flow_name, {}).then((e) => console.log(e));
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
