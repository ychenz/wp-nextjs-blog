import { combineReducers } from "redux";
import subscribeReducer from "./subscribe";

// COMBINED REDUCERS
const rootReducer = combineReducers({
  subscribe: subscribeReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
