import * as actions from '../api';
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { url, onSuccess, onError, onStart } = action.payload;
    onStart && dispatch({ type: onStart });
    next(action);
    try {
      const response = await fetch(`http://localhost:9001/api/${url}`);
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
