import { useState } from "react";

const ListInput = ({ label }) => {
  const [tags, setTags] = useState([]);
  const [newValue, setNewValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
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
        <button
          className="list-submit"
          onClick={(e) => {
            e.preventDefault();
            newValue && setTags([...tags, newValue]);
            setNewValue("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
          ↵
        </button>
      </div>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "250px",
          overflow: "auto",
        }}
      >
        {tags.map((t, i) => (
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "rgb(189,189,189)",
              borderRadius: "10px",
              padding: "1px 5px",
              margin: "2px",
              display: "flex",
              alignItems: "center",
              height: "25px",
            }}
            onClick={() => {
              console.log(tags);
              const newTags = [...tags];
              newTags.splice(i, 1);
              setTags(newTags);
            }}
            key={i}
          >
            {`${t}`}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListInput;
