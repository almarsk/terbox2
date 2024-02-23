import { useState, useEffect } from "react";
import myRequest from "../../myRequest";

import MenuButton from "../MenuButton";
import AbstractForm from "./AbstractForm";
import Listing from "./Listing";

const EditorPanel = ({ setIssues, initial, flow }) => {
  const [activePanel, setActivePanel] = useState(initial);
  const [activeItem, setActiveItem] = useState({});
  const [structure, setStructure] = useState({});

  useEffect(() => {
    const fetchStructure = async () => {
      setStructure(await myRequest("/structure", {}));
    };
    fetchStructure();
  }, []);

  return (
    <div
      style={{
        width: "375px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "25px",
      }}
    >
      {activePanel === "state" ? (
        <AbstractForm
          element={"state"}
          fields={structure.states || []}
          flow={flow}
        />
      ) : activePanel === "list-states" ? (
        <Listing elements={[]} elementType={"state"} flow={flow} />
      ) : activePanel === "intent" ? (
        <AbstractForm
          element={"intent"}
          fields={structure.intents || []}
          flow={flow}
        />
      ) : activePanel === "list-intents" ? (
        <Listing elements={[]} elementType={"intent"} flow={flow} />
      ) : (
        <AbstractForm
          element={"meta"}
          fields={structure.flow || []}
          flow={flow}
        />
      )}

      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
      >
        <MenuButton
          icon={"🎯"}
          hoverText={"state"}
          click={() => setActivePanel("state")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"🎪"}
          hoverText={"list states"}
          click={() => setActivePanel("list-states")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"💭"}
          hoverText={"intent"}
          click={() => setActivePanel("intent")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"🌧️"}
          hoverText={"list intents"}
          click={() => setActivePanel("list-intents")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"🌎"}
          hoverText={"meta"}
          click={() => setActivePanel("meta")}
          setIssues={setIssues}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
