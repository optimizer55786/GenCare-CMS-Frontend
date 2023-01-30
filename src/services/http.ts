import axios from "axios";

let token: string | null = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token");
}
const http = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

export const formdataHttp = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "multipart/form-data",
  },
});

export default http;
