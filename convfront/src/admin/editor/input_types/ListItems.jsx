import PropTypes from "prop-types";
import { useEffect } from "react";

const ListItems = ({ tags, editTags, vertical, meta }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        width: "20vw",
        overflow: "auto",
      }}
    >
      {tags.length
        ? tags.map((t, i) => (
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "rgb(189,189,189)",
                borderRadius: "10px",
                padding: "1px 5px",
                margin: "2px",
                display: "flex",
                alignItems: "center",
                minHeight: "25px",
              }}
              onClick={() => {
                const newTags = [...tags];
                newTags.splice(i, 1);
                editTags(newTags);
              }}
              key={i}
            >
              {`${meta == "say" ? `${t.prompt ? "prompt" : "say"} - ${t.text}` : t}`}
            </div>
          ))
        : ""}
    </ul>
  );
};

// PropType validations
ListItems.propTypes = {
  tags: PropTypes.array.isRequired,
  editTags: PropTypes.func.isRequired,
  vertical: PropTypes.bool,
};

export default ListItems;
