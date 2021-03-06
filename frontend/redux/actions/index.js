import { createAction } from "redux-api-middleware";

export function setState(name, value) {
  return {
    type: `SET_${name}`,
    value
  };
}

/**
 * @param {Object} options
 * @param {String} options.method One of GET|POST|PATCH|DELETE
 * @param {string} options.endpoint
 * @param {Object} options.payload
 */
export function makeApiRequest(options) {
  console.log("make api request");
  const {
    method,
    endpoint,
    payload = null
  } = options;

  return (request, success, failure) => {
    return createAction({
      endpoint,
      method,
      headers: {
        "Content-Type": "application/json"
      },
      ...payload && { body: JSON.stringify(payload) },
      types: [
        request,
        success,
        failure
      ]
    });
  };
}
