import { useState } from "react";
import BotBrick from "./BotBrick";

const FlowList = ({ activeFlows, setIssues, fetchBots }) => {
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
      {activeFlows.map(([b, s, p, project, a]) => {
        return (
          <BotBrick
            bot={b}
            status={s}
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
