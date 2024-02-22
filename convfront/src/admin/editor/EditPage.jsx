import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myRequest from "../../myRequest";
import EditorPanel from "./EditorPanel";

const EditPage = ({ setIssues }) => {
  const { flow } = useParams();
  const [proof, setProof] = useState("");
  const [lastEvent, setLastEvent] = useState(`opened ${flow} editor`);

  useEffect(() => {
    const fetchProof = async () => {
      const currentProof = await myRequest("/proof", { flow: flow });
      console.log(currentProof);
      setProof(currentProof.message);
    };
    fetchProof();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h4>Edit {flow}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "60vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "430px",
            justifyContent: "space-between",
            padding: "10px",
            textAlign: "left",
            color: "white",
          }}
        >
          <ul style={{ height: "93%", overflow: "auto" }}>
            {proof.split(",").map((message) => (
              <div style={{ overflow: "auto" }}>{message}</div>
            ))}
          </ul>
          <div>{lastEvent ? `last event: ${lastEvent}` : ""}</div>
        </div>
        <EditorPanel setIssues={setIssues} />
        <EditorPanel setIssues={setIssues} />
      </div>
    </div>
  );
};

export default EditPage;
