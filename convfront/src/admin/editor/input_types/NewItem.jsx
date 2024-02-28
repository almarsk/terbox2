import { useEffect } from "react";
import { useState } from "react";

const NewItem = ({ addTag, label }) => {
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    console.log("label", label);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        newValue && addTag(newValue);
        setNewValue("");
      }}
      className="input-field list-field"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
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
    </form>
  );
};

export default NewItem;
