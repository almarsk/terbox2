const create = async (flow, instructions) => {
  const create = await fetch("/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_type: "flow",
      name: flow,
      flow: instructions,
    }),
  })
    .then(async (response) => await response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return create;
};

export default create;
