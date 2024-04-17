import axios from "axios";

const global_axios = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  withCredentials: true,
});

export default global_axios;
