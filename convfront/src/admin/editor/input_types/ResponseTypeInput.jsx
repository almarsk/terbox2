const ResponseTypeInput = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "start" }}
    >
      <select className="input-field" id="qualities">
        <option value="initiative">Initiative</option>
        <option value="responsive">Responsive</option>
        <option value="flexible" selected>
          Flexible
        </option>
        <option value="connective">Connective</option>
      </select>
    </div>
  );
};

export default ResponseTypeInput;
