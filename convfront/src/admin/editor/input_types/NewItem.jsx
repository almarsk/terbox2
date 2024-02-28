import { useEffect } from "react";
import { useState } from "react";

const NewItem = ({ addTag, label, area }) => {
  const [newValue, setNewValue] = useState("");

  useEffect(() => {}, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        newValue && addTag(newValue);
        setNewValue("");
      }}
      className="list-field"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {!area ? (
        <input
          className="list-input"
          style={{
            backgroundColor: "transparent",
            fontSize: "18px",
            border: "none",
          }}
          onChange={(e) => setNewValue(e.target.value)}
          value={newValue}
          placeholder={label}
        />
      ) : (
        <div>
          <textarea
            className="list-input"
            style={{
              backgroundColor: "transparent",
              fontSize: "18px",
              border: "none",
              resize: "vertical",
              mozResize: "vertical",
              webkitResize: "vertical",
              minHeight: "138px",
            }}
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
            placeholder={label}
          />
          <button
            className="prompt-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "15vw",
            }}
          >
            <div>↵</div>
          </button>
        </div>
      )}
    </form>
  );
};

export default NewItem;
