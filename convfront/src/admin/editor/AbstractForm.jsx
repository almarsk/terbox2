import React, { useEffect, useState } from "react";

import MenuButton from "../MenuButton";
import myRequest from "../../myRequest";

const AbstractForm = ({ element, fields, elementName, flow }) => {
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    return () => {
      if (changes) {
        console.log("unsaved changes");
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
          console.log(`submit ${element}`);

          const edit = async () => {
            console.log(
              await myRequest("/convform", {
                flow: flow,
                func: "edit",
                item_type: element,
                name: "blol",
                data: "data",
              }),
            );
          };

          edit();
          setChanges(false);
        }}
      >
        <h5>
          {elementName || element == "meta" || "new "}
          {element} {elementName}
        </h5>
        <ul>
          {fields.map((f) => (
            <div
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
                onChange={() => setChanges(true)}
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

export default AbstractForm;
