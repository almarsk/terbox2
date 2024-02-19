const listProjects = async () => {
  const projects_list = await fetch("/list-projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => await response.json())
    .then((result) => {
      console.log("result-", result);
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return projects_list;
};

export default listProjects;
