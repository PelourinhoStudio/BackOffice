import axios from "axios";

const api = axios.create({
    baseURL: "https://pelourinhostudio.herokuapp.com/",
});

export default api;