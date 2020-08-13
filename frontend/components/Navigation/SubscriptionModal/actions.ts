import { AsyncAction } from "redux/actions/types";
import { makeApiRequest } from "redux/actions";

export function subscribeUser(name: string, email: string): AsyncAction {
  return (dispatch, getState) => {
    return dispatch(makeApiRequest({
        method: "POST",
        endpoint: "/api/subscribe",
        payload: {
          name,
          email
        }
      })({
        type: "SUBSCRIBE_REQUEST"
      },{
        type: "SUBSCRIBE_SUCCESS"
      },{
        type: "SUBSCRIBE_FAILURE"
      })
    );
  };
}

export function testAction() {
  return {
    type: "TEST_ACTION"
  };
}
