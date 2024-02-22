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
    <div className="editor-container" style={{ textAlign: "center" }}>
      <h3>Editing {flow}</h3>
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
            maxWidth: "500px",
            justifyContent: "space-between",
            padding: "10px",
            textAlign: "left",
            color: "white",
          }}
        >
          <ul style={{ height: "93%", overflowY: "auto" }}>
            {proof.split("\n").map((message) => (
              <div>{message}</div>
            ))}
          </ul>
          <div>{lastEvent ? `last event: ${lastEvent}` : ""}</div>
        </div>
        <EditorPanel setIssues={setIssues} initial="list-bots" />
        <EditorPanel setIssues={setIssues} initial="state" />
      </div>
    </div>
  );
};

export default EditPage;
