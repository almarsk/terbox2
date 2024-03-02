import { useState } from "react";
import NewItem from "./NewItem";
import ListItems from "./ListItems";
import { useEffect } from "react";

const DictInput = ({ label, activeItem, setChanges, setActiveItem }) => {
  const [dict, setDict] = useState({});
  const [init, setInit] = useState(true);

  useEffect(() => {
    if (activeItem && activeItem[label]) {
      setDict(activeItem[label]);
      setInit(false);
    }
  }, [activeItem, label]);

  useEffect(() => {
    if (!init) {
      setActiveItem((prev) => {
        return { ...prev, [label]: dict };
      });
    }
  }, [dict]);

  return (
    <div>
      <div className="input-field">
        <NewItem
          label={label}
          addTag={(newItem) => {
            setChanges(true);
            setDict((prev) => {
              return { ...prev, [newItem]: [] };
            });
          }}
          tags={dict}
        />
      </div>
      <hr />

      <ul>
        {Object.entries(dict).map(([k, v], i) => {
          return (
            <div key={i}>
              <div
                className="dict-item"
                onClick={() => {
                  setChanges(true);
                  const newDict = Object.entries({ ...dict });
                  newDict.splice(i, 1);
                  setDict(Object.fromEntries(newDict));
                }}
              >
                {k}
              </div>
              <div className="input-field">
                <NewItem
                  label={label}
                  addTag={(item) => {
                    setChanges(true);
                    setDict((prev) => {
                      const added = { ...prev, [k]: [...prev[k], item] };
                      return added;
                    });
                  }}
                  tags={dict}
                />
              </div>
              <ListItems
                editTags={(newTags) => {
                  setChanges(true);
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
