import * as actions from '../api';
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { url, onSuccess, onError, onStart, method, reqBody } =
      action.payload;
    onStart && dispatch({ type: onStart });
    next(action);
    try {
      const fetchOptions = {
        method: method ? method : 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: reqBody ? JSON.stringify(reqBody) : null, // body data type must match "Content-Type" header
      };
      console.log(`fetchOptions`, fetchOptions);
      const response = await fetch(
        `http://localhost:9001/api/${url}`,
        fetchOptions
      );
      const data = await response.json();
      dispatch(actions.apiCallSuccess(data));
      onSuccess && dispatch({ type: onSuccess, payload: data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      onError && dispatch({ type: onError, payload: error.message });
      //   console.error(error);
    }
  };

export default api;
