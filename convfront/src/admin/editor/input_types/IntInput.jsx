const IntInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <input
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

export default IntInput;
