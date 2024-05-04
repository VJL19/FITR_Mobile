import axios from "axios";

const global_axios = axios.create({
  baseURL: "http://192.168.1.15:8082/api/v1/",
  withCredentials: true,
});

export default global_axios;
