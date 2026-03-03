import { API_URL } from "./api";

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/api/Movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}

export const addMovie = async (movie) => {
  const response = await fetch(`${API_URL}/api/Movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(movie),
  });
  return response.json();
}

export const updateMovie = async (movie) => {
  const response = await fetch(`${API_URL}/api/Movies/${movie.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(movie),
  });
  return response.json();
}

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/api/Movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.json();
}