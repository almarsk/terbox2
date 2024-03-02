import PropTypes from "prop-types";

const ResponseTypeInput = ({
  activeItem,
  setActiveItem,
  setChanges,
  label,
}) => {
  const handleSelect = (e) => {
    setChanges(true);
    setActiveItem((prev) => {
      return { ...prev, [label]: e.target.value };
    });
  };

  return (
    <div className="response-type-input">
      <select
        value={activeItem[label]}
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
  activeItem: PropTypes.object.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  setChanges: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default ResponseTypeInput;
