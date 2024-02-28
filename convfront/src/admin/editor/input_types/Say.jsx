import { useState } from "react";
import ListItems from "./ListItems";
import NewItem from "./NewItem";
import { useEffect } from "react";

const Say = () => {
  const [says, setSays] = useState([]);
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
            style={{
              display: "flex",
              alignItems: "center",
              border: isPrompt ? "3px solid green" : "3px solid transparent",
              height: "30px",
              marginRight: "5px",
            }}
            onClick={() => setIsPrompt((prev) => !prev)}
          >
            prompt
          </button>

          <NewItem
            area={true}
            addTag={(item) =>
              setSays((prev) => {
                return [...prev, { prompt: isPrompt, text: item }];
              })
            }
          />
        </div>

        <ListItems
          vertical={true}
          tags={
            says.length
              ? says.map(
                  ({ prompt, text }) => `${prompt ? "prompt" : "say"}-${text}`,
                )
              : []
          }
          editTags={setSays}
        />
      </div>
    </>
  );
};

export default Say;
