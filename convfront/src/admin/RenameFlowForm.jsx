import { useEffect, useRef } from "react";
import myRequest from "../myRequest";

const RenameFlowForm = ({
  renameMode,
  setRenameMode,
  newFlowValue,
  setNewFlowValue,
  bot,
  setBotsList,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.focus();
    }
  }, [renameMode]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        myRequest("/rename", {
          name: bot,
          new_name: newFlowValue,
        }).then((response) => {
          if (response.success) {
            setBotsList(); // Assuming setBotsList is a function to update the bots list
            setNewFlowValue(bot);
            setRenameMode(false);
          }
        });
      }}
      className="rename-flow-form"
    >
      <input
        required
        ref={inputRef}
        className="new-flow"
        placeholder="rename flow"
        value={newFlowValue}
        onChange={(e) => setNewFlowValue(e.target.value)}
        type="text"
      />
    </form>
  );
};

export default RenameFlowForm;
