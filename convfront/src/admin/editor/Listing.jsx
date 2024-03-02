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

  const handleSubmitItem = (e) => {
    e.preventDefault();
    const edit = async () => {
      const data = {};

      console.log("fields", fields);

      fields.forEach(([key, type]) => {
        data[key] = key == "name" ? newItemValue : determineDefault(type);
      });

      await myRequest("/convform", {
        flow: flow,
        func: "edit",
        item_type: elementType,
        name: newItemValue,
        data: data,
      }).then((e) => {
        console.log(e);
        fetchItems();
        e.success
          ? setLastEvent(`created ${elementType} ${newItemValue}`)
          : setLastEvent(`couldn't create ${elementType} ${newItemValue}`);
      });
    };
    edit();
    setNewItemValue("");
  };

  const removeButton = (e, elementName) => {
    e.stopPropagation();
    myRequest("/convform", {
      flow: flow,
      func: "remove",
      item_type: elementType,
      name: elementName,
    }).then(() => {
      fetchItems();
    });
  };

  const handleClick = (element) => {
    setActivePanel(elementType);
    setActiveElement(element);
  };

  return (
    <div>
      <h5>{elementType}s</h5>
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
      <ul style={{ height: "70vh", overflow: "auto" }}>
        {elements.map((f, i) => {
          return (
            <div
              onClick={() => handleClick(f)}
              className="folder-brick"
              key={i}
            >
              <p className="project-name"> {f}</p>
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
                    removeButton(e, f);
                    setLastEvent(`removed ${elementType} ${f}`);
                  }}
                  className="submit admin-button"
                >
                  ❌️
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Listing;

const determineDefault = (type) => {
  return type.includes("list")
    ? []
    : type.includes("dict")
      ? {}
      : type.includes("bool")
        ? false
        : type.includes("int")
          ? 1
          : type == "ResponseType"
            ? "flexible"
            : "";
};
