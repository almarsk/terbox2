import { useEffect } from "react";
import StringInput from "./input_types/StringInput";
import IntInput from "./input_types/IntInput";
import BoolInput from "./input_types/BoolInput";
import ListInput from "./input_types/ListInput";
import ResponseTypeInput from "./input_types/ResponseTypeInput";
import DictInput from "./input_types/DictInput";
import Say from "./input_types/Say";

const EditBrick = ({ label, type, activeItem, setChanges, setActiveItem }) => {
  useEffect(() => {}, [label, type]);

  return (
    <div className="editor-brick">
      <div className="editor-label">{label.replace(/_/, " ")}</div>
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
          <ListInput
            activeItem={activeItem}
            label={label}
            setActiveItem={setActiveItem}
            setChanges={setChanges}
          />
        ) : type == "ResponseType" ? (
          <ResponseTypeInput />
        ) : type == "dict" ? (
          <DictInput />
        ) : type.trim() == "list[tuple[convcore.say.Say, str]]" ? (
          <Say />
        ) : (
          `${type}`
        )}
      </div>
    </div>
  );
};

export default EditBrick;
