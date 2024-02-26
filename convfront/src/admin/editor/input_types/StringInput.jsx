const StringInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <input
      style={{ margin: "2px", width: "40%" }}
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

export default StringInput;
