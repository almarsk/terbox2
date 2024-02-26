import MenuButton from "../MenuButton";

import { useEffect, useState } from "react";
import myRequest from "../../myRequest";

const Listing = ({
  elementType,
  flow,
  fields,
  setActivePanel,
  setActiveElement,
}) => {
  const [elements, setElements] = useState([]);
  const [newItemValue, setNewItemValue] = useState("");

  const fetchItems = async () => {
    const sending = {
      flow: flow,
      func: "list",
      item_type: elementType,
    };

    myRequest("/convform", sending).then((e) => e.data && setElements(e.data));
  };

  useEffect(() => {
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
      }).then(fetchItems);
    };
    edit();
    setNewItemValue("");
  };

  const removeButton = (e) => {
    e.stopPropagation();
    console.log("delete button");
  };

  const handleClick = (element) => {
    console.log("changing to editor of", element);

    setActivePanel(elementType);
    setActiveElement(element);
  };

  return (
    <div>
      <h5>{elementType}s</h5>
      <ul>
        {elements.map((f, i) => (
          <div onClick={() => handleClick(f)} className="folder-brick" key={i}>
            <p className="project-name">{f.name}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <button onClick={removeButton} className="submit admin-button">
                ❌️
              </button>
            </div>
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
    </div>
  );
};

export default Listing;
