const StringInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <textarea
      className="input-field"
      name={label}
      placeholder={label}
      value={activeItem[label]}
      style={{ minHeight: "30px" }}
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
