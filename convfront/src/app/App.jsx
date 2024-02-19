import "./App.css";
import PropTypes from "prop-types";
import Intro from "../intro/IntroMain";
import Chat from "../chat/ChatMain";
import Outro from "../outro/OutroMain";
import Start from "../start/StartMain";

const PHASES = {
  INTRO: 0,
  START: 1,
  CHAT: 2,
  OUTRO: 3,
};

const App = ({ bot, phase }) => {
  phase = parseInt(phase);

  console.log("app", bot, phase);

  return (
    <div id="main">
      {!!bot ? (
        phase === PHASES.INTRO ? (
          <Intro bot={bot} />
        ) : phase === PHASES.START ? (
          <Start />
        ) : phase === PHASES.CHAT ? (
          <Chat />
        ) : phase === PHASES.OUTRO ? (
          <Outro />
        ) : (
          <div>Díky za váš čas!</div>
        )
      ) : (
        <div>🤖🤒</div>
      )}
    </div>
  );
};

App.propTypes = {
  bot: PropTypes.string.isRequired,
  phase: PropTypes.number.isRequired,
};

export default App;
