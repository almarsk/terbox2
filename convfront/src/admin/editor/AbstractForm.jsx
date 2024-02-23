import { useEffect, useState } from "react";

import myRequest from "../../myRequest";
import PropTypes from "prop-types";
import processState from "./processState";

const AbstractForm = ({
  element,
  fields,
  elementName,
  flow,
  setElementName,
}) => {
  const [changes, setChanges] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  useEffect(() => {
    fields.forEach((f) =>
      setActiveItem((prevActive) => {
        return { ...prevActive, [f]: "" };
      }),
    );

    if (elementName) {
      console.log("todo view item and set active");
      console.log(elementName);
    }
  }, [elementName, fields]);

  useEffect(() => {
    return () => {
      if (changes) {
        //console.log("unsaved changes");
        //window.confirm("Unsaved changes. Do you want to proceed?");
      }
    };
  });

  return (
    <>
      <form
        className="editor-input"
        onSubmit={(e) => {
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

            const newItem = await myRequest("/convform", {
              flow: flow,
              func: "view",
              item_type: element,
              name: activeItem.name,
            });

            if (newItem.success) {
              setActiveItem(processState(newItem.data));
            }
          };

          edit();
          setChanges(false);
        }}
      >
        <h5>
          {activeItem.name == "" && element != "meta" ? "new " : ""}
          {element} {activeItem.name}
        </h5>
        <ul>
          {fields
            .filter((f) => !elementName || f != "name")
            .map((f, i) => (
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
                  {f}:
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
    </>
  );
};

AbstractForm.propTypes = {
  element: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  elementName: PropTypes.string.isRequired,
  flow: PropTypes.string.isRequired,
};

export default AbstractForm;
