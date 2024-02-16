const submitQuestionnare = async (comment, grade) => {
  const data = JSON.stringify([comment, grade]);
  await fetch("/outro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
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

export default submitQuestionnare;
