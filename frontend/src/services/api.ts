import axios from "axios";

export const api = axios.create({
  baseURL: "https://goldstreet-manager-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
