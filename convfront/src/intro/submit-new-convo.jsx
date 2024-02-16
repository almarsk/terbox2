const submitNewConvo = async (e) => {
  const nick = new FormData(e.target).get("content");
  const data = JSON.stringify({ nick: nick });
  await fetch("/intro", {
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

export default submitNewConvo;
