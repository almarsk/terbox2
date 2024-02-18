import React from "react";
import MenuButton from "./MenuButton";

const BotBrick = ({ bot, status, setIssues, newFlow }) => {
  if (!newFlow) {
    return (
      <>
        <div className="bot-brick">
          <p className="bot-name">
            <b>{bot}</b>
          </p>
          <MenuButton
            icon={"🚀"}
            hoverText={`redirect to ${bot}`}
            click={() => {
              console.log(`todo - redirect to ${bot}`);
              window.location = `/?flow=${bot}`;
            }}
            setIssues={setIssues}
          />

          <MenuButton
            icon={"📎"}
            hoverText={`link for ${bot}`}
            click={() => {
              const flow_url = `${new URL(window.location.href).origin}/?flow=${bot.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
              navigator.clipboard.writeText(flow_url);
              console.log(`${bot} url copied to clipboard`);
            }}
            setIssues={setIssues}
          />
          <MenuButton
            icon={"🔍"}
            hoverText={`test ${bot}`}
            click={() => console.log(`todo - cstatus interface for ${bot}`)}
            setIssues={setIssues}
            where={`/admin/test/${bot}`}
          />
          <MenuButton
            icon={status.success ? "🏗️" : "🛠️"}
            hoverText={status.message}
            click={() => console.log(`todo - edit interface for ${bot}`)}
            setIssues={setIssues}
            where={`/admin/edit/${bot}`}
          />
          <MenuButton
            icon={"👥"}
            hoverText={`create copy of ${bot}`}
            click={() => console.log(`todo - create copy of ${bot}`)}
            setIssues={setIssues}
          />
          <MenuButton
            icon={"📤"}
            hoverText={`move to ${bot} to folder`}
            click={() => console.log(`todo - move ${bot}`)}
            setIssues={setIssues}
          />
          <MenuButton
            icon={"💾"}
            hoverText={"archive bot"}
            click={() => console.log(`todo - archive ${bot}`)}
            setIssues={setIssues}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="bot-brick">
        <p className="bot-name">
          <i>new flow</i>
        </p>
        <MenuButton
          icon={status.success ? "🏗️" : "🛠️"}
          hoverText={status.message}
          click={() => console.log(`todo - edit interface for ${bot}`)}
          setIssues={setIssues}
          where={`/admin/edit/${bot}`}
        />
      </div>
    );
  }
};

export default BotBrick;
