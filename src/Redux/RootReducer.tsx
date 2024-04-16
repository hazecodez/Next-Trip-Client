import { combineReducers } from "@reduxjs/toolkit";
import Traveler from "./Slices/Traveler";
import Host from "./Slices/Host";

const rootReducer = combineReducers({
  traveler: Traveler,
  host: Host
});

export default rootReducer;
