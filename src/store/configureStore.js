import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import logger from './middleware/logger';
import errCheck from './middleware/errCheck';
import api from './middleware/api';

export default function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        //concat(logger).
        .concat(errCheck)
        .concat(api),
  });
}
