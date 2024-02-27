import { useEffect } from "react";
import StringInput from "./input_types/StringInput";
import IntInput from "./input_types/IntInput";
import BoolInput from "./input_types/BoolInput";
import ListInput from "./input_types/ListInput";
import ResponseTypeInput from "./input_types/ResponseTypeInput";

const EditBrick = ({ label, type, activeItem, setChanges, setActiveItem }) => {
  useEffect(() => {}, [label, type]);

  return (
    <div className="editor-brick">
      <div className="editor-label">{label}:</div>
      <div className="editor-field">
        {type == "str" ? (
          <StringInput
            activeItem={activeItem}
            label={label}
            setActiveItem={setActiveItem}
            setChanges={setChanges}
          />
        ) : type == "int" ? (
          <IntInput
            activeItem={activeItem}
            label={label}
            setActiveItem={setActiveItem}
            setChanges={setChanges}
          />
        ) : type == "bool" ? (
          <BoolInput
            activeItem={activeItem}
            label={label}
            setActiveItem={setActiveItem}
            setChanges={setChanges}
          />
        ) : type == "list" ? (
          <ListInput label={label} />
        ) : type == "ResponseType" ? (
          <ResponseTypeInput />
        ) : (
          `${type}`
        )}
      </div>
    </div>
  );
};

export default EditBrick;
