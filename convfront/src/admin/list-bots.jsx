const listBots = async () => {
  const bots_list = await fetch("/list-bots", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
