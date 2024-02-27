import { useState, useEffect } from "react";
import myRequest from "../../myRequest";
import "./editor.css";

import MenuButton from "../MenuButton";
import AbstractForm from "./AbstractForm";
import Listing from "./Listing";

const EditorPanel = ({
  setIssues,
  initial,
  flow,
  setLastEvent,
  fetchProof,
}) => {
  const [activePanel, setActivePanel] = useState(initial);
  const [structure, setStructure] = useState({});
  const [activeElement, setActiveElement] = useState({});
  const [elements, setElements] = useState([]);

  const fetchItems = async (elementType) => {
    const sending = {
      flow: flow,
      func: "list",
      item_type: elementType,
    };

    myRequest("/convform", sending).then((e) => e.data && setElements(e.data));
  };

  useEffect(() => {
    const fetchStructure = async () => {
      const structure_all = await myRequest("/structure", {}).then((e) => {
        return e;
      });
      setStructure(structure_all);
    };
    fetchStructure();
  }, []);

  useEffect(() => {
    fetchProof();
  }, [activeElement, elements, fetchProof]);

  return (
    <div className="panel">
      {activePanel === "state" ? (
        <AbstractForm
          element={"state"}
          fields={structure.states || {}}
          flow={flow}
          elementData={activeElement}
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
        />
      ) : activePanel === "list-states" ? (
        <Listing
          elementType={"state"}
          fields={structure.states || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
          fetchItems={fetchItems}
          elements={elements}
          setLastEvent={setLastEvent}
        />
      ) : activePanel === "intent" ? (
        <AbstractForm
          element={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          elementData={activeElement}
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
        />
      ) : activePanel === "list-intents" ? (
        <Listing
          elementType={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
          fetchItems={fetchItems}
          elements={elements}
          setLastEvent={setLastEvent}
        />
      ) : (
        <AbstractForm
          element={"meta"}
          fields={structure.flow || {}}
          flow={flow}
          elementData={activeElement}
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
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
          click={() => {
            const listMeta = async () => {
              const meta = await myRequest("/convform", {
                flow: flow,
                func: "list",
                item_type: "meta",
              });
              setActiveElement(meta.data);
              setActivePanel("meta");
            };
            listMeta();
          }}
          setIssues={setIssues}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
