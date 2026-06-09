import axios from "axios";
 
export const IMAGE_BASE_URL = "https://yourwebsitepreview.com/auropumps_com";
 // export const IMAGE_BASE_URL = "https://localhost:7148/";
const api = axios.create({
  // baseURL: "/api",
 baseURL: "/auropumps_com/api",
    headers: {
        "Content-Type": "application/json",
    },
}); 

export default api;
