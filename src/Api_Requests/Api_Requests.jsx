import axios from "axios";

const BASE_URL = "https://appspot-admin-backend-production.up.railway.app/api";

export const userToken = localStorage.getItem("userToken");
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    token: userToken,
  },
});

export const apiForImage = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    token: userToken,
  },
});

// Postrfolio
export const GetPortfolioApi = () => api.get("/portfolio");
export const AddPortfolioApi = (payload) => api.post("/portfolio", payload);
export const UpdatePortfolioApi = (id, payload) =>
  api.put("/portfolio/" + id, payload);
export const DeletePortfolioApi = (id) => api.delete("/portfolio/" + id);
