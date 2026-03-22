import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState:{
    isLoggedin : false,
    userData: null,
  },

  reducers:{
    login(state, action){
      state.isLoggedin = true;
      state.userData = action.payload.userData;
    },
    logout(state, action){
      state.isLoggedin = false;
      state.userData = null;
    }
  }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;