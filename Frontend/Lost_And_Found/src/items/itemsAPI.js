import API from "../utils/axiosInstance";

// get all items
export const getAllItemsAPI = () => API.get("/items");

// search items (backend)
export const searchItemsAPI = (filters) =>
  API.get("/items/search", { params: filters });

// get my-posts for user 
export const getUserPostsAPI = () =>
  API.get('/items/user-reports');

// get pending items of staff
export const getPendingItemsAPI = ()=>
  API.get("/items/pending");