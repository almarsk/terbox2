import NewItem from "./NewItem";
import ListItems from "./ListItems";

const ListInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  return (
    <div className="list-input">
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
