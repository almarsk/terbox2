import { useEffect, useState } from "react";
import myRequest from "../../myRequest";

const Listing = ({
  elementType,
  flow,
  fields,
  setActivePanel,
  setActiveElement,
  elements,
  fetchItems,
  setLastEvent,
}) => {
  const [newItemValue, setNewItemValue] = useState("");

  useEffect(() => {
    console.log(elementType);
    fetchItems(elementType);
  }, [elementType]);

  const handleSubmitItem = (e) => {
    e.preventDefault();
    const edit = async () => {
      const data = {};

      fields.forEach(([key]) => {
        data[key] = key == "name" ? newItemValue : "";
      });

      await myRequest("/convform", {
        flow: flow,
        func: "edit",
        item_type: elementType,
        name: newItemValue,
        data: data,
      }).then(() => fetchItems(elementType));
    };
    edit();
    setNewItemValue("");
    setLastEvent(`created ${elementType} ${newItemValue}`);
  };

  const removeButton = (e, elementName) => {
    e.stopPropagation();
    myRequest("/convform", {
      flow: flow,
      func: "remove",
      item_type: elementType,
      name: elementName,
    }).then(() => {
      fetchItems(elementType);
    });
  };

  const handleClick = (element) => {
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
              <button
                onClick={(e) => {
                  removeButton(e, f.name);
                  setLastEvent(`removed ${elementType} ${f.name}`);
                }}
                className="submit admin-button"
              >
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
