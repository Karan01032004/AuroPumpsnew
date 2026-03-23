import axios from "axios";
//export const IMAGE_BASE_URL = "https://dotcompreview.com/auropumps";
export const IMAGE_BASE_URL = "https://localhost:7148/";
const api = axios.create({
  baseURL: "/api",
 //baseURL: "/auropumps/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
