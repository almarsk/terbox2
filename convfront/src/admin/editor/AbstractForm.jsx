import { useEffect, useState } from "react";

import myRequest from "../../myRequest";
import PropTypes from "prop-types";

const AbstractForm = ({ element, fields, flow }) => {
  const [changes, setChanges] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submit ${JSON.stringify(activeItem)}`);
    const edit = async () => {
      await myRequest("/convform", {
        flow: flow,
        func: "edit",
        item_type: element,
        name: activeItem.name,
        data: activeItem,
      });
    };
    edit();
    setChanges(false);
  };

  useEffect(() => {
    console.log("fields", fields);

    if (fields.length)
      fields.forEach(([fName]) =>
        setActiveItem((prevActive) => {
          return { ...prevActive, [fName]: "" };
        }),
      );
  }, [fields]);

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
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  height: "25px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "end",
                    textAlign: "right",
                  }}
                >
                  {f}, {fType}:
                </div>
                <input
                  required={f == "name"}
                  style={{ margin: "2px", width: "40%" }}
                  className="input-field"
                  name={f}
                  placeholder={f}
                  value={activeItem[f]}
                  onChange={(e) => {
                    setChanges(true);
                    setActiveItem((prevActive) => {
                      return { ...prevActive, [f]: e.target.value };
                    });
                  }}
                />
              </div>
            ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button className="submit admin-button">📨</button>
      </div>
    </form>
  );
};

AbstractForm.propTypes = {
  element: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  flow: PropTypes.string.isRequired,
};

export default AbstractForm;
