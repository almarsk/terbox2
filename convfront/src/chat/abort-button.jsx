const abort_convo = async () => {
  console.log("abortin");
  await fetch("/abort", {
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

export default abort_convo;
