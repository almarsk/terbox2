import { useState } from "react";
import NewItem from "./NewItem";
import ListItems from "./ListItems";

const DictInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  const [dict, setDict] = useState({});

  return (
    <div>
      <div className="input-field">
        <NewItem
          label={label}
          addTag={(newItem) =>
            setDict((prev) => {
              return { ...prev, [newItem]: [] };
            })
          }
          tags={dict}
        />
      </div>
      <hr />

      <ul>
        {Object.entries(dict).map(([k, v], i) => {
          return (
            <div key={i}>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  const newDict = Object.entries({ ...dict });
                  newDict.splice(i, 1);
                  setDict(Object.fromEntries(newDict));
                }}
              >
                {k}
              </div>
              <NewItem
                label={label}
                addTag={(item) =>
                  setDict((prev) => {
                    return { ...prev, [k]: [...prev[k], item] };
                  })
                }
                tags={dict}
              />
              <ListItems
                editTags={(newTags) => {
                  setDict((prev) => {
                    return { ...prev, [k]: newTags };
                  });
                }}
                tags={v}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default DictInput;
