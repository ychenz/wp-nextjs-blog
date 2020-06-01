import Immutable from "immutable";

interface SubscribeStateAttributes {
  request: {
    status?: number;
  };
  response: unknown;
}

const initialSubscribeState = Immutable.Record<SubscribeStateAttributes>({
  request: null,
  response: null
});

function subscribeReducer(state = initialSubscribeState, action): typeof initialSubscribeState {
  switch (action.type) {
    case "SUBSCRIBE_SUCCESS":
      const response = action.payload;
      console.log(response);

      return state;
    case "SUBSCRIBE_REQUEST":
      return state;
    case "SUBSCRIBE_FAILURE":
      return state;
    default:
      return state;
  }
}

export default subscribeReducer;
