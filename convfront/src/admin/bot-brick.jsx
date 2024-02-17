import { useState } from "react";

const BotBrick = ({ bot, status, setIssues }) => {
  return (
    <>
      <div className="bot-brick">
        <p className="bot-name">
          <b>{bot}</b>
        </p>
        <div className="menu">
          <button
            onClick={() => console.log(bot)}
            className="submit admin-button"
          >
            🧐
          </button>
          <button
            className="submit admin-button"
            onMouseOver={() => setIssues(status.message.replace(/\n/g, "<br>"))}
            onMouseLeave={() => setIssues("")}
          >
            {status.success ? "✏️" : "🔧"}️
          </button>
          <button className="submit admin-button">💾</button>
        </div>
      </div>
    </>
  );
};

export default BotBrick;
