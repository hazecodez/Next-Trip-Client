import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  traveler: null,
};

const travelerSlice = createSlice({
  name: "traveler",
  initialState,
  reducers: {
    TravelerLogin: (state, action) => {
      state.traveler = action.payload.traveler;
    },
    TravelerLogout: (state) => {
      state.traveler = null;
    },
  },
});

export const { TravelerLogin, TravelerLogout } = travelerSlice.actions;
export default travelerSlice.reducer;
