import { useState } from "react";

const BotBrick = ({ bot, status }) => {
  const test = () => {
    console.log("testing", bot, console.log(status.message));
  };

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <>
      <div className="bot-brick">
        <p className="bot-name">
          <b>{bot}</b>
        </p>
        <div className="menu">
          <button onClick={test} className="submit admin-button">
            🧐
          </button>
          <button
            className="submit admin-button"
            onMouseOver={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            {status.success ? "✏️" : "🔧"}️
          </button>
          <button className="submit admin-button">💾</button>
        </div>
      </div>
      <div
        className="issues-summary"
        style={{
          left: 10,
          top: 10,
          display: isTooltipVisible ? "block" : "none",
        }}
        dangerouslySetInnerHTML={{
          __html: status.message.replace(/\n/g, "<br>"),
        }}
      ></div>
    </>
  );
};

export default BotBrick;
