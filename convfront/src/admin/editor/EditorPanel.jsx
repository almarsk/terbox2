import { useState } from "react";

import MenuButton from "../MenuButton";
import AbstractForm from "./AbstractForm";

const EditorPanel = ({ setIssues, initial }) => {
  const [activePanel, setActivePanel] = useState(initial);
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
      {activePanel == "state" ? (
        <AbstractForm
          element={"State"}
          fields={[
            "name",
            "intents",
            "annotation",
            "say",
            "response type",
            "iteration",
            "prioritize",
            "initiativity",
            "context intents",
            "context states",
            "iterate states",
          ]}
        />
      ) : activePanel == "intent" ? (
        <AbstractForm
          element={"Intent"}
          fields={[
            "name",
            "annotation",
            "match against",
            "adjacent",
            "context intents",
            "context states",
            "iterate states",
          ]}
        />
      ) : (
        <AbstractForm element={"Meta"} fields={["persona", "track", "coda"]} />
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
