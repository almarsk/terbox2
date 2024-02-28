const BoolInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "start" }}
    >
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
