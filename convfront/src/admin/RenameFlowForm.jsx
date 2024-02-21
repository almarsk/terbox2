import myRequest from "../myRequest";

const RenameFlowForm = ({
  setRenameMode,
  newFlowValue,
  setNewFlowValue,
  bot,
  setBotsList,
}) => {
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
      className="bot-name rename-flow-form"
    >
      <input
        required
        className="bot-name new-flow"
        placeholder="rename flow"
        value={newFlowValue}
        onChange={(e) => setNewFlowValue(e.target.value)}
        type="text"
      />
      <button className="submit">↵</button>
    </form>
  );
};

export default RenameFlowForm;
