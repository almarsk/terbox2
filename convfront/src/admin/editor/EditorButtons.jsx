import PropTypes from "prop-types";
import MenuButton from "../MenuButton";

const EditorButtons = ({ setIssues, setActivePanel }) => {
  return (
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
          setActivePanel("meta");
        }}
        setIssues={setIssues}
      />
    </div>
  );
};

EditorButtons.propTypes = {
  setIssues: PropTypes.func.isRequired,
  setActivePanel: PropTypes.func.isRequired,
};

export default EditorButtons;
