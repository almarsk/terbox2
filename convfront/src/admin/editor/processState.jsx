const processState = (data) => {
  const processedData = {};

  console.log("data data", data);

  processedData.intents = Object.entries(data["intents"])
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join(" | ");

  processedData.say = data["say"].join("|");
  processedData.iteration = data["iteration"];
  processedData.prioritize = data["prioritize"];
  processedData.initiativity = data["iteration"];
  processedData.context_intents = data["context_intents"].join("|");
  processedData.context_states = data["context_states"].join("|");
  processedData.iterate_states = data["iterate_states"].join("|");
  return processedData;
};

export default processState;
