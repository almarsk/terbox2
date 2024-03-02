import PropTypes from "prop-types";
import NewItem from "./NewItem";
import ListItems from "./ListItems";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const ListInput = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;

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
          tags={
            activeItem && Object.entries(activeItem).length
              ? activeItem[label]
              : []
          }
        />
      </div>
      <ListItems
        editTags={(newValue) => {
          setChanges(true);
          setActiveItem((prev) => {
            return { ...prev, [label]: newValue };
          });
        }}
        tags={
          activeItem && Object.entries(activeItem).length
            ? activeItem[label]
            : []
        }
      />
    </div>
  );
};

ListInput.propTypes = {
  label: PropTypes.string.isRequired,
  activeItem: PropTypes.object.isRequired,
  setChanges: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

export default ListInput;
