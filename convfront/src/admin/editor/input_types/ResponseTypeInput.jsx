const ResponseTypeInput = ({
  activeItem,
  setActiveItem,
  setChanges,
  label,
}) => {
  const handleSelect = (e) => {
    setChanges();
    setActiveItem((prev) => {
      return { ...prev, [label]: e.target.value };
    });
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "start" }}
    >
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

export default ResponseTypeInput;
