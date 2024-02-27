import React from "react";
import MenuButton from "./MenuButton";
import myRequest from "../myRequest";
import { useState, useRef } from "react";
import DraggableLabel from "./DraggableLabel";
import RenameFlowForm from "./RenameFlowForm";
import download_flow from "./download_flow";

const BotBrick = ({ bot, status, setIssues, archived, setBotsList }) => {
  const [renameMode, setRenameMode] = useState(false);
  const [newFlowValue, setNewFlowValue] = useState(bot);

  return (
    <div className="bot-brick">
      <div className="bot-name">
        {!renameMode ? (
          <DraggableLabel
            setIssues={setIssues}
            bot={bot}
            statusSuccess={status.success}
            setBotsList={setBotsList}
          />
        ) : (
          <RenameFlowForm
            renameMode={renameMode}
            setRenameMode={setRenameMode}
            newFlowValue={newFlowValue}
            setNewFlowValue={setNewFlowValue}
            bot={bot}
            setBotsList={setBotsList}
          />
        )}
      </div>

      <div
        style={{
          opacity: status.success ? 100 : 0,
          zIndex: status.success ? 10 : -1,
        }}
      >
        <MenuButton
          icon={"🚀"}
          hoverText={`redirect to ${bot}`}
          click={() => {
            status.success ? (window.location = `/?flow=${bot}`) : ``;
          }}
          setIssues={setIssues}
        />
      </div>

      <MenuButton
        icon={"📎"}
        hoverText={`link for ${bot}`}
        click={() => {
          const flow_url = `${new URL(window.location.href).origin}/?flow=${bot.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
          navigator.clipboard.writeText(flow_url);
        }}
        setIssues={setIssues}
      />

      <MenuButton
        icon={"✏️"}
        hoverText={`change name of ${bot}`}
        click={() => {
          setRenameMode((prev) => !prev);
          setNewFlowValue(bot);
        }}
        setIssues={setIssues}
      />

      <MenuButton
        icon={"🔍"}
        hoverText={`test ${bot}`}
        setIssues={setIssues}
        where={`/admin/test/${bot}`}
      />

      <MenuButton
        icon={status.success ? "🏗️" : "🛠️"}
        hoverText={status.message}
        setIssues={setIssues}
        where={`/admin/edit/${bot}`}
      />

      <MenuButton
        icon={"👥"}
        hoverText={`create copy of ${bot}`}
        click={async () => {
          const really = window.confirm(`copy flow ${bot}?`);
          really &&
            (await myRequest("/copy_flow", { name: bot }).then(() =>
              setBotsList(),
            ));
        }}
        setIssues={setIssues}
      />

      <MenuButton
        icon={"📥️"}
        hoverText={`export ${bot} in json`}
        click={() => download_flow(bot)}
        setIssues={setIssues}
      />

      <MenuButton
        icon={archived ? "💡" : "💾"}
        hoverText={"archive bot"}
        click={() => {
          myRequest("/move", {
            item_type: "flow",
            name: bot,
            destination: archived ? 1 : 2,
          }).then(() => setBotsList());
        }}
        setIssues={setIssues}
      />
    </div>
  );
};

export default BotBrick;
