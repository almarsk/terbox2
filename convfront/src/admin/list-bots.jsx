const listBots = async (flow) => {
  const bots_list = await fetch("/list-bots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flow: flow,
    }),
  })
    .then(async (response) => await response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return bots_list;
};

export default listBots;
