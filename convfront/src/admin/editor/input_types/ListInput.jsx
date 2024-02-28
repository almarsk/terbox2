import NewItem from "./NewItem";
import ListItems from "./ListItems";
import { useEffect } from "react";

const ListInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="input-field">
        <NewItem
          label={label}
          addTag={(newValue) => {
            setChanges(true);
            setActiveItem((prev) => {
              return { ...prev, [label]: [...prev[label], newValue] };
            });
          }}
          tags={Object.entries(activeItem).length ? activeItem[label] : []}
        />
      </div>
      <ListItems
        editTags={(newValue) => {
          setChanges(true);
          setActiveItem((prev) => {
            return { ...prev, [label]: newValue };
          });
        }}
        tags={Object.entries(activeItem).length ? activeItem[label] : []}
      />
    </div>
  );
};

export default ListInput;
