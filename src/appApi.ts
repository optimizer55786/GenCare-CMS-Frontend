import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/v1/contentlibrary/";

const appApi = axios.create({
  url: BASE_URL,
});

export default appApi;
