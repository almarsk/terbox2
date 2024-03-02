import PropTypes from "prop-types";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const ResponseTypeInput = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;

  const handleSelect = (e) => {
    setChanges(true);
    setActiveItem((prev) => {
      return { ...prev, [label]: e.target.value };
    });
  };

  return (
    <div className="response-type-input">
      <select
        value={activeItem && activeItem[label]}
        className="input-field"
        id="qualities"
        onChange={handleSelect}
      >
        <option value="initiative">Initiative</option>
        <option value="responsive">Responsive</option>
        <option value="flexible">Flexible</option>
        <option value="connective">Connective</option>
      </select>
    </div>
  );
};

ResponseTypeInput.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ResponseTypeInput;
