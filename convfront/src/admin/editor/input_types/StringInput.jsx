import PropTypes from "prop-types";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const StringInput = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;
  return (
    <textarea
      className="input-field string-input"
      name={label}
      placeholder={label}
      value={activeItem && activeItem[label]}
      onChange={(e) => {
        setChanges(true);
        setActiveItem((prevActive) => {
          return { ...prevActive, [label]: e.target.value };
        });
      }}
    />
  );
};

StringInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default StringInput;
