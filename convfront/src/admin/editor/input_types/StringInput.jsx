const StringInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <textarea
      className="input-field string-input"
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
