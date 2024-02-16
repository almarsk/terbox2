const start_convo = async () => {
  await fetch("/start", {
    method: "POST",
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

  window.location.href = "/";
};

export default start_convo;
