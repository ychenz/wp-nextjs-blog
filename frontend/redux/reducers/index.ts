import { combineReducers } from "redux";
import resourceReducer from "./resources";

// COMBINED REDUCERS
const rootReducer = combineReducers({
  resources: resourceReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
