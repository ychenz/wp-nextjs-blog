import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createMiddleware } from "redux-api-middleware";
import rootReducer from "./reducers";

const middleware = [
  thunkMiddleware,
  createMiddleware
];

// CREATING INITIAL STORE
export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  // IF REDUCERS WERE CHANGED, RELOAD WITH INITIAL STATE
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      const createNextReducer = require("./reducers").default;

      store.replaceReducer(createNextReducer(initialState));
    });
  }

  return store;
};
