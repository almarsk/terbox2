import { useEffect } from "react";
import StringInput from "./input_types/StringInput";

const EditBrick = ({ label, type, activeItem, setChanges, setActiveItem }) => {
  useEffect(() => {}, [label, type]);

  return (
    <div className="editor-brick">
      <div className="editor-label">{label}:</div>
      {type == "str" ? (
        <StringInput
          activeItem={activeItem}
          label={label}
          setActiveItem={setActiveItem}
          setChanges={setChanges}
        />
      ) : (
        `${type}`
      )}
    </div>
  );
};

export default EditBrick;
