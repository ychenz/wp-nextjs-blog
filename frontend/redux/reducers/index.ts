import { combineReducers } from "redux";
import Immutable from "immutable";
import subscribeReducer from "./subscribe";

function testReducer(state = Immutable.Map({ counter: 0 }), action) {
  switch (action.type) {
    case "TEST_ACTION":
      return state.set("counter", state.get("counter") + 1);
    default:
      return state;
  }
}

// COMBINED REDUCERS
const rootReducer = combineReducers({
  subscribe: subscribeReducer,
  test: testReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
