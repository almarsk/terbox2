import { useState } from "react";
import BotBrick from "./BotBrick";
import myRequest from "../myRequest";

const FlowList = ({
  activeFlows,
  setIssues,
  fetchBots,
  activeProject,
  setBotsList,
}) => {
  const [newFlowValue, setNewFlowValue] = useState("");

  const handleSubmitFlow = async (event) => {
    event.preventDefault();
    setNewFlowValue("");
    await myRequest("/create", {
      item_type: "flow",
      name: newFlowValue,
      destination: activeProject,
    });
    setBotsList(await myRequest("/list-bots", {}));
  };

  return (
    <ul className="flow-list">
      {activeFlows.map(([botName, status, date, project, a], i) => {
        console.log(botName, status, date, project, a, i);

        return (
          <BotBrick
            key={i}
            bot={botName}
            status={status}
            setIssues={setIssues}
            archived={a}
            projectId={project}
            setBotsList={fetchBots}
          />
        );
      })}

      <div className="bot-brick">
        <form onSubmit={handleSubmitFlow}>
          <input
            required
            className="bot-name new-flow"
            placeholder="new flow"
            value={newFlowValue}
            onChange={(e) => setNewFlowValue(e.target.value)}
            type="text"
          />
          <button className="submit">↵</button>
        </form>
      </div>
    </ul>
  );
};

export default FlowList;
