import axios from "axios";

const api = axios.create({
    baseURL: "/api",
 //  baseURL: "/auropumps/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
