import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  host: null,
};
const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    hostLogin: (state, action) => {
      state.host = action.payload.host;
    },
    hostLogout: (state) => {
      state.host = null;
    },
  },
});

export const { hostLogin, hostLogout } = hostSlice.actions;
export default hostSlice.reducer;
