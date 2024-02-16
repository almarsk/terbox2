const BotBrick = ({ bot }) => {
  const test = () => {
    console.log("testing", bot);
  };

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
          <button className="submit admin-button">✏️</button>
          <button className="submit admin-button">❔</button>
        </div>
      </div>
    </>
  );
};

export default BotBrick;
