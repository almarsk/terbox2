import { useEffect, useState } from "react";

import myRequest from "../../myRequest";
import PropTypes from "prop-types";
import EditBrick from "./EditBrick";

const AbstractForm = ({
  element,
  elementData,
  fields,
  flow,
  setLastEvent,
  fetchProof,
}) => {
  const [changes, setChanges] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const edit = async () => {
      await myRequest("/convform", {
        flow: flow,
        func: "edit",
        item_type: element,
        name: activeItem.name,
        data: activeItem,
      }).then(() => fetchProof());
    };
    edit();
    setChanges(false);
    setLastEvent(`edited ${element} ${activeItem.name || ""}`);
  };

  useEffect(() => {
    if (fields.length && elementData) {
      fields.forEach(([fName]) =>
        setActiveItem((prevActive) => {
          return { ...prevActive, [fName]: elementData[fName] };
        }),
      );
    }
  }, [fields, element, elementData]);

  useEffect(() => {
    return () => {
      if (changes) {
        //console.log("unsaved changes");
        //window.confirm("Unsaved changes. Do you want to proceed?");
      }
    };
  });

  return (
    <form className="editor-input" onSubmit={handleSubmit}>
      <h5>
        {element} {activeItem.name || flow}
      </h5>
      <ul>
        {fields.length &&
          fields
            .filter(([f]) => f != "name")
            .map(([f, fType], i) => (
              <EditBrick
                key={i}
                label={f}
                type={fType}
                setChanges={setChanges}
                setActiveItem={setActiveItem}
                activeItem={activeItem}
                setLastEvent={setLastEvent}
              />
            ))}
      </ul>
      <div className="editor-submit">
        <button className="submit admin-button">📨</button>
      </div>
    </form>
  );
};

AbstractForm.propTypes = {
  element: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  elementData: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired,
};

export default AbstractForm;
