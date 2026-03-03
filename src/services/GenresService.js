import { API_URL } from "./api";

export const getGenres = async () => {
  const response = await fetch(`${API_URL}/api/Genres`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export const addGenre = async (genre) => {
  const response = await fetch(`${API_URL}/api/Genres`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(genre),
  });
  return response.json();
}

export const updateGenre = async (genre) => {
  const response = await fetch(`${API_URL}/api/Genres/${genre.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(genre),
  });
  return response.json();
}

export const deleteGenre = async (id) => {
  const response = await fetch(`${API_URL}/api/Genres/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}