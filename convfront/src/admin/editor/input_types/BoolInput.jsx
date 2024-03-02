const BoolInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <div className="bool-input">
      <input
        type="checkbox"
        name={label}
        placeholder={label}
        checked={activeItem[label]}
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

export default BoolInput;
