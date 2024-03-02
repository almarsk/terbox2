import PropTypes from "prop-types";

const IntInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <input
      min={0}
      type="number"
      className="input-field"
      name={label}
      placeholder={label}
      value={activeItem[label]}
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
