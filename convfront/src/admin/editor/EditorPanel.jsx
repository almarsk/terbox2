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
  flowData,
  fetchItems,
}) => {
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
  }, [flowData]);

  useEffect(() => {
    fetchProof();
  }, [activeElement, fetchProof]);

  return (
    <div className="panel">
      {activePanel === "state" ? (
        <AbstractForm
          element={"state"}
          fields={structure.states || {}}
          flow={flow}
          elementData={
            flowData &&
            flowData.states.filter((f) => f.name == activeElement)[0]
          }
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
          fetchItems={fetchItems}
        />
      ) : activePanel === "list-states" ? (
        <Listing
          elementType={"state"}
          fields={structure.states || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
          fetchItems={fetchItems}
          elements={
            flowData && flowData.states
              ? flowData.states.map((s) => {
                  console.log("single", JSON.stringify(s));
                  return s.name;
                })
              : []
          }
          setLastEvent={setLastEvent}
        />
      ) : activePanel === "intent" ? (
        <AbstractForm
          element={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          elementData={
            flowData &&
            flowData.intents.filter((f) => (f.name = activeElement))[0]
          }
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
          fetchItems={fetchItems}
        />
      ) : activePanel === "list-intents" ? (
        <Listing
          elementType={"intent"}
          fields={structure.intents || {}}
          flow={flow}
          setActivePanel={setActivePanel}
          setActiveElement={setActiveElement}
          fetchItems={fetchItems}
          elements={
            flowData && flowData.intents
              ? flowData.intents.map((s) => s.name)
              : []
          }
          setLastEvent={setLastEvent}
        />
      ) : (
        <AbstractForm
          element={"meta"}
          fields={structure.flow || {}}
          flow={flow}
          elementData={
            flowData &&
            Object.fromEntries(
              Object.entries(flowData).filter(
                (k) => !["states", "intents"].includes(k),
              ),
            )
          }
          setLastEvent={setLastEvent}
          fetchProof={fetchProof}
          fetchItems={fetchItems}
        />
      )}

      <div className="editor-menu">
        <MenuButton
          icon={"🎯"}
          hoverText={"state"}
          click={() => {
            setActivePanel("list-states");
          }}
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
            setActiveElement(
              Object.entries(flowData).filter(
                (k) => k != "intents" && k != "states",
              ),
            );
            setActivePanel("meta");
          }}
          setIssues={setIssues}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
