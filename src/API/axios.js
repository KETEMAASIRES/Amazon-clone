import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-b3c11/us-central1/api",
  baseURL: " https://us-central1-clone-b3c11.cloudfunctions.net/api",
});
