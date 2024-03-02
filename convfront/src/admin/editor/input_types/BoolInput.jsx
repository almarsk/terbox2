import PropTypes from "prop-types";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const BoolInput = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;
  return (
    <div className="bool-input">
      <input
        type="checkbox"
        name={label}
        placeholder={label}
        checked={activeItem && activeItem[label]}
        onChange={(e) => {
          setChanges(true);
          setActiveItem((prevActive) => {
            return { ...prevActive, [label]: e.target.checked };
          });
        }}
      />
    </div>
  );
};

BoolInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default BoolInput;
