import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myRequest from "../../myRequest";
import EditorPanel from "./EditorPanel";

const EditPage = ({ setIssues }) => {
  const { flow } = useParams();
  const [proof, setProof] = useState("");
  const [lastEvent, setLastEvent] = useState(`opened ${flow} editor`);
  const [flowData, setFlowData] = useState({});

  const fetchProof = async () => {
    const currentProof = await myRequest("/proof", { flow: flow });
    setProof(currentProof.message);
  };

  const fetchItems = async () => {
    const sending = {
      flow: flow,
      func: "list",
    };
    myRequest("/convform", sending).then((e) => {
      e.data && setFlowData(e.data);
    });
  };

  useEffect(() => {
    fetchProof();
    fetchItems();
  }, []);

  return (
    <div className="editor-container" style={{ width: "100%" }}>
      <h3 style={{ margin: 0 }}>Editing {flow}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "85vh",
            width: "33vh",
            display: "flex",
            flexDirection: "column",

            justifyContent: "start",
            padding: "10px",
            textAlign: "left",
            color: "white",
          }}
        >
          <div>
            <b>{lastEvent ? `last event: ${lastEvent}` : ""}</b>
          </div>
          <ul style={{ height: "93%", overflowY: "auto", marginTop: "20px" }}>
            {proof && proof.split("\n").map((message) => <div>{message}</div>)}
          </ul>
        </div>
        <EditorPanel
          setIssues={setIssues}
          initial="list-states"
          flow={flow}
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
          flowData={flowData}
          fetchItems={fetchItems}
        />
        <EditorPanel
          setIssues={setIssues}
          initial="list-intents"
          flow={flow}
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
          flowData={flowData}
          fetchItems={fetchItems}
        />
      </div>
    </div>
  );
};

export default EditPage;
