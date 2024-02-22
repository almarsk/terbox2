import MenuButton from "../MenuButton";

const AbstractForm = ({ element, fields }) => {
  return (
    <>
      <form className="editor-input">
        <h5>{element}</h5>
        <ul>
          {fields.map((f) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                height: "25px",
              }}
            >
              <div style={{ textAlign: "right", width: "40%" }}>{f}:</div>
              <input
                style={{ margin: "2px", width: "40%" }}
                className="input-field"
                name={f}
                placeholder={f}
                onChange={() => setUnsaved(true)}
              />
            </div>
          ))}
        </ul>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <MenuButton
            icon={"📨"}
            click={() => {
              console.log(`submit ${element}`);
              setUnsaved(false);
            }}
            setIssues={() => {}}
            hoverText={"submit {element}"}
          />
        </div>
      </form>
    </>
  );
};

export default AbstractForm;
