// src/Api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5259/api", // URL de base pour votre backend
});

export default instance;
