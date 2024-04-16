import { combineReducers } from "@reduxjs/toolkit";
import Traveler from "./Slices/Traveler";

const rootReducer = combineReducers({
  traveler: Traveler,
});

export default rootReducer;
