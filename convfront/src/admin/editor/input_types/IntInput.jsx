import PropTypes from "prop-types";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const IntInput = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;
  return (
    <input
      min={0}
      type="number"
      className="input-field"
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

IntInput.propTypes = {
  label: PropTypes.string.isRequired,
  activeItem: PropTypes.object.isRequired,
  setChanges: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default IntInput;
