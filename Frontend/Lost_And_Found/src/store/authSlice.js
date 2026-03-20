import { createSlice } from "@reduxjs/toolkit"

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState:{
    isLoggedin : !!initialUser,
    userData: initialUser,
  },

  reducers:{
    login(state, action){
      state.isLoggedin = true;
      state.userData = action.payload;
    },
    logout(state, action){
      state.isLoggedin = false;
      state.userData = null;
    }
  }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;