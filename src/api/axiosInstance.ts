import axios from "axios";

const API = axios.create({
  // baseURL: "https://exam-management-1-0-0.onrender.com/", 
  baseURL:"http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
});

export default API;
