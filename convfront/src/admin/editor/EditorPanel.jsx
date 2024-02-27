import { useState, useEffect } from "react";
import myRequest from "../../myRequest";
import "./editor.css";

import MenuButton from "../MenuButton";
import AbstractForm from "./AbstractForm";
import Listing from "./Listing";

const EditorPanel = ({ setIssues, initial, flow }) => {
  const [activePanel, setActivePanel] = useState(initial);
  const [structure, setStructure] = useState({});
  const [activeElement, setActiveElement] = useState({});

  useEffect(() => {
    const fetchStructure = async () => {
      const structure_all = await myRequest("/structure", {}).then((e) => {
        return e;
      });
      setStructure(structure_all);
    };
    fetchStructure();
  }, []);

  return (
    <div className="panel">
      {activePanel === "state" ? (
        <AbstractForm
          element={"state"}
          fields={structure.states || {}}
          flow={flow}
          elementData={activeElement}
        />
      ) : activePanel === "list-states" ? (
        <Listing
          elements={[]}
          elementType={"state"}
          fields={structure.states || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
        />
      ) : activePanel === "intent" ? (
        <AbstractForm
          element={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          elementData={activeElement}
        />
      ) : activePanel === "list-intents" ? (
        <Listing
          elements={[]}
          elementType={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
        />
      ) : (
        <AbstractForm
          element={"meta"}
          fields={structure.flow || {}}
          flow={flow}
          elementData={activeElement}
        />
      )}

      <div className="editor-menu">
        <MenuButton
          icon={"🎯"}
          hoverText={"state"}
          click={() => setActivePanel("list-states")}
          setIssues={setIssues}
        />
        <MenuButton
          icon={"💭"}
          hoverText={"intent"}
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
