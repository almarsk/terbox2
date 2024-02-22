import { useState } from "react";

import IntentForm from "./IntentForm";
import StateForm from "./StateForm";
import MetaForm from "./MetaForm";
import MenuButton from "../MenuButton";

const EditorPanel = ({ setIssues }) => {
  const [activePanel, setActivePanel] = useState("");
  return (
    <div
      style={{
        minWidth: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "25px",
      }}
    >
      {activePanel == "state" ? (
        <StateForm />
      ) : activePanel == "intent" ? (
        <IntentForm />
      ) : (
        <MetaForm />
      )}

      <div style={{ display: "flex", flexDirection: "row" }}>
        <MenuButton
          icon={"🎯"}
          hoverText={"state"}
          click={() => setActivePanel("state")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"🎪"}
          hoverText={"list states"}
          click={() => setActivePanel("list states")}
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
          click={() => setActivePanel("list intents")}
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
