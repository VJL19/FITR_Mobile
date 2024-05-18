import axios from "axios";
import loadConfig from "./config";

const config = loadConfig();
const global_axios = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

export default global_axios;
