import * as actions from '../api';
import axios from 'axios';
const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const {
      url,
      onSuccess,
      onError,
      onStart,
      method,
      reqBody: data,
    } = action.payload;
    onStart && dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: 'http://localhost:9001/api/',
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      onSuccess && dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      onError && dispatch({ type: onError, payload: error.message });
      // console.log('error', error.message);
    }
  };

export default api;
