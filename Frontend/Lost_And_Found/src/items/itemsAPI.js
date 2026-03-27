import API from "../utils/axiosInstance";

// get all items
export const getAllItemsAPI = () => API.get("/items");

// search items (backend)
export const searchItemsAPI = (filters) =>
  API.get("/items/search", { params: filters });