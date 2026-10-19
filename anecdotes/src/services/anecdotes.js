const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const create = async anecdote => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anecdote),
  };
  const response = await fetch(`${baseUrl}`, options);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const remove = async id => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return await response.json();
};

const vote = async anecdote => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: anecdote.votes + 1 }),
  };
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to update anecdote vote");
  }

  return await response.json();
};

export default { getAll, create, remove, vote };
