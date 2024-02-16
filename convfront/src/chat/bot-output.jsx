import PropTypes from "prop-types";

const BotOutput = ({ botSpeech }) => {
  return (
    <div className="content-box">
      <p className="icon">🤖:️</p>
      <div className="content">{botSpeech}</div>
    </div>
  );
};

BotOutput.propTypes = {
  botSpeech: PropTypes.string.isRequired,
};

export default BotOutput;
