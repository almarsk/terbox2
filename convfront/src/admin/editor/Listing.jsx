import MenuButton from "../MenuButton";

import { useEffect, useState } from "react";
import myRequest from "../../myRequest";

const Listing = ({ elementType, flow, fields }) => {
  const [elements, setElements] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const sending = {
        flow: flow,
        func: "list",
        item_type: elementType,
      };

      console.log(await myRequest("/convform", sending));
    };
    fetchItems();
  }, [elementType, flow]);

  useEffect(() => {
    console.log("elements", elements);
  }, [elements]);

  const handleSubmitItem = (e) => {
    e.preventDefault();
    const edit = async () => {
      const data = {};

      console.log("fields", fields);
      fields.forEach(([key]) => {
        console.log(key);
        data[key] = key == "name" ? newItemValue : "";
      });

      console.log("DATA", data);

      await myRequest("/convform", {
        flow: flow,
        func: "edit",
        item_type: elementType,
        name: newItemValue,
        data: data,
      });
    };
    edit();
  };

  return (
    <>
      <h5>{elementType}s</h5>
      <ul>
        {elements.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              height: "25px",
            }}
          >
            {elementType} {f}
          </div>
        ))}
        <form
          className="folder-brick new-project-form"
          onSubmit={handleSubmitItem}
        >
          <input
            required
            className="new-project"
            placeholder={`new ${elementType}`}
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            type="text"
          />
          <button className="submit admin-button">↵</button>
        </form>
      </ul>
    </>
  );
};

export default Listing;
