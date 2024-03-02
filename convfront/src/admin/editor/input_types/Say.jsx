import { useState } from "react";
import ListItems from "./ListItems";
import NewItem from "./NewItem";
import { useEffect } from "react";

const Say = ({ label, activeItem, setChanges, setActiveItem }) => {
  const [isPrompt, setIsPrompt] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "3px",
          alignItems: "bottom",
        }}
      >
        <div
          className="input-field"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "3px",
            alignItems: "bottom",
          }}
        >
          <button
            className="prompt-button"
            onClick={() => setIsPrompt((prev) => !prev)}
          >
            {isPrompt ? "prompt" : "say"}
          </button>

          <NewItem
            label={isPrompt ? "prompt" : label}
            area={true}
            addTag={(newValue) => {
              setChanges(true);
              setActiveItem((prev) => {
                return {
                  ...prev,
                  [label]: [
                    ...prev[label],
                    { text: newValue, prompt: isPrompt },
                  ],
                };
              });
            }}
          />
        </div>

        <ListItems
          meta={"say"}
          vertical={true}
          editTags={(newValue) => {
            setChanges(true);
            setActiveItem((prev) => {
              return { ...prev, [label]: newValue };
            });
          }}
          tags={
            Object.entries(activeItem).length && activeItem[label]
              ? activeItem[label]
              : []
          }
        />
      </div>
    </>
  );
};

export default Say;
