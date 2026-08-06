import axios from "axios";

export const IMAGE_BASE_URL = "https://www.auropumps.com/";
//export const IMAGE_BASE_URL = "https://localhost:7148/";
const api = axios.create({
   // baseURL: "/api",
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
}); 

export default api;
