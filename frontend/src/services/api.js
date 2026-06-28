import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Crucial for sending/receiving cookies
});

export default API;
