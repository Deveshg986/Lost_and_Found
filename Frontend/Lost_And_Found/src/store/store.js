import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemsReducer from "../items/itemsSlice";

const store = configureStore({
  reducer : {
    auth : authReducer,
    items : itemsReducer, 
  },

  devTools : true,
});

export default store;