import PropTypes from "prop-types";

import { useState } from "react";
import ListItems from "./ListItems";
import NewItem from "./NewItem";
import { useContext } from "react";
import { InputContext } from "../InputContext";

const Say = ({ label }) => {
  const { inputUtils } = useContext(InputContext);
  const { activeItem, setChanges, setActiveItem } = inputUtils;
  const [isPrompt, setIsPrompt] = useState(false);

  return (
    <>
      <div className="say-container">
        <div className="input-field say-input">
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
            activeItem && Object.entries(activeItem).length && activeItem[label]
              ? activeItem[label]
              : []
          }
        />
      </div>
    </>
  );
};

Say.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Say;
