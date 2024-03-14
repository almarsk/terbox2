import PropTypes from "prop-types";
import { useState } from "react";
import myRequest from "../../myRequest";

const Listing = ({
  elementType,
  flow,
  fields,
  setActivePanel,
  setActiveElement,
  elements,
  fetchItems,
  fetchProof,
  setLastEvent,
}) => {
  const [newItemValue, setNewItemValue] = useState("");

  const handleSubmitItem = (e) => {
    e.preventDefault();
    const edit = async () => {
      const data = {};

      fields.forEach(([key, type]) => {
        data[key] =
          key == "name"
            ? newItemValue
            : key == "initiativity"
              ? -1
              : determineDefault(type);
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
        fetchProof();
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
      fetchProof();
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
        className="project-brick new-project-form"
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
      <ul className="items-list">
        {elements.map((f, i) => {
          return (
            <div
              onClick={() => handleClick(f)}
              className="project-brick"
              key={i}
            >
              <p className="project-name"> {f}</p>
              <div className="button-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const copy_item = async () => {
                      const really = window.confirm(
                        `copy ${elementType} ${flow}?`,
                      );
                      really &&
                        console.log(`gonna copy ${elementType} ${f}`) &&
                        false &&
                        (await myRequest("/convform", {
                          flow: flow,
                          func: "copy",
                          name: f,
                          item_type: elementType,
                        }).then(() => {
                          fetchProof();
                          fetchItems();
                          setLastEvent(`copied ${elementType} ${f}`);
                        }));
                    };
                    copy_item();
                  }}
                  className="submit admin-button"
                >
                  👥
                </button>
                <button
                  onClick={(e) => {
                    removeButton(e, f);
                    setLastEvent(`removed ${elementType} ${f}`);
                  }}
                  className="submit admin-button"
                >
                  ✏️
                </button>
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

Listing.propTypes = {
  elementType: PropTypes.string.isRequired,
  flow: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  setActivePanel: PropTypes.func.isRequired,
  setActiveElement: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  fetchItems: PropTypes.func.isRequired,
  fetchProof: PropTypes.func.isRequired,
  setLastEvent: PropTypes.func.isRequired,
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
