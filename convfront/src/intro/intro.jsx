import UserInput from "../app/user-input";
import PropTypes from "prop-types";
import submitNewConvo from "./submit-new-convo";

const Intro = ({ bot }) => {
  return (
    <>
      <p id="intro-text">
        Díky, že se účastníte vývoje chatbota jménem <i>{bot}</i>. Nejdřív
        prosím vyplňte libovolnou <b>přezdívku</b>:
      </p>
      <UserInput
        submit={submitNewConvo}
        loading={false}
        display={[true, false]}
      />
    </>
  );
};

Intro.propTypes = {
  start: PropTypes.func.isRequired,
  bot: PropTypes.string.isRequired,
};

export default Intro;
